import { get } from 'svelte/store'
import { writable} from 'svelte/store'
export const nftCardList = writable([])

export const createNft = ((id,awsUserId,nftDescription,nftImage,nftPrice,nftAssetOwner,nftPrevAssetOwner,nftAuctionDuration,nftContractAddress,nftLikes,nftId,awsUserPicture,awsName,nftWalletName,active=false,isOwner=false)=>{
    const { subscribe, set} = writable({id:id,awsUserId:awsUserId,nftDescription:nftDescription,nftImage:nftImage,nftPrice:nftPrice,nftAssetOwner:nftAssetOwner,nftPrevAssetOwner:nftPrevAssetOwner,nftAuctionDuration:nftAuctionDuration,nftContractAddress:nftContractAddress,nftLikes:nftLikes,nftId:nftId,awsUserPicture:awsUserPicture,awsName:awsName,nftWalletName:nftWalletName,active:false,isOwner:false})
    //const validator
     let cardList = get(nftCardList)
     let component
     try {
         component = cardList.find((v) => v.id === id);
     } catch (error) {
         component = false
     }
     if(!component){
         nftCardList.update((n) => (
          n.concat({id:id,awsUserId:awsUserId,nftDescription:nftDescription,nftImage:nftImage,nftPrice:nftPrice,nftAssetOwner:nftAssetOwner,nftPrevAssetOwner:nftPrevAssetOwner,nftAuctionDuration:nftAuctionDuration,nftContractAddress:nftContractAddress,nftLikes:nftLikes,nftId:nftId,awsUserPicture:awsUserPicture,awsName:awsName,nftWalletName:nftWalletName,active:active,isOwner:isOwner})
         ));
     }
    function action(node, binding) {
        function validate(value) {
            setActive(value)
            set({id:id,awsUserId:awsUserId,nftDescription:nftDescription,nftImage:nftImage,nftPrice:nftPrice,nftAssetOwner:nftAssetOwner,nftPrevAssetOwner:nftPrevAssetOwner,nftAuctionDuration:nftAuctionDuration,nftContractAddress:nftContractAddress,nftLikes:nftLikes,nftId:nftId,awsUserPicture:awsUserPicture,awsName:awsName,nftWalletName:nftWalletName,active:active,isOwner:isOwner})
            //get nftCardList
            //Make active false for all
            function getNftCardList(){
              let cardList = get(nftCardList)
              cardList.forEach((v)=>{
                  v.active = false
              })
              nftCardList.update((n) => (n = n));
              return cardList
          }
          //get nftCardList
          //find label where label === label
          //try make active true
          //update nftCardList
         function setActive(value){
              let cardList = getNftCardList()
              let component = cardList.find((v) => v.id === id);
              component.active = value
              nftCardList.update((n) => (n = n));
         }
          return
        }
        validate(node,binding)
    
        return {
          update(value) {
            validate(value,true)
          }
        }
      }
    return [{subscribe},action]
})