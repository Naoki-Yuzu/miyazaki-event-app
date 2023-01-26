import Image from 'next/image';
import React, { ReactElement } from 'react'
import Layout from '../components/layout';
import MessageListCard from '../components/message-list-card';
import { NextPageWithLayout } from './_app';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import DmContainer from '../components/dm-container';
import useWindowSize from '../utils/use-window-size';

const Chat: NextPageWithLayout = () => {
  const [width, _] = useWindowSize();

  if (width <= 639) {
    return (
      <div className="flex justify-center h-[90%]">
        <div className="my-12 bg-white w-[90%] flex rounded-xl border min-h-[90%]">
          <div className="sm:flex-1 flex flex-col gap-1 px-1 border-r py-3">
            <div className="h-10 flex items-center">
              <h3 className="text-base font-semibold px-2">メッセージリスト</h3>
            </div>
            <MessageListCard />
            <MessageListCard />
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
            <MessageListCard />
            <MessageListCard />
          </div>
          <div className="w-full sm:w-[70%]">
            <div className="flex flex-col h-full">
              <div className="flex items-center py-2 px-3 border-b gap-[14px]">
                <Image src="/profile-image-takachiho-hasshinn-kouryukai.jpg" alt="プロフィール画像" className="h-10 w-10 object-cover rounded-full" width={40} height={40}/>
                <p className="sm:text-base font-semibold">タカチホハッシン交流会</p>
              </div>
              <DmContainer />
              <div className="h-[60px] bg-slate-200 flex items-center p-3 gap-3">
                <input className="outline-none rounded-[10px] h-full px-1 flex-1 text-sm sm:text-base" placeholder="メッセージを入力"></input>
                <div className="h-[30px] w-[30px] bg-white flex items-center justify-center rounded-full">
                  <PaperAirplaneIcon className="h-5 w-5 text-slate-200"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Chat.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}


export default Chat;