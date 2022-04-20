import { writable } from "svelte/store";

export const wallet = writable()
export const balance = writable(0)
export const cyberuser = writable({})
export const walletName = writable('')
export const walletAddress = writable('')
export const nftContractId = writable({})
export const userName = writable({name:''})
export const reachStdlib = writable()