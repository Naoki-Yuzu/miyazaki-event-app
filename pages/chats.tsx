import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/layout';
import MessageListCard from '../components/message-list-card';
import { NextPageWithLayout } from './_app';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import DmContainer from '../components/dm-container';
import useWindowSize from '../utils/use-window-size';
import { collection, CollectionReference, doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { useUser } from '../context/user-context';
import { db } from '../firebase/client-app';
import { chatPartner } from '../types/chat-partner';
import ChatParnterDetail from '../components/chat-parnter-detail';


const Chats: NextPageWithLayout = () => {
  const [chatPartners, setChatPartners] = useState<chatPartner[]>();
  const [width] = useWindowSize();
  const { currentUser } = useUser();

  useEffect(() => {
    const ref = currentUser?.uid ? collection(db, "chatPartnerLists", currentUser.uid, "data") : null;
    const getChatPartnerLists = () => {
      if(ref != null) {
        const unsubscriber = onSnapshot(ref, (result) => {
          // console.log("チャット相手 :", result.data());
          console.log("結果 :", result.docs.map(doc => doc.data()));
          setChatPartners(result.docs.map(doc => doc.data() as chatPartner))
          // console.log("リザルトデータ :", result.data() as object)
          // posts = snap.docs.map(doc => doc.data() as Post);
        })
  
        return () => {
          unsubscriber();
        };
      }
    }

    currentUser?.uid && getChatPartnerLists();
  }, [currentUser?.uid]);

  // console.log("現在のユーザー :", currentUser)
  console.log("チャット相手たち :", chatPartners);
  // console.log("スプレッド演算子" ,{...chatPartners})
  // console.log("型", typeof(Object.entries(chatPartners)));

  if (width <= 639) {
    return (
      <div className="flex justify-center h-[calc(100vh-256px)] sm:h-[calc(100vh-264px)]">
        <div className="my-12 bg-white w-[90%] flex rounded-xl border min-h-[90%]">
          <div className="sm:flex-1 flex flex-col gap-1 px-1 w-full py-3">
            <div className="h-10 flex items-center">
              <h3 className="text-base font-semibold px-2">メッセージリスト</h3>
            </div>
            {chatPartners?.sort((a: chatPartner, b: chatPartner) => b.date - a.date).map((chatPartner: chatPartner, index: number) => {
              return (
                <MessageListCard key={index} chatPartnerInfo={chatPartner}/>
                );
            })}
            
            {/* <MessageListCard param={null}/> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <div className="my-12 bg-white w-[90%] sm:min-h-[600px] sm:max-w-[1000px] flex rounded-xl border ">
          <div className="sm:flex-1 flex flex-col gap-1 px-1 border-r py-3">
            <div className="h-10 flex items-center">
              <h3 className="text-lg font-semibold px-2">メッセージリスト</h3>
            </div>
            {chatPartners?.sort((a: chatPartner, b: chatPartner) => b.date - a.date).map((chatPartner: chatPartner, index: number) => {
              return (
                <MessageListCard key={index} chatPartnerInfo={chatPartner}/>
                );
            })}
            {/* <MessageListCard param={null}/>
            <MessageListCard  param={null}/> */}
          </div>
          <div className="w-full sm:w-[70%]">
            <ChatParnterDetail />
          </div>
        </div>
      </div>
    );
  }
};

Chats.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}


export default Chats;