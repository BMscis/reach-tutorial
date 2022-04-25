import { writable } from "svelte/store";

export const wallet = writable()
export const nftId = writable('')
export const balance = writable(0)
export const provider = writable()
export const cyberuser = writable({})
export const reachStdlib = writable()
export const walletName = writable('')
export const walletAddress = writable('')
export const nftContractId = writable()
export const userName = writable({name:''})