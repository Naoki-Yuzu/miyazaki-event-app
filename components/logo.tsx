import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" className="flex">
      <Image className="w-12 sm:w-16" src="/logo.svg" alt="logo" width={78} height={32}/>
      <div className="flex items-center">
        <p className="text-lg sm:text-2xl font-bold text-orange-500 tracking-wider">みや</p>
        <p className="text-lg sm:text-2xl font-bold text-green-600 tracking-wider">イベ</p>
      </div>
    </Link>
  );
};

export default Logo;