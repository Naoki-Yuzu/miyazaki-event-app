import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useChat } from '../context/chat-context';
import { useUser } from '../context/user-context';
import { db } from '../firebase/client-app';
import { ChatMessageInfo } from '../types/chat-message-info';
import Message from './message';

const DmContainer = () => {
  const { state } = useChat();
  const { currentUser } = useUser();
  const [messages, setMessages] = useState<Array<ChatMessageInfo>>()
  console.log("チャットID :", state?.chatId);

  useEffect(() => {
    const ref = doc(db, `chats/${state?.chatId}`)
    const unsubscriber = onSnapshot(ref, (result) => {
      result.exists() && setMessages(result.data().messages)
    })

    return () => {
      unsubscriber();
    };
  }, [state?.chatId])

  return (
    <div className="flex-1 py-5 px-2 gap-5 sm:gap-9 flex flex-col overflow-y-scroll sm:max-h-[500px] ">
      {/* <Message isOwnerMessage/>
      <Message isOwnerMessage={false}/> */}
      {messages?.map((message, index) => {
        return (
          <Message isOwnerMessage={message.senderId == currentUser?.uid ? true : false} messageInfo={message} key={index}/>
        );
      })}
    </div>
  )
}

export default DmContainer