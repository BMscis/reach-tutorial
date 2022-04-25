import { writable} from 'svelte/store'
export const nftStore = writable(
    {id:"",
    nftDescription:"",
    nftImage:"",
    nftPrice:"",
    nftAssetOwner:"",
    awsName:"",
    previousOwner:"",
    }
)