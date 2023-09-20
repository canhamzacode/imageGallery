import { collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSubmit from '../hooks/useSubmit';
import { loginSchema } from '../config/schema';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    const { user, setMyUserDb } = useContext(AuthContext)
    const usersRef = collection(db, 'users');
    const { register, handleSubmit, errors } = useSubmit(loginSchema);
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate()

    const onLogin = async (data) => {
        try {
            setLoading(true);
            setLoginError('');

            const { email, password } = data;

            // Perform authentication logic here (e.g., with Firebase, your backend, etc.)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user && user.uid) {
                setMyUserDb(user)
            }

            // If the user data is fetched from Firestore and needed, fetch it here
            setLoading(false);
            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 3000,
            });
            setTimeout(() => {
                toast.dismiss();
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error during login:', error);
            setLoading(false);
            if (error.code === 'auth/user-not-found') {
                // Email is not registered
                setLoginError('Email is not registered');
                toast.error('Email is not registered', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else if (error.code === 'auth/wrong-password') {
                // Password is incorrect
                setLoginError('Password is incorrect');
                toast.error('Password is incorrect', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                // Handle other types of errors
                setLoginError('An error occurred during login. Please try again later.');
                toast.error('An error occurred during login.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                console.log('An error occurred during login:', error);
            }
        }
    };
    return (
        <div className='w-full md:px-[40px] p-[20px] grid grid-cols-1 md:grid-cols-2 gap-[20px] h-[100vh]'>
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
                        <h2 className='text-3xl font-bold mb-2'>Welcome Back!</h2>
                        <p className='text-lg'>Continue right Where You stopped</p>
                    </div>
                    <div className='w-full'>
                    </div>
                    <form className="w-full grid gap-[15px]" onSubmit={handleSubmit(onLogin)}>
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
                        {loginError && <p style={{ textTransform: "capitalize" }}
                            className="text-red-600" >{loginError}</p>}
                        <button disabled={loading} type='submit' className='px-[30px] py-[10px] rounded-md border border-black w-full font-bold bg-black text-white'>
                            {loading ? "Loading..." : "Sign in"}
                        </button>
                    </form >
                    {/* <div className='w-full text-center  p-[64px]'>
                        <p>Don't have an account? <Link to="/signup"><span className='text-red-400'>Sign Up</span></Link></p>
                    </div> */}
                </div>
            </div>
            <div className='hidden md:flex w-full h-[100vh] bg-white'>
                <img src="https://techstars-sooty.vercel.app/assets/login-03dcce2a.svg" alt="" className='h-full w-full object-contain' />
            </div>
        </div>
    )
}

export default Login