import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
//import { ALGO_MyAlgoConnect as MyAlgoConnect} from '@reach-sh/stdlib';
import { fundAccount, getBalance, LoadLib } from './utilities';
import {accountInformation, chain, provider, wallet, walletAddress,walletName} from "../Stores/Wallet/WalletStore"
import { get } from "svelte/store";

const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const algodServer = 'http://localhost';
const algodPort = 4001;
export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export async function connectMyAlgo(){
    chain.set('ALGO')
    const lib = new LoadLib("ALGO");
    let providerEnv = {
            ALGO_TOKEN:algodToken,
            ALGO_SERVER:algodServer,
            ALGO_PORT:algodPort,
            ALGO_INDEXER_TOKEN:algodToken,
            ALGO_INDEXER_SERVER:algodServer,
            ALGO_INDEXER_PORT:8980,
        }

    lib.reach.setWalletFallback(lib.reach.walletFallback({
    providerEnv: "TestNet", MyAlgoConnect })); 

        try{
        const account = await lib.reach.getDefaultAccount()
        wallet.set(account)
        const balance = await getBalance(account.networkAccount.addr,lib)
        lib.setLib()
        //let gotInfo = await algoDetailClient();
        return true
    }catch(error){
        console.log("Error connecting to MyAlgo:", error);
        return false
    }
}
async function algoDetailClient(){
    try {
        let algoParams = await algodClient.accountInformation(get(walletAddress)).do();
        //console.log("AlgoParams: ", algoParams);
        accountInformation.set(algoParams)
        return true
    } catch (error) {
        console.log("Error getting account information:", error);
        return false
    }
}