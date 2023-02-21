import { async } from '@firebase/util';
import { Dialog, Transition } from '@headlessui/react'
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { arrayUnion, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useChat } from '../context/chat-context';
import { useUser } from '../context/user-context';
import { db } from '../firebase/client-app';
import { ChatMessage } from '../types/chat-message';
import { User } from '../types/user';
import DmContainer from './dm-container';
import Message from './message';

const DmModal = ({isOpen, closeModal}: {isOpen: boolean, closeModal: VoidFunction}) => {
  const { register, handleSubmit, resetField } = useForm<ChatMessage>();
  const { state } = useChat();
  const { currentUser } = useUser();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserInfo = () => {
      const ref = doc(db, `users/${state?.user.partnerId}`);
      getDoc(ref).then((result) => {
        setUser( result.data() as User);
      }).catch((err) => {
        console.log("チャット詳細画面エラー :", err);
      })
    }

    state && getUserInfo();
  }, [state]);

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
  
      const chatOwnerRef = collection(db, "chatPartnerLists", currentUser.uid, "data")
      await setDoc(doc(chatOwnerRef, state?.chatId), {
        date: Date.now(),
        latestMessage: data.text,
      }, {merge: true});
  
      const chatPartnerRef = collection(db, "chatPartnerLists", state?.user.partnerId, "data")
      await setDoc(doc(chatPartnerRef, state?.chatId), {
        date: Date.now(),
        latestMessage: data.text,
      }, {merge: true});
      resetField("text");
    }
    catch (err) {
      alert("エラーが発生しました");
      console.log("チャットメッセージ送信エラー :", err);
    }
  }
 
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-0 fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="fixed inset-x-[5%] inset-y-[10%] bg-white flex items-center flex-col rounded-md">
                  <div className="w-full flex items-center py-2 px-3 border-b gap-2 sm:gap-[14px]">
                    {/* <Image src="/profile-image-takachiho-hasshinn-kouryukai.jpg" alt="プロフィール画像" className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-full" width={40} height={40}/> */}
                    <img src={user?.profileImage ? user.profileImage : "/profile-image.svg"} alt="プロフィール画像" className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-full" width={40} height={40}/>
                    <p className="text-sm sm:text-base font-semibold">{user?.name}</p>
                  </div>
                  <DmContainer />
                  <form onSubmit={handleSubmit(sendMessage)} className="rounded-b-md h-[60px] bg-slate-200 flex items-center p-3 gap-3 w-full">
                    <input {...register("text", {required: true, maxLength: 100})} className="outline-none rounded-[10px] h-full px-1 flex-1" placeholder="メッセージを入力" />
                    <button className="h-[30px] w-[30px] bg-white flex items-center justify-center rounded-full">
                      <PaperAirplaneIcon className="h-5 w-5 text-slate-200"/>
                    </button>
                  </form>

                  <button
                    type="button"
                    className="h-[30px] w-[30px] bg-white flex items-center justify-center rounded-full absolute top-[-40px] left-0"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-5 w-5 text-orange-300"/>
                  </button>
                </Dialog.Panel>
              </Transition.Child>

          {/* <div id="a" className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              
            </div>
          </div> */}
        </Dialog>
      </Transition>
    </>
  )
}

export default DmModal;