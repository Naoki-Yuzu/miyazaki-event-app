import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from './button';
import Logo from './logo';
import UserMenu from './user-menu';

const Header = () => {
  return (
    <header className="h-14 sm:h-16 border-b px-2 sm:px-36">
      <div className="flex items-center h-full gap-2">
        <Logo />
        <span className="flex-1"/>
        {/* <Link href="/login" className="text-xs sm:text-base rounded-xl font-semibold border-orange-300 border-2 py-1 px-3 hover:opacity-75 duration-200 tracking-widest text-orange-300 mr-1">ログイン</Link>
        <Link href="/sign-up" className="text-xs sm:text-base rounded-xl font-semibold border-orange-300 border-2 py-1 px-3 hover:opacity-75 duration-200 tracking-widest text-white bg-orange-300">会員登録</Link> */}
        {/* <Button className="text-orange-300 mr-1">ログイン</Button>
        <Button className="text-white bg-orange-300">会員登録</Button> */}
        <UserMenu />
        {/* <button className="mr-5">
          <img className=" rounded-full object-cover w-10 h-10 object-right-top" src="/profile-image.jpg" alt="profileImage"/>
        </button> */}
        <Button className="hidden text-white bg-orange-300">投稿</Button>
      </div>
    </header>
  );
};

export default Header;