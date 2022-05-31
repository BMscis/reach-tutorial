import { Auth } from "aws-amplify"
import { get } from "svelte/store"
import {loadStdlib} from "@reach-sh/stdlib"
import {balance, cyberuser, reachStdlib, wallet, walletAddress} from "../Stores/Wallet/WalletStore"
import { formNumber, nftDescription, nftImage, nftName, nftPrice, nftSymbol } from "../Components/CREATENFT/nftFormSvelte"

let count = 0
const colors = {
  reset: '\u001f[0m',

  //text color

  black: '\u001f[30m',
  red: '\u001f[31m',
  green: '\u001f[32m',
  yellow: '\u001f[33m',
  blue: '\u001f[34m',
  magenta: '\u001f[35m',
  cyan: '\u001f[36m',
  white: '\u001f[37m',

  //background color

  blackBg: '\u001f[40m',
  redBg: '\u001f[41m',
  greenBg: '\u001f[42m',
  yellowBg: '\u001f[43m',
  blueBg: '\u001f[44m',
  magentaBg: '\u001f[45m',
  cyanBg: '\u001f[46m',
  whiteBg: '\u001f[47m'
}
const MICRO_ALGOS_RATIO = 1e6;
export class LoadLib {
  constructor(chain) {
    this.chain = chain
    this.reach = loadStdlib(this.chain)
  }
  setLib (){
    reachStdlib.set(this.reach)
  }
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
  const lib = new LoadLib(chain)
  try {
      let balAtomic = await lib.reach.balanceOf(address)
      const bal = lib.reach.formatCurrency(balAtomic)
      //let algoTest = algosdk.microalgosToAlgos(parseFloat(bal))
      //console.log("BAlance: algoTest ", algoTest);
      //let algoBalance = bal/MICRO_ALGOS_RATIO
      //console.log("Ballaaaance: ",algoBalance)
      balance.set(bal)
      return bal
  } catch (error) {
      console.log("GetBalance: ",error);
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
      alet("You must create an account before creating a NFT.")
    }
  } catch (error) {
      alet("You must create an account before creating a NFT.")
      return false
  }
  try {
    if(get(walletAddress).length > 0){
      hasWallet = true
    }else{
      hasWallet = false
      alert("You must login to a wallet before creating a NFT.")  
    }
  } catch (error) {
    alert("You must login to a wallet before creating a NFT.")
    return false
  }
  try {
    if (get(nftName)){
        nftName.set()
        nftSymbol.set()
        nftDescription.set()
        nftPrice.set()
        nftImage.set({url:'',image:''})
        formNumber.set(0)
    }
  } catch (error) {
    console.log("NFT Error: ",error)
  }
  if(user && hasWallet){
    return true
  }else{
    return false
  }
}

export const consologger = (from,obj,val) => {
  console.log('%c----------------------------','color:black; background:Green;')
    console.log('-------------START---------------')
    console.log(`%c${from}`,'color:black; background:white; font-size:12px;')
    console.log(count += 1)
    if(obj){
      console.log(`%c${obj}`,'color:green; background:white;')
    }
    if(val){
      console.log(val)
    }
    console.log(`%c${from}`,'color:purple;font-size:12px;')
    console.log('------------END----------------')
    console.log('%c----------------------------','color:black; background:red;')
}

export const nftDictionary = (component) => {
  return {
"id":component.id,
"awsUserId":component.awsUserId,
"nftDescription":component.nftDescription,
"nftImage":component.nftImage,
"nftPrice":component.nftPrice,
"nftAssetOwner":component.nftAssetOwner,
"nftPrevAssetOwner":component.nftPrevAssetOwner,
"nftAuctionDuration":component.nftAuctionDuration,
"nftContractAddress":component.nftContractAddress,
"nftLikes":component.nftLikes,
"nftId":component.nftId,
"awsUserPicture":component.awsUserPicture,
"awsName":component.awsName,
"nftWalletName":component.nftWalletName,
  }
}
