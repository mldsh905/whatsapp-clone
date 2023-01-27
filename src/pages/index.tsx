import Head from 'next/head'
import {Inter} from '@next/font/google'
import Sidebar from "@/components/Sidebar";
import ChatScreen from "@/components/ChatScreen";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <div className='flex'>
            <Head>
                <title>Whatsapp-Clone</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/whatsapp.jpg"/>
            </Head>
            <Sidebar/>
            <ChatScreen/>
        </div>
    )
}