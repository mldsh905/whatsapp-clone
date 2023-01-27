import React from 'react';
import {Avatar} from "@mui/material";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase.config";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
import Image from "next/image";



const Chat = ({id, users}:{id:string, users:string[]}) => {
    const [user] = useAuthState(auth as any);

    const friend =  users.filter((e:string)=> e!==user?.email);
    // console.log(friend[0]);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', friend[0]) as any)
    const photo = recipientSnapshot?.docs[0]?.data().photoURL;
    // console.log(recipientSnapshot);

    const router = useRouter();
    const focus = id !== router.asPath.split('/')[2]?
        'flex  cursor-pointer hover:bg-gray-200 pt-1 px-2 py-2 gap-2 items-center border-b-2':
        'flex  cursor-pointer hover:bg-gray-300 bg-gray-300 pt-1 px-2 py-2 gap-2 items-center border-b-2'
    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }

    return (
        <div onClick={enterChat} className={focus}>
            {photo?(
                <Image width={30} height={30} className='hidden md:block rounded-full w-[30px] h-[30px]' src={recipientSnapshot?.docs?.[0].data().photoURL || '/whatsapp.jpg'} alt=""/>
            ):(
                <div className='hidden md:block'>
                    <Avatar className='cursor-pointer' sx={{width:'30px', height:'30px'}}/>
                </div>
            )}
            <p className='overflow-y-hidden container-snap text-xs md:text-base'>{friend}</p>
        </div>
    );
};

export default Chat;