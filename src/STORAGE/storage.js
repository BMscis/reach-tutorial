import {Storage} from "aws-amplify"
const getImageName = /[^.]*/
export const sendToStore = async (img1) => {
    let imageName = img1[0].name
    const results = await Storage.put(imageName, img1,{
        progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          },        
    })
    console.log("Storage put results:", results)
    return results == null || results == undefined ? false : true
}
export const getStore = async () => {
    const results = await Storage.list('',{
        progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          },}
    )
    console.log(`Uploaded: ${ProgressEvent.loaded}/${ProgressEvent.total}`)
    console.log("Storage put results:", results)
    return results
}
