import { writable} from 'svelte/store'

export const reachWallet = writable({account:"",balance:""})