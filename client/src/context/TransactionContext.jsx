import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';


import { contractABI, contractAddress } from '../utils/constants.js';

export const TransactionContext = createContext();

const { ethereum } = window;
console.log(ethereum);
const getEthereumContract = () => {
    if (!ethereum) throw new Error("Ethereum object not found");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;

}

export const TransactionProvider = ({ children }) => {

    const [Isconform, setIsconform] = useState()

    const [isLoading, setisLoading] = useState(false);

    const [connectAccount, setConnectAccount] = useState('');

    const [TransactionCount, setTransactionCount] = useState(localStorage.getItem('count')); //we are storing the value in the localstorage to avoid value loss at the time of page reload

    const [AccountId, setAccountId] = useState("");

    const [THash, setTHash] = useState("");

    const [FormData, setFormData] = useState({addressTo:"", amount:"", keyword:"", message:""});

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }
    
    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) return alert("Please install Metamask");
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if(accounts.length) {
                setConnectAccount(accounts[0]);
    
            } else {
                console.log('No accounts found');
            }
            setAccountId(accounts);
            console.log(accounts);
            
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object');
        }
    }
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setConnectAccount(accounts[0]);
        } catch (error) {
            console.log(error)

            throw new Error('No ethereum object');
        }
    }

    const sendTransaction = async (e) => {
        // e.preventDefault();
        try {
            if(!ethereum) return alert("Please install Metamask");

            const { addressTo, amount, keyword, message } = FormData; //after call sendTransaction in Eth.jsx form will fill and send to here

            // console.log(FormData);

            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount); //to convert decimals into GWEI hex amount

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex, 
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setisLoading(true);
            // alert(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setisLoading(false);
            alert(`Sucess - ${transactionHash.hash}`)

            setTHash(transactionHash);

            console.log(THash);

            setIsconform(false);

            const transactionsCount = await transactionContract.getTransactionCount();
    
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet, connectAccount, FormData, setFormData, handleChange, sendTransaction, AccountId, isLoading, Isconform, setIsconform}}>
            {children}
        </TransactionContext.Provider>
    );
}
