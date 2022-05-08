import { createNft, nftCardList } from "../Stores/nftCard";
import {API, graphqlOperation} from "aws-amplify";
import { consologger } from "../Utilities/utilities";
import * as subscriptions from "../graphql/subscriptions";
import { getImagesProtected,pic } from "../STORAGE/storage";
//Subscribe to creation of NFTea
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
        graphqlOperation(subscriptions.onCreateASKNFTEA)
    ).subscribe({
        next: ({provider,value}) => updateNFT(provider,value.data.onCreateASKNFTEA),
        error: err => console.warn("++++++++++",err,"++++++++++"),
    })
    const unsubscribe = () => {
        socket.unsubscribe();
    }
    return [socket,unsubscribe]
}
const setNFT = async (provider,nftModel) => {
    consologger("setNFT",{provider,nftModel})
    console.log("++++++++++",{provider,nftModel},"++++++++++")
    createNft(
        nftModel.id,
        nftModel.awsUserId,
        nftModel.nftDescription,
        await pic(nftModel.nftImage),
        nftModel.nftPrice,
        nftModel.nftAssetOwner,
        nftModel.nftPrevAssetOwner,
        nftModel.nftAuctionDuration,
        nftModel.nftContractAddress,
        nftModel.nftLikes,
        nftModel.nftId,
        await getImagesProtected(nftModel.awsUserPicture,nftModel.awsUserId),
        nftModel.awsName,
        nftModel.nftWalletName,
    )
    return 
}
const updateNFT = async (provider,nftModel) => {
    consologger("updateNFT",{provider,nftModel})
    console.log("++++++++++",{provider,nftModel},"++++++++++")
    let cardList = get(nftCardList)
    let component = cardList.find((v) => v.id === nftModel.id);
    component.nftAssetOwner = nftModel.nftAssetOwner
    component.nftPrevAssetOwner = nftModel.nftPrevAssetOwner
    nftCardList.update((n) => (n = n));
    return 
}
