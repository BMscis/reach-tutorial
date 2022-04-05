import { Auth } from "aws-amplify"
import {cyberuser} from "../AUTH/AuthStore"

export const checkDevice = () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return true
      }
      else{
        return false
      }
}
export const checkUser = async () => {
  //console.log("checkUser")
  try {
      const user = await Auth.currentAuthenticatedUser()
      console.log("Current Sess: ", user)
      // //console.log("Current User: ", await Auth.currentUserInfo())
      // //console.log("Authent User: ", await Auth.currentAuthenticatedUser())
      cyberuser.set(user)
      return false
  } catch (error) {
      //console.log("ChUser Error: ", error)
      return true
  }
}

