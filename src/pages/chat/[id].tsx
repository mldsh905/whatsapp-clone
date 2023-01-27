import React from 'react';
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import ChatScreen from "@/components/ChatScreen";
import {auth, db} from "../../../firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";

const Chat = ({chat, messages}:any) => {
    const [user] = useAuthState(auth as any);


    return (
        <div className='flex'>
            <Head>
                <title>Chat with {chat?.users?.[1] || 'null'}</title>
                <link rel="icon" href="/whatsapp.jpg"/>
            </Head>
            <Sidebar/>
            <div className='flex-1 grid grid-rows-[auto_1fr]'>
                <ChatScreen chat={chat} messages={messages}/>
            </div>
        </div>
    );
};

export default Chat;

export async function getServerSideProps(context: any) {
    const ref = db.collection('chats').doc(context.query.id);
    const messagesRes = await ref
        .collection('message')
        .orderBy('timestamp', 'asc')
        .get();
    console.log(messagesRes)
    const message = messagesRes.docs.map((doc:any)=>({
        id:doc.id,
        ...doc.data()
    })).map(messages=>({
        ...messages, timestamp:messages.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props:{
            messages:JSON.stringify(message),
            chat:chat
        }
    }
}