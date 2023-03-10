import Head from 'next/head'
import {Inter} from '@next/font/google'
import Sidebar from "@/components/Sidebar";
import ChatScreen from "@/components/ChatScreen";
import React from "react";
import {db} from "../../firebase.config";

const inter = Inter({subsets: ['latin']})

export default function Home({chat, messages}:any) {

    return (
        <div className='flex'>
            <Head>
                <title>Whatsapp-Clone</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/whatsapp.jpg"/>
            </Head>
            <Sidebar/>
            <div className='flex bg-[#eeeae3] justify-center items-center flex-1'>
                <div className='p-4 m-4 bg-gray-100 rounded-xl flex flex-col justify-center items-start gap-4'>
                    <span className='text-lg font-bold' >User Instructions</span>
                    <span>0. If you already have friends, please click their name on left sidebar to start</span>
                    <span>1. Please click "start a new chat" on left sidebar to add a friend</span>
                    <span>2. Fill in a Gmail address of your friend or just my email "yzcha28@gmail.com"</span>
                    <span>3. Leave your message</span>
                    <span>4. Ask your friend to login and reply</span>
                    <span>5. Enjoy</span>
                </div>
            </div>
        </div>
    )
}
