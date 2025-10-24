import "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

const { DEPLOYER_PRIVATE_KEY, ALFAJORES_RPC_URL, CELO_MAINNET_RPC_URL } = process.env;

export default {
  solidity: "0.8.20",
  networks: {
    alfajores: {
      url: ALFAJORES_RPC_URL || "https://alfajores-forno.celo-testnet.org",
      accounts: DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : []
    },
    mainnet: {
      url: CELO_MAINNET_RPC_URL || "https://forno.celo.org",
      accounts: DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : []
    }
  }
};


