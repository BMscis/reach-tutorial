import { get } from 'svelte/store'
import { Storage, API } from "aws-amplify"
import { cyberuser, userName } from "../AUTH/AuthStore"
import { createImageStore } from "../graphql/mutations"
import { listImageStores } from '../graphql/queries'
import { DataStore } from '@aws-amplify/datastore';
import { NFTSQL } from '../models';
import { nftStore } from './storageStore'
import { createNft } from '../Stores/nftCard'
export const sendToStore = async (image, protectionLevel) => {
    let level
    let imageName = image[0].name
    //console.log("@@@@@@@@@@@@@@@Image Name: ", imageName)
    //console.log("@@@@@@@@@@@@@@@Image: ", image)
    let [imageSplit, imageType] = imageName.split('.')
    switch (protectionLevel) {
        case "public":
            level = "public"
            break;
        case "private":
            level = "private"
            break;
        case "protected":
            level = "protected"
            break;
    }
    const uploadResult = await uploadNFT(
        get(cyberuser).username,
        "This is the first nft",
        imageName,
        1000,
        "0x0",
        "0x0",
        "0",
        "0",
        0,
        get(userName).name,
        "profile"
    )
    const uploadToS3Result = await uploadToS3(imageName, image[0],imageType,level)
    return (uploadResult == null || uploadResult == undefined) && (uploadToS3Result == null || uploadToS3Result == undefined) ? false : true
}
export const getStore = async () => {
    try {
        const results = await Storage.list('')
        //console.log("Get Store Result: ", results)
        const queryResults = await queryNFT()
        return queryResults
    } catch (error) {
        console.log("GET STORE ERROR: ", error)
        return ''
    }

}
export const uploadToS3 = async (fileName, file,type,level) => {
    try {
        const storageResult = await Storage.put(fileName, file,
            { level: "public", contentType: `image/${type}`, },
            )
        console.log("Upload to S3 Result: ", storageResult)
        return storageResult
    } catch (error) {
        console.log("Upload to S3 ERROR: ", error)
        return error
    }
}
const uploadNFT = async(owner, description, image, price, wallet = "0x0", prevOwner = "null", blockTime = "0", nonce = "0", likes = 0, ownerName, userPicture = "prof") => {
        try {
            const result = await DataStore.save(
                new NFTSQL({
                    "owner": owner,
                    "description": description,
                    "image": image,
                    "price": price,
                    "wallet": wallet,
                    "prevOwner": prevOwner,
                    "blockTime": blockTime,
                    "nonce": nonce,
                    "likes": likes,
                    "ownerName": ownerName,
                    "userPicture": userPicture,
                })
            );
            console.log("Upload NFT: ", result)
            return result
        } catch (error) {
            console.log("Upload NFT Error: ", error)
            return error
        }
    }
const updateNFT = async () => {
    /* Models in DataStore are immutable. To update a record you must use the copyOf function
     to apply updates to the item’s fields rather than mutating the instance directly */
    await DataStore.save(NFTSQL.copyOf(CURRENT_ITEM, item => {
        // Update the values on {item} variable to update DataStore entry
    }));
}
const deleteNFT = async () => {
    const modelToDelete = await DataStore.query(NFTSQL, 123456789);
    DataStore.delete(modelToDelete);
}
const queryNFT = async () => {
    try {
        const models = await DataStore.query(NFTSQL);
        const pic =async (modl) => {
            let img = await getImages(modl)
            return img
        }
        //map models onto nftStore
        models.map( async (model) => {
            createNft(
                model.id,
                model.description,
                await pic(model.image),
                model.price,
                model.wallet,
                model.ownerName,
                model.previousOwner,
            )
        })
        return models
    } catch (error) {
        console.log("Query Get models Error: ", error)
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
        return imageResult
    } catch (error) {
        console.log("Get Image Error: ", error)
        return error
    }
}