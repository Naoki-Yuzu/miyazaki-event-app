import React, { useState } from 'react'
import Button from './button'
import Logo from './logo'
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { loginWithGoogle, signUpWithGoogle } from '../utils/google-auth';
import { useForm } from 'react-hook-form';
import { User } from '../types/user';
import { useUser } from '../context/user-context';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/client-app';
import { doc, setDoc } from 'firebase/firestore';
import LoadingModal from './loading-modal';
import { Auth } from '../types/auth';

const AuthForm = ({isRegister} : {isRegister: boolean}) => {
  const {register, handleSubmit, formState: { errors }} = useForm<Auth>();
  const { currentUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  console.log("現在のユーザー from 認証ページ:", currentUser);

  const createUserWithEAndP = (data: Auth) => {
    console.log("フォームデータ :", data);
    setIsOpen(true);
    createUserWithEmailAndPassword(auth, data.email, data.password).then((result) => {
      if (result.user) {
        const ref = doc(db, `users/${result.user.uid}`)
        setDoc(ref, {
          uid: result.user.uid,
          name: data.name,
        }).then(() => {
          router.push("/");
          setIsOpen(false);
        }).catch((err) => {
          alert("エラーが発生しました");
          console.log("エラー", err);
          setIsOpen(false);
        })
      }
    }).catch ((err) => {
      alert("エラーが発生しました");
      console.log("エラー", err);
      setIsOpen(false);
    });
  };

  const loginUserWithEAndP = (data: Auth) => {
    setIsOpen(true);
    signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
      router.push("/");
      setIsOpen(false);
    }).catch((err) => {
      alert("エラーが発生しました");
      console.log("エラー", err);
      setIsOpen(false);
    });
  }

  const signUpWithG = () => {
    setIsOpen(true);
    signUpWithGoogle().then(() => {
      console.log("アカウント登録が完了しました");
      router.push("/");
      setIsOpen(false);
    }).catch((err) => {
      alert("エラーが発生しました");
      console.log("エラー", err);
      setIsOpen(false);
    })
  }
  
  const loginWithG = () => {
    setIsOpen(true);
    loginWithGoogle().then(() => {
      console.log("ログインが完了しました");
      router.push("/");
      setIsOpen(false);
    }).catch((err) => {
      alert("エラーが発生しました");
      console.log("エラー", err);
      setIsOpen(false);
    })
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <form onSubmit={isRegister ? handleSubmit(createUserWithEAndP) : handleSubmit(loginUserWithEAndP)} className="bg-white flex flex-col items-center w-4/5 sm:max-w-[500px] rounded-[30px] border gap-8 sm:gap-12 py-9 px-12">
      <Logo />
      {/* <form onSubmit={handleSubmit(submit)} > */}
        {isRegister && 
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="block tracking-wider text-sm sm:text-base">ユーザーネーム *</label>
            <input {...register("name", {
              required: "ユーザーネームを入力してください", maxLength: { value: 50, message: "最大50文字です。"},
            })} id="name" type="text" autoComplete="name" placeholder="みやざき ひなた" className="border-b border-black tracking-wider px-1 outline-none text-sm sm:text-base"></input>
            {errors.name && <p className="text-red-600 text-[10px] sm:text-xs">{errors.name.message}</p>}
          </div>
        }
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="block tracking-wider text-sm sm:text-base">メールアドレス * </label>
            <input {...register("email", {
              required: "メールアドレスを入力してください"
            })} id="email" type="email" autoComplete="email" placeholder="example@gmail.com" className="border-b border-black tracking-wider px-1 outline-none text-sm sm:text-base"></input>
            {errors.email && <p className="text-red-600 text-[10px] sm:text-xs">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="block tracking-wider text-sm sm:text-base">パスワード *</label>
            <input {...register("password", {
              required: "パスワードを入力してください", minLength: { value: 10, message: "最低10文字です。" }
            })} id="password" type="password" placeholder="・・・・・・・・・" className="border-b border-black tracking-wider px-1 outline-none text-sm sm:text-base"></input>
            {errors.password && <p className="text-red-600 text-[10px] sm:text-xs">{errors.password.message}</p>}
        </div>
        <div className="relative w-full">
          <Button className="bg-orange-300 text-white w-full rounded-full px-3 tracking-widest">{isRegister ? "登録" : "ログイン"}</Button>
          <LockClosedIcon className="w-5 h-5 absolute left-5 top-1/4 text-white"/>
        </div>
      {/* </form> */}
      <div className="flex border-2 rounded-xl items-center justify-center gap-2 px-5">
        <Image className="w-5 h-5 " src="/google-logo.svg" alt="google-logo" width={20} height={20}/>
        <Button type="button" className="bg-white tracking-wider" onClick={isRegister ? signUpWithG : loginWithG}>{isRegister ? "Googleで続ける" : "Googleでログイン"}</Button>
      </div>
      {isRegister ? 
      <p className="text-[10px] sm:text-xs tracking-wider text-right ml-auto">既にアカウントをお持ちの方は{<Link href="/login" className="text-[10px] sm:text-xs text-orange-400 tracking-wider">こちら</Link>}</p> :
      <p className="text-[10px] sm:text-xs tracking-wider text-right ml-auto">まだアカウントをお持ちでない方は{<Link href="/sign-up" className="text-[10px] sm:text-xs text-orange-400 tracking-wider">こちら</Link>}</p> 
      }
      <LoadingModal isOpen={isOpen} closeModal={closeModal}/>
    </form>
  )
};

export default AuthForm;