// scripts/verify.js
const { run } = require("hardhat");

async function main() {
  // update addresses after deploy
  const addresses = require("../src/abi/contract-addresses.json");
  if (!addresses) throw new Error("No contract-addresses.json found");

  console.log("Verifying PaymentContract at", addresses.PaymentContract);
  try {
    await run("verify:verify", {
      address: addresses.PaymentContract,
      constructorArguments: [process.env.ECO_FUND_ADDRESS],
    });
  } catch (err) {
    console.warn("Payment verify error:", err.message || err);
  }

  console.log("Verifying PhoneMapping at", addresses.PhoneMapping);
  try {
    await run("verify:verify", {
      address: addresses.PhoneMapping,
      constructorArguments: [],
    });
  } catch (err) {
    console.warn("Mapping verify error:", err.message || err);
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
