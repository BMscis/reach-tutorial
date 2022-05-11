import { API, DataStore } from "aws-amplify";
import { uploadToS3 } from "./storage";
import * as mutations from '../graphql/mutations';
import { consologger } from "../Utilities/utilities";
import { dataStoreObserver, nftSubscriptionCreate,nftSubscriptionUpdate } from "../WebSockets/nftUpdates";
import { ASKNFTEA } from "../models";

export const creatNFTeaCard = async (nftCard,imageName, image,imageType,level) => {
    consologger("nftCardMutaitons.js","createNFTeaCard",nftCard)
    const [createSocket,websocketUnsubscribe] = nftSubscriptionCreate()
    createSocket()
    try {
        const uploadToS3Result = await uploadToS3(imageName, image,imageType,level)
        const newCard = await API.graphql({ query: mutations.createASKNFTEA, variables: {input: nftCard}});
        consologger("nftCardMutations.js","NEW CARD", newCard)
        //if(newCard){websocketUnsubscribe()}
        return true
    } catch (error) {
        console.log("CREATE NFT ERROR: ", error)
        return false
    }

}
export const updateNFTeaCard = async (oldNft,newOwner,previousOwner,newPrice) => {
    dataStoreObserver(oldNft.id)
    let beforeEdit = new ASKNFTEA({
        "id":oldNft.id,
        "awsUserId":oldNft.awsUserId,
        "nftDescription":oldNft.nftDescription,
        "nftImage":oldNft.nftImage,
        "nftPrice":oldNft.nftPrice,
        "nftAssetOwner":oldNft.nftAssetOwner,
        "nftPrevAssetOwner":oldNft.nftPrevAssetOwner,
        "nftAuctionDuration":oldNft.nftAuctionDuration,
        "nftContractAddress":oldNft.nftContractAddress,
        "nftLikes":oldNft.nftLikes,
        "nftId":oldNft.nftId,
        "awsUserPicture":oldNft.awsUserPicture,
        "awsName":oldNft.awsName,
        "nftWalletName":oldNft.nftWalletName,
    })
    consologger("nftCardMutations.js","UPDATE CARD BEFORE", beforeEdit)
    try {
        const original = await DataStore.query(ASKNFTEA, oldNft.id);
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        let ds = await DataStore.save(ASKNFTEA.copyOf(original, item => {
            item.nftPrice = newPrice
            item.nftAssetOwner = newOwner
            item.nftPrevAssetOwner = previousOwner
        // Update the values on {item} variable to update DataStore entry
        }));
        consologger("nftCardMutations.js","UPDATE CARD AFTER", ds)
    } catch (error) {
        console.log("UPDATE NFT ERROR: ", error)
    }
    // try {
    //     const newCard = await API.graphql({ query: mutations.updateASKNFTEA, variables: {input: newNFT}});
    //     console.log("Updated Card: ", newCard)
    //     //if(newCard){websocketUnsubscribe()}
    //     return true
    // } catch (error) {
    //     console.log("UPDATE NFT ERROR: ", error)
    //     return false
    // }

}