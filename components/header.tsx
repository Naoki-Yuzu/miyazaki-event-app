import Image from 'next/image';
import React from 'react';
import Button from './button';
import Logo from './logo';

const Header = () => {
  return (
    <div className="h-14 sm:h-16 border-b px-2 sm:px-36">
      <div className="flex items-center h-full gap-2">
        <Logo />
        <span className="flex-1"/>
        <Button className="text-orange-300 mr-1">ログイン</Button>
        <Button className="text-white bg-orange-300">会員登録</Button>
        <button className="mr-5 hidden">
          <img className=" rounded-full object-cover w-10 h-10 object-right-top" src="/profile-image.jpg" alt="profileImage"/>
        </button>
        <Button className="hidden text-white bg-orange-300">投稿</Button>
      </div>
    </div>
  );
};

export default Header;