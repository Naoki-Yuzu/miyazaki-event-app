import React from 'react';

const Message = ({isOwnerMessage}: {isOwnerMessage: boolean}) => {
  
  return (
    <div>
      {isOwnerMessage ?
        <div className="flex justify-end">
          <div className="w-[90%] sm:w-full flex justify-end ">
            <div className="bg-orange-50 rounded-[20px] rounded-tr-none p-3">
              <p className="text-sm sm:text-base">
                初めまして、こんばんは。<br />
                10/○(土)に開催されるイベントの内容を拝見しました。<br />
                質問なのですが、〇〇はどういった〇〇で開催されるのでしょうか？<br />
                お忙しいかとは思いますが、お返事お待ちしています。<br />
              </p>
            </div>
          </div>
        </div>
      :
      <div className="w-[90%] sm:w-full flex">
      <div className="bg-slate-100 rounded-[20px] rounded-tl-none p-3">
        <p className="text-sm sm:text-base">
          〇〇様、こんにちは。<br />
          メッセージを下さりありがとうございます。<br />
          質問に関してですが、〇〇となります。<br />
          どうぞよろしくお願いします！<br />
        </p>
      </div>
    </div>
      }
    </div>
  );
};

export default Message;