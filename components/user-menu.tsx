import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState, forwardRef, ReactNode } from 'react'
import { UserIcon, ArrowLeftOnRectangleIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { logout } from '../utils/google-auth'
import { useRouter } from 'next/router';
import { useUser } from '../context/user-context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/client-app';

const LinkForHeadlessUi = forwardRef<HTMLAnchorElement, {
  href: string;
  children: ReactNode;
  className: string | undefined;
}>((props) => {
  let { href, children, className, ...rest } = props
  return (
    <Link className={className} href={href} {...rest}>
      {children}
    </Link>
  )
})

LinkForHeadlessUi.displayName = "toProfileLink";

const UserMenu = () => {
  const { currentUser } = useUser()
  const [profileURL, setProfileURL] = useState();
  const router = useRouter();

  useEffect(() => {
    const ref = doc(db, `users/${currentUser.uid}`)
    getDoc(ref).then((result) => {
      setProfileURL(result.data()?.profileImage)
    });
  })

  const logoutWithFirebase = () => [
    logout().then(() =>{
      router.push("/")
    }).catch((err) => {
      alert("ログアウトエラーです")
    })
  ]

  return (
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="block">
            <img className=" rounded-full object-cover w-10 h-10 object-right-top" src={profileURL ? profileURL : "profile-image.svg"} alt="profileImage"/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
          <Menu.Items className="shadow-md absolute right-0 mt-1 sm:mt-2 w-56 origin-top-right bg-white border rounded-md flex flex-col z-30">
            <div className="px-2 py-1 sm:px-3 sm:py-2 border-b h-10 flex items-center gap-1 sm:gap-3">
              <Menu.Item >
                {({ active }) => (
                  <>
                    <UserIcon className="h-5 w-5"/>
                    <LinkForHeadlessUi href={`/profiles/${currentUser.uid}`} className="block text-xs sm:text-sm w-full font-semibold">
                      プロフィール
                    </LinkForHeadlessUi>
                  </>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-2 border-b h-10 flex items-center gap-1 sm:gap-3">
              <Menu.Item>
                {({ active }) => (
                  <>
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5"/>
                    <LinkForHeadlessUi href="/chats" className="block text-xs sm:text-sm w-full font-semibold">
                      メッセージ管理
                    </LinkForHeadlessUi>
                  </>
                )}
              </Menu.Item>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-2 flex items-center h-10 gap-1 sm:gap-3">
              <Menu.Item>
                {({ active }) => (
                  <>
                    <ArrowLeftOnRectangleIcon className="h-5 w-5"/>
                    <button className="text-xs sm:text-sm w-full font-semibold text-left" onClick={logoutWithFirebase}>
                      ログアウト
                    </button>
                  </>
                )}
              </Menu.Item>
            </div>
            
          </Menu.Items>
        </Transition>
      </Menu>
  )
}

export default UserMenu;

{/* <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                  </button> */}