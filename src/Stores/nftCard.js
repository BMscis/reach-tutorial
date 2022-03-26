import { get } from 'svelte/store'
import { writable} from 'svelte/store'
export const nftCardList = writable([])

export const createNft = ((pic,owner,label,price,active)=>{
    const { subscribe, set, update} = writable({pic:"",owner:"",label:"",price:"",active:""})
    //const validator
     let cardList = get(nftCardList)
     let component
     try {
         component = cardList.find((v) => v.label === label);
     } catch (error) {
         component = false
     }
     if(!component){
         nftCardList.update((n) => (
          n.concat({pic:pic,owner:owner,label:label,price:price,active:active})
         ));
     }
    set({pic:pic,owner:owner,label:label,price:price,active:active})
    function action(node, binding) {
        function validate(value) {
            set({pic:pic,owner:owner,label:label,price:price,active:value})
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
              let component = cardList.find((v) => v.label === label);
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