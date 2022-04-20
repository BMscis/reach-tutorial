import { Auth } from "aws-amplify"
import { get } from "svelte/store"
import {loadStdlib} from "@reach-sh/stdlib"
import {balance, cyberuser, reachStdlib, wallet, walletAddress} from "../Wallet/WalletStore"

export const loadLib = (chain) =>{
  reachStdlib.set(loadStdlib(chain))
  return reach = loadStdlib(chain)
}

export const checkDevice = () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return true
      }
      else{
        return false
      }
}
export const checkUser = async () => {
  //console.log("checkUser")
  try {
      const user = await Auth.currentAuthenticatedUser()
      cyberuser.set(user)
      return false
  } catch (error) {
      console.log("ChUser Error: ", error)
      return true
  }
}
export async function fundAccount(chain) {
  const reach = get(reachStdlib)
  const walletAdd = get(walletAddress)
  try {
      // const fundAcc = await reach.fundFromFaucet(
      //     get(wallet),
      //     reach.parseCurrency(40)
      // );
      // console.log("Funded account: ", fundAcc);
      balance.set(await getBalance(walletAdd))
      //const walletBalance = await getBalance(walletAdd)
      // switch (walletBalance < 25) {
      //     case true:
      //         const fundAcc = await reach.fundFromFaucet(
      //             get(wallet),
      //             reach.parseCurrency(40)
      //         );
      //         console.log("Funded account: ", fundAcc);
      //         balance.set(await getBalance(walletAdd))
      //         break;
      //     case false:
      //         balance.set(walletBalance)
      //         console.log("Account balance: ", balance);
      //         break;
      // }
      return true
  } catch (error) {
      console.log("Fund Account: ",error);
      return false;
  }
  //this.setState({ view: "DeployerOrAttacher" });
}
export async function getBalance(address,chain){
  const reach = loadLib(chain)
  try {
      let balAtomic = await reach.balanceOf(address)
      const bal = reach.formatCurrency(balAtomic,4)
      balance.set(bal)
      return bal
  } catch (error) {
      console.log("GetBalance: ",error);
  }
}
