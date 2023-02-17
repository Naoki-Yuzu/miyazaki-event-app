import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useChat } from '../context/chat-context';
import { useUser } from '../context/user-context';
import { db } from '../firebase/client-app';
import { chatPartner } from '../types/chat-partner';
import { User } from '../types/user';
import useWindowSize from '../utils/use-window-size';
import DmModal from './dm-modal';

const MessageListCard = ({chatPartnerInfo}: {chatPartnerInfo: chatPartner}) => {
  const [user, setUser] = useState<User>()
  const [width, _] = useWindowSize();
  const { currentUser } = useUser()
  const {state, dispatch} = useChat()

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const selectUser = ( data: chatPartner ) => {
    if(width <= 639) {
      setIsShowModal(true);
      if(dispatch) {
        dispatch({type: "CHANGE_CHAT_PARTNER", payload: data})
      }
    } else {
      // console.log("clicked..")
      console.log("user data :", data);
      if(dispatch) {
        dispatch({type: "CHANGE_CHAT_PARTNER", payload: data})
      }
    }
  }
 
  const closeModal = () => {
    setIsShowModal(false);
    console.log(isShowModal)
  };

  useEffect(() => {
    if(chatPartnerInfo != null) {
      const ref = doc(db, `users/${chatPartnerInfo.partnerId}`);
      getDoc(ref).then((result) => {
        // console.log("メッセージリストリザルト :", result.data());
        setUser(result.data() as User);
      })
    }
  }, [])

  // console.log("chatPartnerInfo :", chatPartnerInfo.partnerId)


  return (
    <>
      <button className="w-full max-h-[70px]" onClick={() => selectUser(chatPartnerInfo)}>
        <div className="flex gap-2 pl-1 py-1 h-full">
          {/* <Image className="h-10 w-10 object-cover rounded-full" src="/profile-image.jpg" width={40} height={40} alt="プロフィール画像"/> */}
          <img className="h-10 w-10 object-cover rounded-full" src={user?.profileImage ? user.profileImage : "/profile-image.svg"} width={40} height={40} alt="プロフィール画像"/>
          <div className="flex flex-col">
            <p className="text-xs sm:text-sm text-left">{user?.name}</p>
            <p className="text-xs sm:text-sm text-slate-500 flex-1 overflow-hidden text-left">{chatPartnerInfo.latestMessage ?
             chatPartnerInfo.latestMessage :
              ""} 
            </p>
          </div>
        </div>
      </button>
      {width <= 639 ? 
        <button>
          <DmModal isOpen={isShowModal} closeModal={closeModal} /> 
        </button>
      : null}
    </>
  );
};

export default MessageListCard;