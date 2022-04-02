import MyAlgoConnect from '@randlabs/myalgo-connect';
import {walletAccount,walletName} from '../AUTH/AuthStore'
const createAccount = function() {
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
        console.log("Press any key when the account is funded");
        await keypress();
        // Connect your client
        const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        const algodServer = 'http://localhost';
        const algodPort = 4001;
        let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
        //Check your balance
        let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Account balance: %d microAlgos", accountInfo.amount);
    } catch (err) {
        console.log("err", err);
    }
}
export async function connectMyAlgo(){
    const myAlgoConnect = new MyAlgoConnect();
    console.log("Connecting to MyAlgo...");
    try{
        const accountsSharedByUser = await myAlgoConnect.connect();
        console.log("Connected to MyAlgo");
        console.log("Accounts shared by user:", accountsSharedByUser);
        walletName.set(accountsSharedByUser[0].name)
        walletAccount.set(accountsSharedByUser[0].address)
        return false

    }catch(error){
        console.log("Error connecting to MyAlgo:", error);
    }
}
