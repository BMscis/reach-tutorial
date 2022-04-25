import { get } from 'svelte/store';
import algosdk from "algosdk";
import {loadStdlib} from "@reach-sh/stdlib"
//import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ALGO_MyAlgoConnect as MyAlgoConnect} from '@reach-sh/stdlib';
import { fundAccount, getBalance, loadLib } from './utilities';
import {provider, wallet, walletAddress,walletName} from "../Stores/Wallet/WalletStore"
export const createAccount = async () => {
    try {  
        const myaccount = await algosdk.generateAccount();
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
        let myAccount = await createAccount();
        alert("Press OK key when the account is funded");
        // Connect your client
        const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        const algodServer = 'http://localhost';
        const algodPort = 4001;
        let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
        walletAddress.set(myAccount.addr)
        //wallet.set(myAccount)
        //Check your balance
        provider.set(algodClient)
        let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Provider: ",algodClient);
        console.log("ACCountinfo: ", accountInfo)
        await connectMyAlgo();
        console.log("Account balance: %d microAlgos", accountInfo.amount);
        return true
    } catch (err) {
        console.log("err", err);
        return
    }
}
export async function connectMyAlgo(){
    const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const algodServer = 'http://localhost';
    const algodPort = 4001;
    //let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    let providerEnv = {
            ALGO_TOKEN:algodToken,
            ALGO_SERVER:algodServer,
            ALGO_PORT:algodPort,
            ALGO_INDEXER_TOKEN:algodToken,
            ALGO_INDEXER_SERVER:algodServer,
            ALGO_INDEXER_PORT:8980,
        }
    const reach = loadLib("ALGO");

    reach.setWalletFallback(reach.walletFallback({
    providerEnv: providerEnv, MyAlgoConnect })); 

        try{
        const account = await reach.getDefaultAccount()
        walletAddress.set(account.networkAccount.addr)
        wallet.set(account)
        //const canfund = await fundAccount("ALGO")
        const balance = await getBalance(account,"ALGO")
        //console.log("2: ConnectMyalgo: ", account,balance)
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
