import hre from "hardhat";

async function main() {
  console.log("Deploying contracts to Celo Mainnet...");

  // Deploy PaymentContract
  const ecoFund = "0x000000000000000000000000000000000000dead";
  console.log("Deploying PaymentContract...");
  const PaymentContract = await hre.ethers.getContractFactory("PaymentContract");
  const payment = await PaymentContract.deploy(ecoFund);
  await payment.deployed();
  console.log("✅ PaymentContract deployed at:", payment.address);

  // Deploy PhoneMapping
  console.log("Deploying PhoneMapping...");
  const PhoneMapping = await hre.ethers.getContractFactory("PhoneMapping");
  const phoneMapping = await PhoneMapping.deploy();
  await phoneMapping.deployed();
  console.log("✅ PhoneMapping deployed at:", phoneMapping.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

