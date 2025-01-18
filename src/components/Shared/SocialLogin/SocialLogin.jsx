import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();

    const handleLoginWithGoogle = () => {
        googleSignIn()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error.code);
        })
    }

    return (
        <div>
            <button onClick={handleLoginWithGoogle} className="btn w-full mt-6 py-2 bg-teal-600 text-base text-white hover:bg-teal-50 hover:text-black border-2 hover:border-teal-600 transition duration-300 flex items-center justify-center"><FaGoogle /> Sign In with Google</button>
        </div>
    );
};

export default SocialLogin;