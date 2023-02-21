import Link from 'next/link';
import React from 'react';
import Logo from './logo';

const Footer = () => {
  return (
    <footer className="min-h-[200px] border-t flex flex-col items-center py-6 justify-between">
      <div className="flex gap-2">
        <Logo />
      </div>
      <div className="flex flex-wrap gap-6 sm:gap-12 px-2 justify-center">
        <Link href="/" className="tracking-wider text-sm sm:text-base">みやイベについて</Link>
        <Link href="https://twitter.com/N_Web_E" target="_blank" className="tracking-wider text-sm sm:text-base">運営者情報</Link>
        <Link href="/" className="tracking-wider text-sm sm:text-base">プライバシーポリシー</Link>
      </div>
      <p className="tracking-wider text-slate-400 text-xs sm:text-sm">© 2023 みやイベ</p>
    </footer>
  );
};

export default Footer;