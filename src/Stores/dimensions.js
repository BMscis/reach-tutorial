import { writable} from 'svelte/store'

export const windowSize = writable({width:0,height:0,isLarge:0})
export const SetWindowSize = (() =>{
    const {subscribe,set} = windowSize
    function action(node, binding) {
        function validate(value, dirty) {
            set({width:value[0],height:value[1],isLarge:value[0] > 732})
          return
        }
    
        validate([window.innerWidth,window.innerHeight],false)
    
        return {
          update(value) {
            validate(value,true)
          }
        }
      }
    return [{subscribe},action]
})