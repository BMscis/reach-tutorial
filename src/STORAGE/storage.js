import { get } from 'svelte/store'
import { Storage, API } from "aws-amplify"
import { cyberuser, userName,nftContractId } from "../Wallet/WalletStore"
import { DataStore } from '@aws-amplify/datastore';
import { NFTSQL } from '../models';
import { nftStore } from './storageStore'
import { createNft } from '../Stores/nftCard'
import { Creator } from '../ReachContract/pt';
export const sendToStore = async (image, protectionLevel) => {
    let level = protectionLevel
    let imageName = image[0].name
    let [imageSplit, imageType] = imageName.split('.')

    // const uploadResult = await uploadNFT(
    //     get(cyberuser).username,
    //     "This is the first nft",
    //     imageName,
    //     1000,
    //     "0x0",
    //     "0x0",
    //     "0",
    //     get(nftContractId).contractId,
    //     0,
    //     get(userName).name,
    //     get(userName).picture
    // )
    //const uploadToS3Result = await uploadToS3(imageName, image[0],imageType,level)
    const create = new Creator()
    if(create.wallet != undefined){
        const contractCreated = await create.getContract()
        contractCreated? await create.deployContract() : null
    }
    let uploadResult = ""
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
    console.log("Upload to S3: ", fileName, file,type,level)
    try {
        const storageResult = await Storage.put(fileName, file,
            { level: level, contentType: `image/${type}`, },
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
export const updateNFT = async (new_val) => {
    /* Models in DataStore are immutable. To update a record you must use the copyOf function
     to apply updates to the item’s fields rather than mutating the instance directly */
    try {
        const returnModel = await queryDataStore()
        if (returnModel){
            returnModel.forEach( async(element) => {
                const result = await DataStore.save(NFTSQL.copyOf(element, item => {
                    // Update the values on {item} variable to update DataStore entry
                    item.userPicture = new_val
                }));
                console.log("Update NFT Result: ", result)
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
        const result = await DataStore.query(NFTSQL,m => m.owner("eq",userId));
        console.log("Query DataStore Result: ", result)
        return result
    } catch (error) {
        console.log("Query DataStore Error: ", error)
        return false
    }
}
const deleteNFT = async () => {
    const modelToDelete = await DataStore.query(NFTSQL, 123456789);
    DataStore.delete(modelToDelete);
}
const pic =async (modl) => {
    let img = await getImages(modl)
    return img
}
const queryNFT = async () => {
    try {
        const models = await DataStore.query(NFTSQL);
        models.forEach(element => {
            //console.log("MOD: ", JSON.stringify(element))
        });
        //map models onto nftStore
        models.map( async (model) => {
            createNft(
                model.id,
                model.owner,
                model.description,
                await pic(model.image),
                model.price,
                model.wallet,
                model.prevOwner,
                model.blockTime,
                model.nonce,
                model.likes,
                model.ownerName,
                await getImagesProtected(model.userPicture,model.owner)
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