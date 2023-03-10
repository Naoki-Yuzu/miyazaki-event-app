import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './button';

const EmailVerificationModal = ({isOpen, closeModal}: {isOpen: boolean, closeModal: VoidFunction}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 flex " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-0 fixed inset-0 bg-black bg-opacity-20" />
          </Transition.Child>

          <div className="flex min-w-full min-h-full items-center justify-center">
            <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
              <Dialog.Panel className="z-20 bg-white flex flex-col rounded-xl p-5 gap-3 max-w-[85%]">
                <h3 className="text-lg font-semibold">メールアドレス認証のお願い</h3>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold">
                  登録されたアドレスに送信されたメールから、認証の操作をしてください。<br />
                  認証の操作が終了次第、画面が自動的に切り替わります。
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EmailVerificationModal;