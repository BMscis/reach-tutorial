import { createNft, nftCardList } from "../Stores/nftCard";
import {API, DataStore, graphqlOperation} from "aws-amplify";
import { consologger, nftDictionary } from "../Utilities/utilities";
import * as subscriptions from "../graphql/subscriptions";
import { getImagesProtected,pic } from "../STORAGE/storage";
import { get } from "svelte/store";
import { ASKNFTEA } from "../models";
import { cyberuser, walletAddress } from "../Stores/Wallet/WalletStore";
import { updateNFTeaName } from "../STORAGE/nftCardMutations";
//Subscribe to creation of NFTea
let datastoreCount = 0
let updateNFTCount = 0
export const nftSubscriptionCreate = () => {
    //consologger("NFTSUBSCRIPTION",0)
    const socket = () => API.graphql(
        graphqlOperation(subscriptions.onCreateASKNFTEA)
    ).subscribe({
        next: ({provider,value}) => setNFT(provider,value.data.onCreateASKNFTEA),
        error: err => console.warn("++++++++++",err,"++++++++++"),
    })
    const unsubscribe = () => {
        socket.unsubscribe();
    }
    return [socket,unsubscribe]
}
export const nftSubscriptionUpdate = () => {
    //consologger("NFTSUBSCRIPTION",0)
    const socket = () => API.graphql(
        graphqlOperation(subscriptions.onUpdateASKNFTEA)
    ).subscribe({
        next: ({provider,value}) => updateNFT(provider,value),
        error: err => console.warn("++++++++++",err,"++++++++++"),
    })
    const unsubscribe = () => {
        socket.unsubscribe();
    }
    return [socket,unsubscribe]
}
const setNFT = async (provider,nftModel) => {
    //consologger("nftUpdates.js","setNFT",{provider,nftModel})
    createNft(
        nftModel.id,
        nftModel.awsUserId,
        JSON.parse(nftModel.nftDescription),
        nftModel.nftImage,
        nftModel.nftPrice,
        nftModel.nftAssetOwner,
        nftModel.nftPrevAssetOwner,
        nftModel.nftAuctionDuration,
        nftModel.nftContractAddress,
        nftModel.nftLikes,
        nftModel.nftId,
        nftModel.awsUserPicture,
        nftModel.awsName,
        nftModel.nftWalletName,
    )
    return 
}
export const dataStoreObserver = () => {
    DataStore.observe(ASKNFTEA).subscribe(msg => {
        if(msg.opType == "UPDATE"){
            updateNFT(msg.opType, msg.element)
        }
      });
}
const updateNFT = async (opType,nftModel) => {
    let cardList = get(nftCardList)
    let imageName = nftModel.nftImage
    let component = cardList.find((v) => v.nftImage === imageName);
    try {
        let componentChecker  = nftDictionary(component)
        let modelChecker = nftDictionary(nftModel)
        if(componentChecker.nftPrevAssetOwner !== modelChecker.nftPrevAssetOwner){
            if((nftModel.nftAssetOwner === get(walletAddress) && (nftModel.awsName !== get(cyberuser).attributes.name))){
                updateNFTeaName(nftModel, get(cyberuser).attributes.name)
            }
            component.id = modelChecker.id
            component.nftAssetOwner = modelChecker.nftAssetOwner
            component.nftPrevAssetOwner = modelChecker.nftPrevAssetOwner
            component.nftPrice = modelChecker.nftPrice
            component.nftWalletName = modelChecker.nftWalletName
            nftCardList.update((n) => (n = n));
            return true
        }else if (componentChecker.nftContractAddress !== modelChecker.nftContractAddress){
            component.id = modelChecker.id
            component.nftContractAddress = modelChecker.nftContractAddress
            component.nftWalletName = modelChecker.nftWalletName
            nftCardList.update((n) => (n = n));
            return true
        }else if(componentChecker.awsName !== modelChecker.awsName){
            component.awsName = modelChecker.awsName
            component.awsUserId = modelChecker.awsUserId
            component.awsUserPicture = modelChecker.awsUserPicture
            component.nftPrice = modelChecker.nftPrice
            component.nftWalletName = modelChecker.nftWalletName
            nftCardList.update((n) => (n = n));
        }else{
            return false
        }
    } catch (error) {
            console.log("updateNFT ERROR +++++++++++++",error)
            return false
    }
}
