import { get } from 'svelte/store';
import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ALGO_MyAlgoConnect as MyAlgos} from '@reach-sh/stdlib';
import { fundAccount, getBalance, loadLib } from './utilities';
import {wallet, walletAddress,walletName} from '../Wallet/WalletStore'
export const createAccount = async () => {
    try {  
        const myaccount = algosdk.generateAccount();
        console.log("Account Address = " + myaccount.addr);
        let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
        console.log("Account Mnemonic = "+ account_mnemonic);
        console.log("Account created. Save off Mnemonic and address");
        console.log("Add funds to account using the TestNet Dispenser: ");
        console.log("https://dispenser.testnet.aws.algodev.network/ ");
        return myaccount;
    }
    catch (err) {
        console.log("err", err);
    }
};
export async function firstTransaction() {
    try {
        let myAccount = createAccount();
        alert("Press OK key when the account is funded");
        // Connect your client
        const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        const algodServer = 'http://localhost';
        const algodPort = 4001;
        let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
        walletAddress.set(myAccount.addr)
        wallet.set(myAccount)
        //Check your balance
        let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        const myWallet = await connectMyAlgo()
        console.log("Account balance: %d microAlgos", accountInfo.amount);
        return myWallet
    } catch (err) {
        console.log("err", err);
        return
    }
}
export async function connectMyAlgo(){

    const reach = loadLib("ALGO-devnet");
    //const myAlgoConnect = new MyAlgoConnect();
    // reach.setWalletFallback(reach.walletFallback({
    //     providerEnv: 'TestNet', MyAlgoConnect })); 
        try{
        //const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
        //const params = await algodClient.getTransactionParams().do();
        //const txToSigned = algosdk.makePaymentTxnWithSuggestedParams(from, to, amount, undefined, undefined, params);
        //const myAlgoConnect = new MyAlgoConnect();
        //const txnSignedByTheUser = await myAlgoConnect.signTransaction(txToSigned.toByte());
        //console.log("SIGNED TXN:", txnSignedByTheUser);
        const account = await reach.getDefaultAccount(get(walletAddress))
        const balance = await getBalance(account,"ALGO")
        console.log("2: ConnectMyalgo: ", account,balance)
        // //const accountAunt = await reach.fundFromFaucet(account, reach.parseCurrency(0))
        // //const account = await reach.getDefaultAccount()
        // //const balance = await getBalance(account,"ALGO")
        // console.log("Account: ", account)
        // //walletAddress.set(account.getAddress())
        // wallet.set(account)
        // //console.log("Account: ",get(walletAddress))
        // const canfund = await fundAccount("ALGO")
        // if(!canfund)return false
        return true

    }catch(error){
        console.log("Error connecting to MyAlgo:", error);
        return false
    }
}
