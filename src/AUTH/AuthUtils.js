import { Auth } from "aws-amplify";
import { checkUser } from "../Utilities/utilities";

export const signUp = async (Upassword, Uname, Uemail, Uphone_number) => {
    const password = Upassword;
    const name = Uname;
    const email = Uemail;
    const phone_number = Uphone_number;
    const username = email
    try {
        const { user } = await Auth.signUp({username,password,attributes: {name,email,phone_number,}});
        console.log(user)
        return true
    } catch (error) {
        if(error.code == "UsernameExistsException"){
            console.log("UserName Already Exists")
        }
        else{
            console.log('error signing up:', error);
        }
        return false
    }
}
export const confirmSignUp = async (Username,Ucode) => {
    const code = Ucode;
    const username = Username;
    try {
      let confirm = await Auth.confirmSignUp(username, code);
      console.log("Confirm:: ",confirm)
        return true
    } catch (error) {
        switch (error.code) {
            case "CodeMismatchException":
                console.log('Missmatch', error);
                break;
            case "UserLambdaValidationException":
                console.log('User except', error);
                break
            case "NotAuthorizedException":
                console.log('Not Auth', error);
                break
            default:
                console.log('error confirming sign up', error);
                break;
        }
        return false
    }
}
export const signIn = async (Uusername, Upassword) => {
    const Susername = Uusername;
    const Spassword = Upassword;
    try {
        const user = await Auth.signIn(Susername, Spassword);
        console.log("SUCCESS: ", user);
        checkUser()
    } catch (error) {
        switch (error.code) {
            case "UserNotFoundException":
                console.log("User not found");
                break;
            case "UserNotConfirmedException":
                console.log("User not confirmed");
                break;
            case "NotAuthorizedException":
                console.log("Not authorized");
                break;
            case "PasswordResetRequiredException":
                console.log("Password reset required");
                break;
            case "ExpiredCodeException":
                console.log("Expired code");
                break;
            default:
                console.log("Sign in error", error);
                break;
        }
    }
}
export const resendConfirmationCode = async () => {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        if(error.code == "UserNotConfirmedException") {
            Auth.verifyCurrentUserAttribute('email')
        } else {
            console.log('error resending code', error);
        }
    }
}