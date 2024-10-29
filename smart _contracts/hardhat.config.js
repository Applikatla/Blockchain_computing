require("@nomicfoundation/hardhat-toolbox");

//https://eth-holesky.g.alchemy.com/v2/URsTZprMHu2Gbqs0fFdHnX7I0hSl5dkX

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    holesky: {
      url: 'https://eth-holesky.g.alchemy.com/v2/URsTZprMHu2Gbqs0fFdHnX7I0hSl5dkX',
      accounts: [ '672286e799bb32051042352f02b56a06f6b9b5455d916134f00659f91337391f' ]
    }
  }
};
