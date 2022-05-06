// see ASA param conventions here: https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md
// for JavaScript SDK doc see: https://algorand.github.io/js-algorand-sdk/
import algosdk from "algosdk";
import { get } from "svelte/store";
import { algodClient } from "./connectALGOWallet"
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { nftId, walletAddress } from "../Stores/Wallet/WalletStore";
import { mnemonicPhrase, nftImage, nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";
// createAccount
// once created sucessfully, you will need to add funds 
// The Algorand TestNet Dispenser is located here: 
// https://dispenser.testnet.aws.algodev.network/
export class CreateAlgoAsset {
    constructor(){
        this.DISPENSERACCOUNT = get(walletAddress);
        this.walletAddress = this.DISPENSERACCOUNT;
        this.start()
    }
    async start(){
        await this.getAccountInfo()
    }
    async getAccountInfo(){
        this.accountInfo = await algodClient.accountInformation(this.walletAddress).do();
        //Check account balance   
        this.startingBalance = this.accountInfo.amount;
        console.log("Alice account balance: %d microAlgos", this.startingBalance);
        console.log("In algos: ", algosdk.microalgosToAlgos(this.startingBalance));
    }
    async createAsset(){
        try {
            this.params = await algodClient.getTransactionParams().do();
            const creator = this.walletAddress;
            const defaultFrozen = false;    
            const unitName = get(nftSymbol); 
            const assetName = get(nftName);
            const url = get(nftImage).url;
            const managerAddr = this.walletAddress;
            const reserveAddr = this.walletAddress;  
            const freezeAddr = undefined;
            const clawbackAddr = undefined;
            const total = 1;                // NFTs have totalIssuance of exactly 1
            const decimals = 0;
            this.params.fee = 1000;
            this.params.flatFee = true;

            const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                from:creator,
                total,
                decimals,
                assetName,
                unitName,
                assetURL: url,
                defaultFrozen,
                freeze: freezeAddr,
                manager: managerAddr,
                clawback: clawbackAddr,
                reserve: reserveAddr,
                suggestedParams: this.params,
            });

            //const sk = await this.createSk()
            //const skUint = Uint8Array.from(sk.sk);
            //const rawSignedTxn = txn.signTxn(sk.sk);
            const myAlgoConnect = new MyAlgoConnect();
            const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
            console.log("myAlgoConn: ", myAlgoConnect)
            console.log("Signed Transaction: " + signedTxn.txID);
            const tx = (await algodClient.sendRawTransaction(signedTxn.blob).do());
            console.log("Transaction ID: " + tx.txId);
            let assetID = null;
            // wait for transaction to be confirmed
            const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
            //Get the completed Transaction
            console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
            this.assetID = confirmedTxn["asset-index"];
            nftId.set(this.assetID.toString());
            console.log("AssetID = " + this.assetID);
            printCreatedAsset(this.walletAddress, this.assetID);
            printAssetHolding(this.walletAddress, this.assetID);
            return this.assetID
        } catch (error) {
            console.log("2B: ERROR: Creator createAsset",error)
            return false
        }
            
    }
    async createSk(){
        const sk = algosdk.mnemonicToSecretKey(get(mnemonicPhrase));
        console.log("Secret key: " + sk);
        return sk
    }
    async destroyAsset() {
        console.log("");
        console.log("==> DESTROY ASSET");
        // All of the created assets should now be back in the creators
        // Account so we can delete the asset.
        // If this is not the case the asset deletion will fail
        const params = await algodClient.getTransactionParams().do();
        // Comment out the next two lines to use suggested fee
        // params.fee = 1000;
        // params.flatFee = true;
        // The address for the from field must be the manager account
        const addr = this.walletAddress;
        // if all assets are held by the asset creator,
        // the asset creator can sign and issue "txn" to remove the asset from the ledger. 
        const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
            from: addr,
            note: undefined,
            assetIndex: this.assetID,
            suggestedParams: params
        });
        // The transaction must be signed by the manager which 
        // is currently set to alice
        const sk = await this.createSk()
        const skUint = Uint8Array.from(sk.sk);
        const rawSignedTxn = txn.signTxn(sk.sk);
        const tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
        // Wait for confirmation
        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        // The account3 and account1 should no longer contain the asset as it has been destroyed
        console.log("Asset ID: " + this.assetID);
        console.log("Alice = " + this.walletAddress);
        await printCreatedAsset(this.walletAddress, this.assetID);
        await printAssetHolding(this.walletAddress, this.assetID);

        return;
        // Notice that although the asset was destroyed, the asset id and associated 
        // metadata still exists in account holdings for any account that optin. 
        // When you destroy an asset, the global parameters associated with that asset
        // (manager addresses, name, etc.) are deleted from the creator's account.
        // However, holdings are not deleted automatically -- users still need to 
        // use the closeToAccount on the call makePaymentTxnWithSuggestedParams of the deleted asset.
        // This is necessary for technical reasons because we currently can't have a single transaction touch potentially 
        // thousands of accounts (all the holdings that would need to be deleted).

        // ==> DESTROY ASSET
        // Transaction QCE52AAX75VBSGDL36VHMNVT6LXSR5M6V5JUNSKE6BXQGLQEMLDA confirmed in round 16833536
        // Asset ID: 28291127
        // Alice = RA6RAUNDQGHRWTCR5YRL2YJMIXTHWD5S3ZYHVBGSNA76AVBAYELSNRVKEI
        // Bob = YC3UYV4JLHD344OC3G7JK37DRVSE7X7U2NOZVWSQNVKNEGV4M3KFA7WZ44  
    }
    async closeoutOwnerAlgos() {
        console.log("");
        console.log("==> CLOSE OUT OWNER'S ALGOS TO DISPENSER");
        let accountInfo = await algodClient.accountInformation(this.walletAddress).do();
        console.log("Owner Account balance: %d microAlgos", accountInfo.amount);
        const startingAmount = accountInfo.amount;
        // Construct the transaction
        const params = await algodClient.getTransactionParams().do();
        // comment out the next two lines to use suggested fee
        // params.fee = 1000;
        // params.flatFee = true;
        // For more info see: 
        // https://developer.algorand.org/docs/reference/transactions/#payment-transaction
        // receiver account to send to
        const receiver = this.walletAddress;
        const enc = new TextEncoder();
        const amount = 0;
        const sender = this.walletAddress;
        // closeToRemainder will remove the assetholding from the account
        const closeRemainderTo = DISPENSERACCOUNT;
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender,
            to: receiver,
            amount,
            closeRemainderTo,
            note: undefined,
            suggestedParams: params
        });
        // Sign the transaction
        const sk = await this.createSk()
        const skUint = Uint8Array.from(sk.sk);
        const rawSignedTxn = txn.signTxn(sk.sk);
        // Submit the transaction
        const tx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
        // Wait for confirmation
        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        // const mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
        // console.log("Transaction information: %o", mytxinfo);
        accountInfo = await algodClient.accountInformation(this.walletAddress).do();
        let txAmount = confirmedTxn.txn.txn.amt;
        if (confirmedTxn.txn.txn.amt == undefined) {
            console.log("Transaction Amount: %d microAlgos", 0);
            txAmount = 0;
        }
        else {
            console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);

        }
        console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
        const closeoutamt = startingAmount - txAmount - confirmedTxn.txn.txn.fee;
        console.log("Close To Amount: %d microAlgos", closeoutamt);
        console.log("Bobs Account balance: %d microAlgos", accountInfo.amount);
        printCreatedAsset(this.walletAddress, this.assetID);
        printAssetHolding(this.walletAddress, this.assetID);
        return;
        // Sample Output
        // ==> CLOSE OUT ALICE'S ALGOS TO DISPENSER
        // Alice Account balance: 8996000 microAlgos
        // Transaction IC6IQVUOFLTTXNWZWD4F6L5CZXOFBTD3EY2QJUY5MHUOQSAX3CEA confirmed in round 16833543
        // Transaction Amount: 0 microAlgos
        // Transaction Fee: 1000 microAlgos
        // Bobs Account balance: 0 microAlgos
    }
}
// Function used to print created asset for account and assetid
const printCreatedAsset = async function (account, assetid) {
    // note: if you have an indexer instance available it is easier to just use this
    //     let accountInfo = await indexerClient.searchAccounts()
    //    .assetID(assetIndex).do();
    // and in the loop below use this to extract the asset for a particular account
    // accountInfo['accounts'][idx][account]);
    let accountInfo = await algodClient.accountInformation(account).do();
    for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
        let scrutinizedAsset = accountInfo['created-assets'][idx];
        if (scrutinizedAsset['index'] == assetid) {
            console.log("AssetID = " + scrutinizedAsset['index']);
            let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
            console.log("parms = " + myparms);
            break;
        }
    }
};
// Function used to print asset holding for account and assetid
const printAssetHolding = async function (account, assetid) {
    // note: if you have an indexer instance available it is easier to just use this
    //     let accountInfo = await indexerClient.searchAccounts()
    //    .assetID(assetIndex).do();
    // and in the loop below use this to extract the asset for a particular account
    // accountInfo['accounts'][idx][account]);
    let accountInfo = await algodClient.accountInformation(account).do();
    for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
        let scrutinizedAsset = accountInfo['assets'][idx];
        if (scrutinizedAsset['asset-id'] == assetid) {
            let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
            console.log("assetholdinginfo = " + myassetholding);
            break;
        }
    }
};
