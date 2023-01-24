import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import useWindowSize from '../utils/use-window-size';
import DmModal from './dm-modal';

const MessageListCard = () => {
  const [width, _] = useWindowSize();

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    console.log(isShowModal)
  };

  return (
    <>
      <button className="w-full max-h-[70px]" onClick={openModal}>
        <div className="flex gap-2 pl-1 py-1 h-full">
          <Image className="h-10 w-10 object-cover rounded-full" src="/profile-image.jpg" width={40} height={40} alt="プロフィール画像"/>
          <div className="flex flex-col">
            <p className="text-xs sm:text-sm text-left">串間 ミヤコ</p>
            <p className="text-xs sm:text-sm text-slate-500 flex-1 overflow-hidden text-left">
              〇〇様、こんにちは。メッセージを下さりありがとうございます。質問に関してですが、〇〇となります。
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