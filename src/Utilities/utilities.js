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
      cyberuser.set(user)
      //console.log("checkUser: ", user)
      //console.log("checkUser: ", user.identityId)
      return false
  } catch (error) {
      console.log("ChUser Error: ", error)
      return true
  }
}

