import React, {useEffect, useRef, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase.config";
import {useRouter} from "next/router";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {Avatar, IconButton} from "@mui/material";
import {useCollection} from "react-firebase-hooks/firestore";
import Message from "@/components/Message";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import moment from 'moment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Image from "next/image";



const ChatScreen = ({chat, messages}: any) => {
    const [user] = useAuthState(auth as any);
    const [input, setInput] = useState('');
    const router: any = useRouter();
    // console.log(user,chat?.users)
    const email = chat?.users?.filter((e: string) => e !== user?.email);
    // console.log(email);
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('message').orderBy('timestamp', 'asc') as any);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', email[0]) as any)


    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message: any) => (
                <Message key={message.id} user={message.data().user}
                         message={{...message.data(), timestamp: message.data().timestamp?.toDate().getTime()}}/>
            ))
        }
        // else {
        //     return JSON.parse(messages).map((message: any) => (
        //         <Message key={message.id} user={message.user} message={message}/>
        //     ))
        //     // router.push('/index')
        // }
    }
    useEffect(() => {
        scrollToBottom()
    }, [showMessages])


    const endOfMessagesRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: 'end'
        })
    }

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // update the last seen
        await db.collection('users').doc(user?.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});

        await db.collection('chats').doc(router.query.id).collection('message').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user?.email,
            photoURL: user?.photoURL,
        });

        await setInput('');
        scrollToBottom();
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const time = recipient?.lastSeen?.toDate()


    return (
        <div className='bg-[#eeeae3] relative h-[100vh] '>
            <div
                className='h-[10vh] px-4 sticky flex justify-between items-center bg-gray-100 shadow-md shadow-gray-200'>
                <div className='flex items-center gap-3'>
                    {recipientSnapshot?.docs.length ? (
                        <Image width={40} height={40} className='rounded-full w-[40px] h-[40px]'
                               src={recipient?.photoURL} alt="photo"/>
                    ) : (
                        <Avatar/>
                    )}
                    <div className='grid gap-1'>
                        <h3 className='font-bold'>{email || 'loading...'}</h3>

                        <p className='text-xs text-gray-500'>{
                            recipientSnapshot?.docs.length ? (
                                `Last active: ${recipient?.lastSeen?.toDate() ? (
                                    moment(time).fromNow()
                                ) : (
                                    'unavailable'
                                )
                                }`
                            ) : (
                                'Loading...'
                            )
                        }</p>
                    </div>
                </div>
                <div className='hidden md:flex gap-3'>
                    <div
                        onClick={() => {
                            alert('User Instructions\n' +
                                '1. Please click "start a new chat" on left sidebar to add a friend \n' +
                                '2. Fill in a Gmail address of your friend or just my email "yzcha28@gmail.com"\n' +
                                '3. Leave your message\n' +
                                '4. Ask your friend to login and reply'
                            )
                        }}
                        className='cursor-pointer flex justify-center items-center gap-2 mr-4'
                    >
                        <IconButton>
                            <QuestionMarkIcon className='bg-gray-400 rounded-full'/>
                        </IconButton>
                        <span className=' text-gray-500'>Help</span>
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <MoreVertIcon/>
                        <AttachFileIcon/>
                    </div>
                </div>
            </div>

            {/*messages*/}
            <div className='h-[82vh] overflow-auto w-auto'>
                <div className='flex flex-col gap-3 p-2' ref={endOfMessagesRef}>
                    {showMessages()}
                </div>
            </div>
            <form className='flex h-[8vh] sticky bottom-0 bg-white px-4 py-2 gap-2'>
                <input value={input} onChange={e => setInput(e.target.value)} type="text"
                       className='h-full w-full px-4 bg-gray-100 text-lg rounded-md outline-none'/>
                <button disabled={!input} type='submit' onClick={sendMessage}
                        className='flex place-items-center bg-gray-100 px-4 rounded-md hover:bg-gray-400 hover:text-white cursor-pointer'>Send
                </button>
            </form>
        </div>
    );
};

export default ChatScreen;
