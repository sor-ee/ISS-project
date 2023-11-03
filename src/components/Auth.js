import {auth,provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';

import Cookies from 'universal-cookie';
const cookies = new Cookies()

export const Auth = (props) => {
    const {setIsAuth} = props
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true)     
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="auth">
            <div className='p-5'></div>
            <div className='container-md bg-white p-5 rounded-3 fs-5'>
                <p className="text-center">Sign in with google to continue</p>
                <center><button className='bgClass border-0 p-2 ps-4 pe-4 rounded-3' onClick={signInWithGoogle}>Sign in with google</button></center>
            </div>
        </div>
    );
    
}