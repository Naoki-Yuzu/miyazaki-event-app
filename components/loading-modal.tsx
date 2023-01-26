import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const LoadingModal = ({isOpen, closeModal}: {isOpen: boolean, closeModal: VoidFunction}) => {
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
              <Dialog.Panel className="z-20 bg-white flex items-center justify-center rounded-md p-4 gap-3">
                <ArrowPathIcon className="animate-spin h-[30px] w-[30px] text-orange-300"/>
                <p className="text-orange-300 font-semibold text-lg tracking-wider">Loading...</p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoadingModal;