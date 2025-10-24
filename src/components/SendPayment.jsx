import React, { useState } from "react";
import { getPhoneIdentifier } from "../utils/celo";
import PaymentContractAbi from "../../abi/PaymentContract.json";
import PhoneMappingAbi from "../../abi/PhoneMapping.json";
import { ethers } from "ethers";

export default function SendPayment({ paymentContractAddress, phoneMappingAddress }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function send() {
    setStatus("resolving phone identifier...");
    try {
      const provider = window.ethereum; // must be connected via wallet
      const phoneHash = await getPhoneIdentifier(provider, phone);

      // lookup wallet in PhoneMapping contract
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const phoneMapping = new ethers.Contract(phoneMappingAddress, PhoneMappingAbi, web3Provider);
      const walletAddr = await phoneMapping.getWallet(phoneHash);

      if (!walletAddr || walletAddr === ethers.constants.AddressZero) {
        return setStatus("Recipient not registered");
      }

      // call PaymentContract.sendPayment with value
      const paymentContract = new ethers.Contract(paymentContractAddress, PaymentContractAbi, signer);
      const value = ethers.utils.parseEther(amount); // amount in CELO
      const tx = await paymentContract.sendPayment(walletAddr, { value });
      setStatus("tx submitted: " + tx.hash);
      await tx.wait();
      setStatus("Payment complete!");
    } catch (e) {
      console.error(e);
      setStatus("error: " + (e.message || e));
    }
  }

  return (
    <div>
      <h3>Send Payment</h3>
      <input placeholder="+919876543210" value={phone} onChange={e=>setPhone(e.target.value)} />
      <input placeholder="Amount (CELO)" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={send}>Send</button>
      <div>{status}</div>
    </div>
  );
}
