import { API } from "aws-amplify";
import { uploadToS3 } from "./storage";
import * as mutations from '../graphql/mutations';
import { consologger } from "../Utilities/utilities";
import { nftSubscriptionCreate,nftSubscriptionUpdate } from "../WebSockets/nftUpdates";

export const creatNFTeaCard = async (nftCard,imageName, image,imageType,level) => {
    consologger("createNFTeaCard",nftCard)
    const [createSocket,websocketUnsubscribe] = nftSubscriptionCreate()
    createSocket()
    try {
        const uploadToS3Result = await uploadToS3(imageName, image,imageType,level)
        console.log("Upload to S3 Result: ", uploadToS3Result)
        const newCard = await API.graphql({ query: mutations.createASKNFTEA, variables: {input: nftCard}});
        console.log("New Card: ", newCard)
        //if(newCard){websocketUnsubscribe()}
        return true
    } catch (error) {
        console.log("CREATE NFT ERROR: ", error)
        return false
    }

}
export const updateNFTeaCard = async (nftCard) => {
    const [createSocket,websocketUnsubscribe] = nftSubscriptionUpdate()
    createSocket()
    try {
        const newCard = await API.graphql({ query: mutations.updateASKNFTEA, variables: {input: nftCard}});
        console.log("Updated Card: ", newCard)
        //if(newCard){websocketUnsubscribe()}
        return true
    } catch (error) {
        console.log("UPDATE NFT ERROR: ", error)
        return false
    }

}