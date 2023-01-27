import React from 'react'
import Button from './button'
import Logo from './logo'
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

const AuthForm = ({isRegister} : {isRegister: boolean}) => {
  return (
    <div className="bg-white flex flex-col items-center w-4/5 sm:max-w-[500px] rounded-[30px] border gap-8 sm:gap-12 py-9 px-12">
      <Logo />
      {isRegister && 
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="block tracking-wider text-sm sm:text-base">ユーザーネーム *</label>
          <input id="name" type="text" autoComplete="name" placeholder="みやざき ひなた" className="border-b border-black tracking-wider px-1 outline-none text-sm sm:text-base"></input>
        </div>
      }
      <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="block tracking-wider text-sm sm:text-base">メールアドレス *</label>
          <input id="email" type="email" autoComplete="email" placeholder="example@gmail.com" className="border-b border-black tracking-wider px-1 outline-none text-sm sm:text-base"></input>
      </div>
      <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="block tracking-wider text-sm sm:text-base">パスワード *</label>
          <input id="password" type="password" placeholder="・・・・・・・・・" className="border-b border-black tracking-wider px-1 outline-none text-sm sm:text-base"></input>
      </div>
      <div className="relative w-full">
        <Button className="bg-orange-300 text-white w-full rounded-full px-3 tracking-widest">{isRegister ? "登録" : "ログイン"}</Button>
        <LockClosedIcon className="w-5 h-5 absolute left-5 top-1/4 text-white"/>
      </div>
      <div className="flex border-2 rounded-xl items-center justify-center gap-2 px-5">
        <Image className="w-5 h-5 " src="/google-logo.svg" alt="google-logo" width={20} height={20}/>
        <Button className="bg-white tracking-wider">{isRegister ? "Googleで続ける" : "Googleでログイン"}</Button>
      </div>
      {isRegister ? 
      <Link href="/login" className="text-[10px] sm:text-xs tracking-wider text-right ml-auto">既にアカウントをお持ちの方はこちら</Link> :
      <Link href="/sign-up" className="text-[10px] sm:text-xs tracking-wider text-right ml-auto">まだアカウントをお持ちでない方はこちら</Link>
      }
    </div>
  )
}

export default AuthForm