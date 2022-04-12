import { get } from 'svelte/store'
import { writable} from 'svelte/store'
export const nftCardList = writable([])

export const createNft = ((id,owner,description,image,price,wallet,prevOwner,blockTime,nonce,likes,ownerName,userPicture,active=false)=>{
    const { subscribe, set} = writable({id:id,owner:owner,description:description,image:image,price:price,wallet:wallet,prevOwner:prevOwner,blockTime:blockTime,nonce:nonce,likes:likes,ownerName:ownerName,userPicture:userPicture,active:false})
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
          n.concat({id:id,owner:owner,description:description,image:image,price:price,wallet:wallet,prevOwner:prevOwner,blockTime:blockTime,nonce:nonce,likes:likes,ownerName:ownerName,userPicture:userPicture,active:active})
         ));
     }
    function action(node, binding) {
        function validate(value) {
            set({id:id,owner:owner,description:description,image:image,price:price,wallet:wallet,prevOwner:prevOwner,blockTime:blockTime,nonce:nonce,likes:likes,ownerName:ownerName,userPicture:userPicture,active:value})
            setActive(value)
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
              nftCardList.set(cardList)
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