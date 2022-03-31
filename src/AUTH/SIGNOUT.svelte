<script>
    import { Auth } from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
</script>
<button on:click={()=>{signOut()}}>signout</button>