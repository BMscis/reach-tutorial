import { Auth } from "aws-amplify";
import { updateNFT, uploadToS3 } from "../STORAGE/storage";
import { checkUser } from "../Utilities/utilities";

export const signUp = async (Upassword, Uname, Uemail, Uphone_number,Uimage) => {
    const email = Uemail;
    const uploadImage = Uimage[0].name
    //console.log("Upload Image: ", Uimage[0].type)
    const name = Uname;
    const phone_number = Uphone_number;
    const password = Upassword;
    const username = email
    try {
        const  user  = await Auth.signUp({username:username,password:password,attributes: {name:name,picture:uploadImage,phone_number:phone_number,email:email}});
        return true
    } catch (error) {
        switch (error.code) {
            case "InvalidPasswordException":
                console.log("PasswordError")
                break;
            case "UsernameExistsException":
                console.log("UserName Already Exists")
                break;
            default:
                console.log('error signing up:', error);
                break;
        }
        return false
    }
}
export const confirmSignUp = async (Username,Ucode) => {
    const code = Ucode;
    const username = Username;
    try {
      let confirm = await Auth.confirmSignUp(username, code);
      //console.log("Confirm:: ",confirm)
        return true
    } catch (error) {
        switch (error.code) {
            case "CodeMismatchException":
                //console.log('Missmatch', error);
                break;
            case "UserLambdaValidationException":
                //console.log('User except', error);
                break
            case "NotAuthorizedException":
                //console.log('Not Auth', error);
                break
            default:
                //console.log('error confirming sign up', error);
                break;
        }
        return false
    }
}
export const signIn = async (Uusername, Upassword,fromSignUp = false,Uimage="") => {
    const Susername = Uusername;
    const Spassword = Upassword;
    try {
        const user = await Auth.signIn(Susername, Spassword);
        const isUser = await checkUser()
        if(fromSignUp && !isUser){
            const uploadImage = Uimage[0].name
            const uploadImageR = await uploadToS3(uploadImage,Uimage,Uimage[0].type,"protected")
            console.log("AUTH Upload Image Result: ", uploadImageR)
        }
    } catch (error) {
        switch (error.code) {
            case "UserNotFoundException":
                //console.log("User not found");
                break;
            case "UserNotConfirmedException":
                //console.log("User not confirmed");
                break;
            case "NotAuthorizedException":
                //console.log("Not authorized");
                break;
            case "PasswordResetRequiredException":
                //console.log("Password reset required");
                break;
            case "ExpiredCodeException":
                //console.log("Expired code");
                break;
            default:
                //console.log("Sign in error", error);
                break;
        }
    }
}
export const resendConfirmationCode = async () => {
    try {
        await Auth.resendSignUp(username);
        //console.log('code resent successfully');
    } catch (err) {
        if(error.code == "UserNotConfirmedException") {
            Auth.verifyCurrentUserAttribute('email')
        } else {
            //console.log('error resending code', error);
        }
    }
}
export const updateUser = async (image) => {
    const imageName = image[0].name
    const imageType = image[0].type
    const imageValue = image[0]
    try {
        const user = await Auth.currentAuthenticatedUser();
        const updateRes = await Auth.updateUserAttributes(user, {
          'picture': imageName
        });
        console.log("AUTH Update User Result: ", updateRes)
        const updateToS3 = await uploadToS3(imageName,imageValue,imageType,"protected")
        console.log("AUTH Upload Image Result: ", updateToS3)
        const replaceImage = await updateNFT(imageName)
        console.log("AUTH Replace Image Result: ", replaceImage)
        return true
    } catch (error) {
        console.log("Error updating user: ", error);
        return false
    }   
  }