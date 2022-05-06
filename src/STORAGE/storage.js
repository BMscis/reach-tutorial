import { get } from 'svelte/store';
import { ASKNFTEA } from '../models';
import { Storage } from "aws-amplify";
import { createNft } from '../Stores/nftCard';
import {creatNFTeaCard} from "./nftCardMutations";
import { DataStore } from '@aws-amplify/datastore';
import { consologger } from '../Utilities/utilities';
import { cyberuser,walletAddress, nftId } from "../Stores/Wallet/WalletStore";
import { nftDescription, nftName, nftPrice } from '../Components/CREATENFT/nftFormSvelte';
export const sendToStore = async (image, protectionLevel) => {
    let level = protectionLevel
    let imageName = image[0].name
    let [imageSplit, imageType] = imageName.split('.')
    console.log("NFT ID: ",get(nftId))
    let setNft = new ASKNFTEA({
        "awsUserId":get(cyberuser).username,
        "nftDescription":get(nftDescription),
        "nftImage": imageName,
        "nftPrice":get(nftPrice),
        "nftAssetOwner":get(walletAddress),
        "nftPrevAssetOwner":"0x0",
        "nftAuctionDuration":"60",
        "nftContractAddress":"0x123sdaafsd244555657567",
        "nftLikes":0,
        "nftId":get(nftId),
        "awsUserPicture":get(cyberuser).attributes.picture,
        "awsName":get(cyberuser).attributes.name,
        "nftWalletName":get(nftName),
        //"nftName": nftName
    })
    consologger("Send To Store: ", 0)
    const uploadResult = await creatNFTeaCard(setNft,imageName, image[0],imageType,level)
    if (uploadResult){
            return true
        }else{
            return false
    }
}
export const getStore = async () => {
    try {
        const results = await Storage.list('')
        const queryResults = await queryNFT()
        return queryResults
    } catch (error) {
        console.log("GET STORE ERROR: ", error)
        return ''
    }

}
export const uploadToS3 = async (fileName, file,type,level) => {
    //console.log("Upload to S3: ", fileName, file,type,level)
    try {
        const storageResult = await Storage.put(fileName, file,
            { level: level, contentType: `image/${type}`, },
            )
        //console.log("Upload to S3 Result: ", storageResult)
        return storageResult? true : false
    } catch (error) {
        console.log("Upload to S3 ERROR: ", error)
        return false
    }
}
const uploadNFT = async(
    awsUserId, 
    nftDescription, 
    nftImage, 
    nftPrice, 
    nftAssetOwner, 
    nftPrevAssetOwner, 
    nftAuctionDuration, 
    nftContractAddress, 
    nftLikes,
    nftId, 
    awsUserPicture,
    awsName, 
    nftWalletName) => {
        try {
            const result = await DataStore.save(
                new ASKNFTEA({
                    "awsUserId": awsUserId,
                    "nftDescription": nftDescription,
                    "nftImage": nftImage,
                    "nftPrice": nftPrice,
                    "nftAssetOwner": nftAssetOwner,
                    "nftPrevAssetOwner": nftPrevAssetOwner,
                    "nftAuctionDuration": nftAuctionDuration,
                    "nftContractAddress": nftContractAddress,
                    "nftLikes": nftLikes,
                    "nftId":nftId,
                    "awsUserPicture": awsUserPicture,
                    "awsName": awsName,
                    "nftWalletName": nftWalletName,
                    //"nftName": nftName
                })
            );
            //console.log("Upload NFT: ", result)
            return true
        } catch (error) {
            console.log("Upload NFT Error: ", error)
            return false
        }
}
export const updateNFT = async (new_val) => {
    /* Models in DataStore are immutable. To update a record you must use the copyOf function
     to apply updates to the item’s fields rather than mutating the instance directly */
    try {
        const returnModel = await queryDataStore()
        if (returnModel){
            returnModel.forEach( async(element) => {
                const result = await DataStore.save(ASKNFTEA.copyOf(element, item => {
                    // Update the values on {item} variable to update DataStore entry
                    item.awsUserPicture = new_val
                }));
                //console.log("Update NFT Result: ", result)
            });
        }else{
            console.log("No models found")
            return false
        }
    } catch (error) {
        console.log("Update NFT Error: ", error)
    }
}
const queryDataStore = async () => {
    const userId = get(cyberuser).username
    try {
        const result = await DataStore.query(ASKNFTEA,m => m.awsUserId("eq",userId));
        //console.log("Query DataStore Result: ", result)
        return result
    } catch (error) {
        console.log("Query DataStore Error: ", error)
        return false
    }
}
const deleteNFT = async () => {
    const modelToDelete = await DataStore.query(ASKNFTEA, 123456789);
    DataStore.delete(modelToDelete);
}
export const pic =async (modl) => {
    let img = await getImages(modl)
    return img
}
const queryNFT = async () => {
    try {
        const models = await DataStore.query(ASKNFTEA);
        models.forEach(element => {
            //console.log("MOD: ", JSON.stringify(element))
        });
        //map models onto nftStore
        models.map( async (model) => {
                createNft(
                    model.id,
                    model.awsUserId,
                    model.nftDescription,
                    await pic(model.nftImage),
                    model.nftPrice,
                    model.nftAssetOwner,
                    model.nftPrevAssetOwner,
                    model.nftAuctionDuration,
                    model.nftContractAddress,
                    model.nftLikes,
                    model.nftId,
                    await getImagesProtected(model.awsUserPicture,model.awsUserId),
                    model.awsName,
                    model.nftWalletName,
                    //model.nftName
                    )
        })
        return models
    } catch (error) {
        alert("Query Get models Error: ", error)
        return error
    }
}
const getImages = async (imageName) => {
    let [imageSplit, imageType] = imageName.split('.')
    try {
        const imageResult = await Storage.get(imageName, {
            level: "public", // defaults to `public`
            //identityId?: string, // id of another user, if `level: protected`
            download: false, // defaults to false
            //expires?: number, // validity of the URL, in seconds. defaults to 900 (15 minutes)
            contentType: `image/${imageType}` // set return content type, eg "text/html"
          }
        )
        //console.log("Get Images Result: ", imageResult)
        return imageResult
    } catch (error) {
        console.log("Get Image Error: ", error)
        return error
    }
}
export const getImagesProtected = async (imageName,id) => {
    const [imageSplit, imageType] = imageName.split('.')
    const ident = id
    //console.log("ident: ", ident)
    try {
        const imageResult = await Storage.get(imageName, {
            level: "protected", // defaults to `public`
            identityId: ident, // id of another user, if `level: protected`
            download: false, // defaults to false
            //expires?: number, // validity of the URL, in seconds. defaults to 900 (15 minutes)
            contentType: `image/${imageType}` // set return content type, eg "text/html"
          }
        )
        //console.log("Get Image Protected Result: ", imageResult)
        return imageResult
    } catch (error) {
        console.log("Get Image Error: ", error)
        return error
    }
}