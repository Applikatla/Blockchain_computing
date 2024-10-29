import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';


import { contractABI, contractAddress } from '../utils/constants.js';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    if (!ethereum) throw new Error("Ethereum object not found");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });

}

export const TransactionProvider = ({ children }) => {

    const [connectAccount, setConnectAccount] = useState('');

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

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask");

            const { addressTo, amount, keyword, message } = FormData; //after call sendTransaction in Eth.jsx form will fill and send to here

            console.log(FormData);

            getEthereumContract();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet, connectAccount, FormData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}
