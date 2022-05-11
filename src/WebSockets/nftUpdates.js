import { createNft, nftCardList } from "../Stores/nftCard";
import {API, DataStore, graphqlOperation} from "aws-amplify";
import { consologger, nftDictionary } from "../Utilities/utilities";
import * as subscriptions from "../graphql/subscriptions";
import { getImagesProtected,pic } from "../STORAGE/storage";
import { get } from "svelte/store";
import { ASKNFTEA } from "../models";
//Subscribe to creation of NFTea
let datastoreCount = 0
let updateNFTCount = 0
export const nftSubscriptionCreate = () => {
    consologger("NFTSUBSCRIPTION",0)
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
    consologger("NFTSUBSCRIPTION",0)
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
    consologger("nftUpdates.js","setNFT",{provider,nftModel})
    //console.log("++++++++++",{provider,nftModel},"++++++++++")
    consologger("nftUpdates.js","setNFT",{provider,nftModel})
    createNft(
        nftModel.id,
        nftModel.awsUserId,
        nftModel.nftDescription,
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
export const dataStoreObserver = (previousId) => {
    DataStore.observe(ASKNFTEA).subscribe(msg => {
        console.log("DataStoreCount",datastoreCount += 1)
        consologger("nftUpdates.js","dataStoreObserver",msg)
        if(msg.opType == "UPDATE"){
            updateNFT(msg.opType, msg.element,previousId)
        }
      });
}
const updateNFT = async (opType,nftModel,previousId) => {
    console.log("updateNFT",updateNFTCount += 1)
    consologger("nftUpdates.js",opType,nftModel)
    let cardList = get(nftCardList)
    let component = cardList.find((v) => v.id === previousId);
    try {
        let componentChecker  = nftDictionary(component)
        let modelChecker = nftDictionary(nftModel)
        if(componentChecker.nftPrevAssetOwner !== modelChecker.nftPrevAssetOwner){
            component.id = nftModel.id
            component.nftAssetOwner = nftModel.nftAssetOwner
            component.nftPrevAssetOwner = nftModel.nftPrevAssetOwner
            nftCardList.update((n) => (n = n));
            console.log("updateNFT UPDATED +++++++++++++")
            console.log(componentChecker)
            console.log()
            console.log(modelChecker)
            return true
        }else{
            console.log("updateNFT SIMILAR +++++++++++++")
            console.log(componentChecker)
            console.log()
            console.log(modelChecker)
            return false
        }
    } catch (error) {
            console.log("updateNFT ERROR +++++++++++++",error)
            return false
    }
}
