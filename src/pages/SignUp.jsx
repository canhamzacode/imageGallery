import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSubmit from '../hooks/useSubmit';
import { loginSchema, signUpSchema } from '../config/schema';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../providers/AuthProvider';
import useCheckUserExistence from '../hooks/useCheckUserExistence';
import { toast } from 'react-toastify';

const SignUp = () => {
    const { user, setMyUserDb } = useContext(AuthContext)
    const usersRef = collection(db, 'users');
    const { register, handleSubmit, errors } = useSubmit(signUpSchema);
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate()

    const onSignUp = async (data) => {
        try {
            const { email, password } = data;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const parts = email.split("@");

            // parts[0] now contains the part before the "@" symbol
            const username = parts[0];

            if (user && user.uid) {
                const authenticatedUserId = user.uid;

                const isUserExisting = await useCheckUserExistence(authenticatedUserId);

                if (isUserExisting) {
                    setTimeout(() => {
                        toast.dismiss();
                        navigate('/');
                    }, 3000);
                    return;
                } else {
                    // User schema doesn't exist, create the user schema and redirect
                    const userData = {
                        userId: authenticatedUserId,
                        email: user.email,
                        username: username,
                        role: "user",
                    };

                    // Create the user schema in Firestore
                    await setDoc(doc(usersRef, authenticatedUserId), userData);

                    // Update the user context or perform any other necessary actions
                    setMyUserDb(userData);
                    toast.success('Signup successful!', {
                        position: 'top-right',
                        autoClose: 3000,
                    });

                    // Navigate to the desired page
                    setTimeout(() => {
                        toast.dismiss();
                        navigate('/');
                    }, 2000);
                }
            } else {
                console.error("Error signing in with Google: User information not available.");
                toast.error('Error signing Try Again', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    return (
        <div className='w-full md:px-[40px] p-[20px] grid grid-cols-1 md:grid-cols-2 gap-[20px] min-h-[100vh]'>
            <div className='w-full min-h-[100vh] flex flex-col gap-[25px] items-center justify-center'>
                <div className='w-full flex items-center justify-center'>
                    <div className='w-[160px] h-[60px]'>
                        <Link to="/">
                            <h1 className='text-3xl font-bold'>Ga<span className='text-red-400'>ll</span>ery</h1>
                        </Link>
                    </div>
                </div>
                <div className='grid gap-[40px] w-full'>
                    <div className=''>
                        <h2 className='text-3xl font-bold mb-2'>Create Your Account</h2>
                        <p className='text-lg'>Fill In Your details let's get started</p>
                    </div>
                    <div className='w-full'>
                    </div>
                    <form className="w-full grid gap-[15px]" onSubmit={handleSubmit(onSignUp)}>
                        <div className='w-full grid gap-[10px]'>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input id='email' type="text" placeholder='e.g user@gmail.com' className=' p-[10px] border-[#E8E8E8] border ' {...register("email")} />
                            {errors.email && (
                                <p
                                    style={{ textTransform: "capitalize" }}
                                    className="text-red-600"
                                >
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className='w-full grid gap-[10px]'>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input id='password' type="password" placeholder='Password' className=' p-[10px] border-[#E8E8E8] border ' {...register("password")} />
                            {errors.password && (
                                <p
                                    style={{ textTransform: "capitalize" }}
                                    className="text-red-600"
                                >
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className='w-full grid gap-[10px]'>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input id="confirmPassword" type="password" placeholder='Password' className=' p-[10px] border-[#E8E8E8] border ' {...register("confirmPassword")} />
                            {errors.confirmPassword && (
                                <p
                                    style={{ textTransform: "capitalize" }}
                                    className="text-red-600"
                                >
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        {loginError && <p style={{ textTransform: "capitalize" }}
                            className="text-red-600" >{loginError}</p>}
                        <button disabled={loading} type='submit' className='px-[30px] py-[10px] rounded-md border border-black w-full font-bold bg-black text-white'>
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                    </form >
                    <div className='w-full text-center  p-[64px]'>
                        <p>Already have an account? <Link to="/login"><span className='text-red-400'>Login</span></Link></p>
                    </div>
                </div>
            </div>
            <div className='hidden md:flex w-full h-[100vh] bg-white'>
                <img src="https://techstars-sooty.vercel.app/assets/login-03dcce2a.svg" alt="" className='h-full w-full object-contain' />
            </div>
        </div>
    )
}

export default SignUp