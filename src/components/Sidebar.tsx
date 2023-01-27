import React, {useEffect} from 'react';
import {Avatar, Button, IconButton} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from '@mui/icons-material/Search';
import EmailValidator from 'email-validator';
import {auth, db} from "../../firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from "@/components/Chat";

const Sidebar = () => {
    const [user] = useAuthState(auth as any);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user?.email)
    const [chatsSnapshot]:any = useCollection(userChatRef as any);
    // console.log('sidebar',user.photoURL)
    // useEffect(()=>{window.location.reload()},[])


    const chatAlreadyExists = (email:string) => {
        return !!chatsSnapshot?.docs.find(
            (chat:any) => chat.data().users.find(
                (user: any) => user === email)?.length > 0);
    }

    const handleCreateChat = () => {
        const input = prompt(
            'Please enter email address'
        )
        if (!input) return;
        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user?.email) {
            db.collection('chats').add({
                users: [user?.email, input],
            })
        } else {
            alert('no')
        }

    }

    return (
        <div
            className='w-[120px] md:w-[25vw] bg-gray-100 shadow-md z-20 shadow-gray-400 flex-wrap h-[100vh] overflow-auto grid grid-rows-[auto_auto_auto_1fr] gap-2'>
            {/*header*/}
            <div
                className='grid md:h-[10vh] gap-2 grid md:flex bg-white justify-center place-items-center md:justify-between p-2 '>
                {/*<Avatar onClick={()=>{auth.signOut()}} className='cursor-pointer hover:opacity-80'/>*/}
                <div
                    className='flex hover:bg-gray-200 p-2 rounded-md justify-center cursor-pointer items-center gap-2'
                    onClick={() => {
                        if (window.confirm('Log out?')){
                            auth.signOut()
                        }
                    }}
                >
                    <img className='h-8 w-8 rounded-full cursor-pointer' src={user?.photoURL as string || '/whatsapp.jpg'} alt='user'/>
                    <span className='hidden md:inline-block cursor-pointer text-sm text-gray-500'>Log out</span>
                </div>

                <div className='grid md:flex'>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton sx={{}}>
                        <MoreVertIcon className=' ' sx={{}}/>
                    </IconButton>
                </div>
            </div>

            {/*search*/}
            <div className=' grid relative justify-center md:flex items-center p-1 rounded-md my-4 md:my-0 rounded-lg md:rounded-none'>
                <div className='z-10 absolute right-0'>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </div>
                <input
                    type="text"
                    placeholder='Search'
                    className='text-xs md:text-base w-full outline-none absolute md:relative flex-1 md:w-[10vw] px-4 py-2 rounded-lg'
                />
            </div>

            {/*add chat button*/}
            <div className='w-full flex'>
                <button onClick={handleCreateChat} className='flex-1 text-xs md:text-base bg-white py-2 md:mx-1 rounded-lg hover:bg-gray-200'>
                    Start a new chat
                </button>
            </div>

            {/*list of chats*/}
            <div className='flex justify-start overflow-scroll flex-col bg-white'>
                {chatsSnapshot?.docs.map((chat:any)=>(
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
