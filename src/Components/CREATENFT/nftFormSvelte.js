import { writable } from "svelte/store";

export const formNumber = writable(0)
export const nftName = writable()
export const nftSymbol = writable()
export const nftDescription = writable()
export const nftPrice = writable()
export const nftImage = writable({url:'',image:''})
export const mnemonicPhrase = writable()