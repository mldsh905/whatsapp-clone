import React from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase.config";
import moment from 'moment';


const Message = ({user, message}: any) => {
    // console.log(moment(message.timestamp).fromNow());
    // console.log(user);
    // console.log(typeof 'a')
    // console.log('user' instanceof String);
    const [userMe] = useAuthState(auth as any);
    // console.log(userMe)
    const me = userMe?.email === message.user;
    const left = 'grid justify-start';
    const right = 'grid justify-end';


    return (
        <div className={me ? right : left}>
            <span className={me ?
                'inline-block text-right max-w-[220px] break-words px-4 mr-4 py-1 bg-white rounded-md bg-[#dcf8c6]' :
                'inline-block max-w-[220px] break-words px-4 py-1 ml-2 bg-white rounded-md '}>
                {message.message}
                <div className={me?
                    'text-xs flex justify-end text-gray-400'
                :'text-xs flex justify-start text-gray-400'}>
                {moment(message.timestamp).fromNow()}
                </div>
            </span>

        </div>
    );
};

export default Message;