import { createNft } from "../Stores/nftCard";
import {API, graphqlOperation} from "aws-amplify";
import { consologger } from "../Utilities/utilities";
import * as subscriptions from "../graphql/subscriptions";
import { getImagesProtected,pic } from "../STORAGE/storage";
//Subscribe to creation of NFTea
export const nftSubscription = () => {
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
    return [sockets,unsubscribe]
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
