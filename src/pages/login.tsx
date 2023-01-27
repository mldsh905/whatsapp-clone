import React from 'react';
import Head from "next/head";
import Image from "next/image";
import {auth, provider} from "../../firebase.config";

const Login = () => {
    const handleSignIn=()=>{
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <div className='h-[100vh] bg-gray-100 grid place-items-center'>
            <Head>
                <title>login</title>
                <link rel="icon" href="/whatsapp.jpg"/>
            </Head>

            <div className='grid bg-white p-24 place-items-center rounded-xl shadow-xl'>
                <Image className='mb-2' src='/whatsapp.png' alt={'whatsapp'} width={100} height={100}/>
                <button onClick={handleSignIn} className='border border-2 px-6 py-2 rounded-lg mt-4 hover:bg-gray-400 hover:border-white hover:text-white'>
                    Sign in with Google
                </button>
            </div>

        </div>
    );
};

export default Login;