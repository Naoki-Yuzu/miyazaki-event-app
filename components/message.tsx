import React, { useEffect, useRef } from 'react';
import { ChatMessageInfo } from '../types/chat-message-info';

const Message = ({isOwnerMessage, messageInfo}: {isOwnerMessage: boolean, messageInfo: ChatMessageInfo}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messageInfo])
  
  return (
    <div>
      {isOwnerMessage ?
        <div className="flex justify-end">
          <div ref={scrollRef} className="w-[90%] sm:w-full flex justify-end ">
            <div className="bg-orange-50 rounded-[20px] rounded-tr-none p-3  max-w-[80%]">
              <p className="text-sm sm:text-base">
                {/* 初めまして、こんばんは。<br />
                10/○(土)に開催されるイベントの内容を拝見しました。<br />
                質問なのですが、〇〇はどういった〇〇で開催されるのでしょうか？<br />
                お忙しいかとは思いますが、お返事お待ちしています。<br /> */}
                {messageInfo.text}
              </p>
            </div>
          </div>
        </div>
      :
      <div ref={scrollRef} className="w-[90%] sm:w-full flex">
        <div className="bg-slate-100 rounded-[20px] rounded-tl-none p-3 max-w-[80%]">
          <p className="text-sm sm:text-base">
            {/* 〇〇様、こんにちは。<br />
            メッセージを下さりありがとうございます。<br />
            質問に関してですが、〇〇となります。<br />
            どうぞよろしくお願いします！<br /> */}
            {messageInfo.text}
          </p>
        </div>
      </div>
      }
    </div>
  );
};

export default Message;