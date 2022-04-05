import { writable} from 'svelte/store'
export const nftStore = writable(
    {id:"",
    description:"",
    image:"",
    price:"",
    wallet:"",
    ownerName:"",
    previousOwner:"",
    }
)