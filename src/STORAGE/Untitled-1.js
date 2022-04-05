import { get } from 'svelte/store'
import {Storage,API} from "aws-amplify"
import {cyberuser, userName} from "../AUTH/AuthStore"
import { createImageStore } from "../graphql/mutations"
import { listImageStores } from '../graphql/queries'

export const sendToStore = async (img1,level) => {
    let protectionLevel
    switch (level) {
        case "public":
            protectionLevel = "public"
            break;
        case "private":
            protectionLevel = "private"
            break;
        case "protected":
            protectionLevel = "protected"
            break;
    
        default:
            break;
    }
    let imageName = img1[0].name
    let [imageSplit,imageType] = imageName.split('.')

    const nftea = {
        owner:get(cyberuser).username,
        description:"This is the first nft",
        image:`https://nftea-reach-project-storage171809-staging.s3.eu-west-2.amazonaws.com/public/${imageName}`,
        price:1000,
        wallet:"0x0",
        prevOwner:"0x0",
        blockTime:0,
        nonce:0,
        likes:0
    }
    const results = await Storage.put(imageName, img1,
        {level: protectionLevel ,contentType: `image/${imageType}`,},
        {progressCallback(progress) {console.log(`Uploaded: ${progress.loaded}/${progress.total}`);},        
    })
    console.log("RESULT: ",results)
    const resultApi = await API.graphql({query: createImageStore, variables: {input: nftea}})
    console.log("RESULTAPI: ",resultApi)
    return (results == null || results == undefined) && (resultApi == null || resultApi == undefined) ? false : true
}
export const getStore = async () => {
    try {
        const results = await Storage.list('',{
            progressCallback(progress) {
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
              },}
        )
        let query = await API.graphql({query:listImageStores})
        console.log(query)
        console.log("Storage put results:", results)
        return results
    } catch (error) {
        console.log("Failed GEtting images: ",error)
    }
}
export const getImage = async (img) => {
    try {
        const results = await Storage.get(img,
            {level: 'public',},
            {progressCallback(progress) {console.log(`Uploaded: ${progress.loaded}/${progress.total}`);},}
        )
        return results
    } catch (error) {
        console.log("Failed GEtting images: ",error)
    }
}
export const removeImage = async (img) => {
    const results = await Storage.remove("d41d8cd98f00b204e9800998ecf8427e",
        {
            level: 'public',
          },
        {
            progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          },
        }
    )
    console.log("Storage put results:", results)
    return results
}
