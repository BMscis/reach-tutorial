import { writable } from "svelte/store";

export const contractState = writable(0)
export const auctionReady = writable(false)
export const creatorSeeBid = writable([])