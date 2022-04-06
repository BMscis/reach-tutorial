import { get } from 'svelte/store'
import { writable} from 'svelte/store'
export const nftCardList = writable([])

export const createNft = ((id,description,image,price,wallet,ownerName,previousOwner,active=false)=>{
    const { subscribe, set} = writable({id:id,description:description,image:image,price:price,wallet:wallet,ownerName:ownerName,previousOwner:previousOwner,active:false})
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
          n.concat({id:id,description:description,image:image,price:price,wallet:wallet,ownerName:ownerName,previousOwner:previousOwner,active:active})
         ));
     }
    function action(node, binding) {
        function validate(value) {
            set({id:id,description:description,image:image,price:price,wallet:wallet,ownerName:ownerName,previousOwner:previousOwner,active:value})
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