import { get } from "svelte/store"
import { fundAccount,getBalance,loadLib } from "./utilities"
import { wallet, walletAddress,balance, chain} from "../Stores/Wallet/WalletStore"
//export connect wallet
//load stdlib with ETH
//get default account
//get balance
//return account

export async function connectETHWallet(){
    chain.set('ETH')
    const reach = loadLib("ETH")
    try {
        const account = await reach.getDefaultAccount()
        const balance = await getBalance(account,"ETH")
        walletAddress.set(account.getAddress())
        wallet.set(account)
        //console.log("Account: ",get(walletAddress))
        const canfund = await fundAccount()
        //canfund = true
        if(!canfund)return false
        return true
    } catch (error) {
        console.log("ETH Fund: ",error)
        return false
    }
}
//get balance
//reach balance of address
//return balance