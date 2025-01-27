import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(user);

    // Create a new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in User
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google SignIn
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    // Sign out User
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Update User Profile
    const updateProfileInfo = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currenUser => {
            setUser(currenUser);
            // console.log(currenUser);
            if (currenUser) {
                // get token and store client side
                const userInfo = { email: currenUser?.email };
                axiosPublic.post('jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                // Remove Token in the client side
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        updateProfileInfo,
        signOutUser,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;