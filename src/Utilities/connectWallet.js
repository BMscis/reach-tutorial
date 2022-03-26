import {loadStdlib} from "@reach-sh/stdlib"
import { reachWallet } from "../Stores/walletStore"

//export connect wallet
//load stdlib with ETH
//get default account
//get balance
//return account
export async function connectWallet(){
    const reach = loadStdlib("ETH")
    const account = await reach.getDefaultAccount()
    const balance = await getBalance(account)
    // reachWallet.set({
    //     account: account.address,
    //     balance: balance
    // })
    return {
        account: account.getAddress(),
        balance: balance
    }
}
//get balance
//reach balance of address
//return balance
async function getBalance(address){
    let balAtomic = await reach.balanceOf(address)
    const balance = reach.formatCurrency(balAtomic,4)
    return balance
}
