import { Auth } from "aws-amplify"
import { get } from "svelte/store"
import {loadStdlib} from "@reach-sh/stdlib"
import {balance, cyberuser, reachStdlib, wallet, walletAddress} from "../Stores/Wallet/WalletStore"

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
      alert("Fund Account: ",error);
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
      alert("GetBalance: ",error);
  }
}
export async function checkUploadNft(){
  //get cyberuser and check if there is cyber user
  let user = false
  let hasWallet = false
  try {
    const isUser = get(cyberuser)
    if (isUser.attributes.name){
      user = true
    }else{
      alet("You must create an account before creating an NFT.")
    }
  } catch (error) {
      alet("You must create an account before creating an NFT.")
      return false
  }
  try {
    if(get(walletAddress).length > 0){
      hasWallet = true
    }else{
      hasWallet = false
      alert("You must login to a wallet before creating an NFT.")  
    }
  } catch (error) {
    alert("You must login to a wallet before creating an NFT.")
    return false
  }
  if(user && hasWallet){
    return true
  }else{
    return false
  }
}
