import React from 'react';
import { FaGoogle } from 'react-icons/fa6';

const SocialLogin = () => {

    const handleLoginWithGoogle = () => {
        
    }

    return (
        <div>
            <button onClick={handleLoginWithGoogle} className="btn w-full mt-6 py-2 bg-teal-600 text-base text-white hover:bg-teal-50 hover:text-black border-2 hover:border-teal-600 transition duration-300 flex items-center justify-center"><FaGoogle /> Login with Google</button>
        </div>
    );
};

export default SocialLogin;