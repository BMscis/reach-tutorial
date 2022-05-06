import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
//import { ALGO_MyAlgoConnect as MyAlgoConnect} from '@reach-sh/stdlib';
import { fundAccount, getBalance, loadLib } from './utilities';
import {accountInformation, provider, wallet, walletAddress,walletName} from "../Stores/Wallet/WalletStore"
import { get } from "svelte/store";
import { mnemonicPhrase, nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";

const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const algodServer = 'http://localhost';
const algodPort = 4001;
const reach = loadLib("ALGO");
export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

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
    //let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    let providerEnv = {
            ALGO_TOKEN:algodToken,
            ALGO_SERVER:algodServer,
            ALGO_PORT:algodPort,
            ALGO_INDEXER_TOKEN:algodToken,
            ALGO_INDEXER_SERVER:algodServer,
            ALGO_INDEXER_PORT:8980,
        }

    reach.setWalletFallback(reach.walletFallback({
    providerEnv: providerEnv, MyAlgoConnect })); 

        try{
        const account = await reach.getDefaultAccount()
        walletAddress.set(account.networkAccount.addr)
        wallet.set(account)
        const balance = await getBalance(account,"ALGO")
        let gotInfo = await algoDetailClient();
        if(gotInfo){
            return true
        }else{return false}

    }catch(error){
        console.log("Error connecting to MyAlgo:", error);
        return false
    }
}
async function algoDetailClient(){
    try {
        let algoParams = await algodClient.accountInformation(get(walletAddress)).do();
        console.log("AlgoParams: ", algoParams);
        accountInformation.set(algoParams)
        algosdk.makeAsset
        return true
    } catch (error) {
        console.log("Error getting account information:", error);
        return false
    }
}