import React, { useState, useEffect } from 'react';
import useCelo from './useCelo'; 

export default function RegisterPhone() {
    const { account, status, connectWallet, getPhoneNumberIdentifier, registerAttestation, lookupAddress } = useCelo();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [flowStatus, setFlowStatus] = useState('');
    const [obfuscatedId, setObfuscatedId] = useState('');
    const [foundAddress, setFoundAddress] = useState('');

    useEffect(() => {
        // Automatically connect wallet on component load (or integrate with WalletConnectButton)
        if (!account) {
            connectWallet();
        }
    }, [account, connectWallet]);


    const handleRegistration = async (e) => {
        e.preventDefault();
        if (!account || !phoneNumber) return setFlowStatus('Error: Wallet not connected or phone missing.');
        setFoundAddress('');
        setObfuscatedId('');
        
        try {
            setFlowStatus('1. Querying ODIS for private hash... (BLS Blinding)');
            
            // Step 1: Get the obfuscated/hashed identifier
            const hashedId = await getPhoneNumberIdentifier(phoneNumber, account);
            setObfuscatedId(hashedId);

            setFlowStatus(`2. Hashed ID obtained: ${hashedId.substring(0, 20)}...`);

            // NOTE: In a complete application, you would insert an SMS OTP verification step here
            // to prove the user owns the phone number BEFORE attestation.
            
            // Step 2: Register the hash-to-address mapping on chain
            await registerAttestation(hashedId, account);
            
            setFlowStatus(`Registration complete! Hash mapped to ${account}`);

        } catch (error) {
            console.error('Registration Error:', error);
            setFlowStatus(` Registration Failed: ${error.message}`);
        }
    };

    const handleLookup = async () => {
        if (!obfuscatedId) return setFlowStatus('Attest first to get the hash.');
        setFlowStatus(`4. Looking up address for hash ${obfuscatedId.substring(0, 20)}...`);
        
        try {
            const address = await lookupAddress(obfuscatedId);
            if (address) {
                setFoundAddress(address);
                setFlowStatus(` Lookup Success! Hash resolves to: ${address}`);
            } else {
                setFlowStatus('Lookup failed. No address found.');
            }
        } catch (error) {
            console.error('Lookup Error:', error);
            setFlowStatus(` Lookup Failed: ${error.message}`);
        }
    };

    return (
        <section className="celo-odis-connector">
            <h2>Celo Identity: Phone Number Registration</h2>
            <div className="status-bar">Wallet Status: {status} | Account: {account ? account.substring(0, 10) + '...' : 'N/A'}</div>
            
            <form onSubmit={handleRegistration} className="odis-form">
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+447700900000 (E.164 format)"
                    required
                    disabled={status !== 'Connected'}
                />
                <button type="submit" className="btn btn-primary" disabled={status !== 'Connected'}>
                    1. Hash & Register Phone Number
                </button>
            </form>
            
            <button onClick={handleLookup} disabled={!obfuscatedId} className="btn btn-secondary lookup-btn">
                2. Verify Lookup (Address from Hash)
            </button>

            <div className="flow-output">
                <strong>Current Step:</strong> {flowStatus}
                {foundAddress && <p><strong>Resolved Address:</strong> {foundAddress}</p>}
                {obfuscatedId && <p><strong>Registered Hash:</strong> {obfuscatedId}</p>}
            </div>
        </section>
    );
}