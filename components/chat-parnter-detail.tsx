import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { arrayUnion, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useChat } from '../context/chat-context';
import { useUser } from '../context/user-context';
import { db } from '../firebase/client-app';
import { ChatMessage } from '../types/chat-message';
import { User } from '../types/user';
import DmContainer from './dm-container'

const ChatParnterDetail = () => {
  const [user, setUser] = useState<User>();
  const { state } = useChat();
  const { currentUser } = useUser();
  const { register, handleSubmit, resetField } = useForm<ChatMessage>();
  

  useEffect(() => {
    const getUserInfo = () => {
      const ref = doc(db, `users/${state?.user.partnerId}`);
      getDoc(ref).then((result) => {
        setUser( result.data() as User);
      }).catch((err) => {
      })
    }

    state && getUserInfo();
  }, [state])

  const sendMessage = async (data: ChatMessage) => {
    try {
      const chatIdRef = doc(db, `chats/${state?.chatId}`)
      await setDoc(chatIdRef, {
        messages: arrayUnion({
          text: data.text,
          senderId: currentUser.uid,
          createdAt: Date.now(),
        })
      }, {merge: true})
  
      const chatOwnerRef = collection(db, "chatPartnerLists", currentUser.uid, "data");
      await setDoc(doc(chatOwnerRef, state?.chatId), {
        date: Date.now(),
        latestMessage: data.text,
      }, {merge: true});
  
      const chatPartnerRef = collection(db, "chatPartnerLists", state?.user.partnerId, "data");
      await setDoc(doc(chatPartnerRef, state?.chatId), {
        date: Date.now(),
        latestMessage: data.text,
      }, {merge: true});

      resetField("text");
    }
    catch (err) {
      alert("エラーが発生しました");
    }
   
  }
  
  return (
    <div className="flex flex-col h-full">
    <div className="flex items-center py-2 px-3 border-b gap-[14px]">
      {/* <Image src="/profile-image-takachiho-hasshinn-kouryukai.jpg" alt="プロフィール画像" className="h-10 w-10 object-cover rounded-full" width={40} height={40}/> */}
      <img src={user?.profileImage ? user.profileImage : "/profile-image.svg"} alt="プロフィール画像" className="h-10 w-10 object-cover rounded-full" width={40} height={40}/>
      <p className="sm:text-base font-semibold">{user?.name}</p>
    </div>
    <DmContainer />
    <form onSubmit={handleSubmit(sendMessage)} className="h-[60px] bg-slate-200 flex items-center p-3 gap-3">
      <input {...register("text", {required: true, maxLength: 100})} className="outline-none rounded-[10px] h-full px-1 flex-1 text-sm sm:text-base" placeholder="メッセージを入力" />
      <button className="h-[30px] w-[30px] bg-white flex items-center justify-center rounded-full">
        <PaperAirplaneIcon className="h-5 w-5 text-slate-200"/>
      </button>
    </form>
  </div>
  );
};

export default ChatParnterDetail