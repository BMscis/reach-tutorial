import { get } from 'svelte/store';
import { ASKNFTEA } from "../models";
import { uploadToS3 } from "./storage";
import { API, DataStore } from "aws-amplify";
import * as mutations from '../graphql/mutations';
import { consologger } from "../Utilities/utilities";
import { cyberuser } from '../Stores/Wallet/WalletStore';
const getOldNFT = (oldNft) => {
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
    //consologger("nftCardMutations.js","GET OLD", beforeEdit)
    return beforeEdit
}
export const creatNFTeaCard = async (nftCard,imageName, image,imageType,level) => {
    //consologger("nftCardMutaitons.js","createNFTeaCard",nftCard)

    try {
        const uploadToS3Result = await uploadToS3(imageName, image,imageType,level)
        const newCard = await API.graphql({ query: mutations.createASKNFTEA, variables: {input: nftCard}});
        //consologger("nftCardMutations.js","NEW CARD", newCard)
        //if(newCard){websocketUnsubscribe()}
        return true
    } catch (error) {
        console.log("CREATE NFT ERROR: ", error)
        return false
    }

}
export const updateNFTeaCard = async (oldNft,newOwner,previousOwner,newPrice,nftWalletName) => {
    
    if(oldNft.awsUserId === get(cyberuser).username){
        try {
            const original = await DataStore.query(ASKNFTEA, oldNft.id);
            /* Models in DataStore are immutable. To update a record you must use the copyOf function
            to apply updates to the item’s fields rather than mutating the instance directly */
            let ds = await DataStore.save(ASKNFTEA.copyOf(original, item => {
                item.nftPrice = newPrice
                item.nftAssetOwner = newOwner
                item.nftWalletName = nftWalletName
                item.nftPrevAssetOwner = previousOwner
            // Update the values on {item} variable to update DataStore entry
            }));
            //consologger("nftCardMutations.js","UPDATE CARD AFTER", ds)
        } catch (error) {
            console.log("UPDATE NFT ERROR: ", error)
        }
    }else{
        console.log("NOT OWNER OF NFT")
    }
}
export const updateNFTeaContract = async (oldNft,contractAddress,nftWalletName) => {
    
    if(oldNft.awsUserId === get(cyberuser).username){
        try {
            const original = await DataStore.query(ASKNFTEA, oldNft.id);
            /* Models in DataStore are immutable. To update a record you must use the copyOf function
            to apply updates to the item’s fields rather than mutating the instance directly */
            let ds = await DataStore.save(ASKNFTEA.copyOf(original, item => {
                item.nftContractAddress = contractAddress
                item.nftWalletName = nftWalletName
            // Update the values on {item} variable to update DataStore entry
            }));
            //consologger("nftCardMutations.js","UPDATE CARD AFTER", ds)
        } catch (error) {
            console.log("UPDATE NFT ERROR: ", error)
        }
    }else{
        console.log("NOT OWNER OF NFT")
    }
}
export const updateNFTeaName = async (oldNft,awsName) => {
    
    try {
        const original = await DataStore.query(ASKNFTEA, oldNft.id);
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        let ds = await DataStore.save(ASKNFTEA.copyOf(original, item => {
            item.awsName = awsName
            item.awsUserId = get(cyberuser).username
            item.awsUserPicture = get(cyberuser).attributes.picture
            item.nftWalletName =  "false"
        // Update the values on {item} variable to update DataStore entry
        }));
        //consologger("nftCardMutations.js","UPDATE CARD AFTER", ds)
    } catch (error) {
        console.log("UPDATE NFT ERROR: ", error)
    }
}