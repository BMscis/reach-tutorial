import { get } from "svelte/store"
import { fundAccount,getBalance,LoadLib } from "./utilities"
import { wallet, chain} from "../Stores/Wallet/WalletStore"
//export connect wallet
//load stdlib with ETH
//get default account
//get balance
//return account

export async function connectETHWallet(){
    chain.set('ETH')
    try {
        const lib = new LoadLib("ETH")
        const account = await lib.reach.getDefaultAccount()
        const balance = await getBalance(account.getAddress(),lib)
        wallet.set(account)
        lib.setLib()
        return true
    } catch (error) {
        console.log("ETH Fund: ",error)
        return false
    }
}
//get balance
//reach balance of address
//return balance