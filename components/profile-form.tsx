import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/user-context';
import { db, storage } from '../firebase/client-app';
import { User } from '../types/user';
import Button from './button';
import LoadingModal from './loading-modal';

const livingStatusType = [
  {value: "移住初心者", label: "移住初心者"},
  {value: "ベテラン移住者", label: "ベテラン移住者"},
  {value: "地元出身者", label: "地元出身者"},
];

const ProfileForm = ({image}: {image: string | undefined}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
  const [preview, setPreview] = useState<string>("/no-image.png");
  const [userProfile, setUserProfile] = useState<User>();
  const [file, setFile] = useState<File>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);
  const router = useRouter();
  const { currentUser } = useUser()
  
  useEffect(() => {
    const ref = doc(db, `users/${router.query.id}`)
    getDoc(ref).then((result) => {
      setUserProfile(result.data() as User);
      const oldProfile = result.data() as User;
      if (oldProfile.profileImage) {
        setPreview(oldProfile.profileImage);
      }
      reset(oldProfile)
    }).catch((err) => {
      console.log("プロフィール編集ページエラー :", err);
    })
  }, [userProfile == undefined])
  
  if (image) {
    setPreview(image);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const SelectImage = () => {
    inputRef.current.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const fileObject = e.target.files[0];
    setPreview(window.URL.createObjectURL(fileObject));
    setFile(fileObject);
  }

  const editProfile = async (data: User) => {
    setIsModalOpen(true);
    let profileURL;
    try {
      if (file != undefined) {
        const storageRef = ref(storage, `users/${currentUser.uid}/profileURL`);
        await uploadBytes(storageRef, file);
        profileURL = await getDownloadURL(storageRef);
      }

      const userProfile: User = {
        uid: data.uid,
        name: data.name,
        profileText: data.profileText,
        profileImage: file ? profileURL : data.profileImage ? data.profileImage : null,
        livingStatusType: data.livingStatusType,
      }

      const dbRef = doc(db, `users/${currentUser.uid}`);
      setDoc(dbRef, userProfile).then(() => {
        setIsModalOpen(false);
        console.log("プロフィールの更新が完了しました");
        router.push(`/profiles/${currentUser.uid}`)
      }).catch((err) => {
        setIsModalOpen(false);
        alert("エラーが発生しました");
        console.log("プロフィールアップロードエラー :", err);
      });
    }
    catch(err) {
      setIsModalOpen(false);
      alert("エラーが発生しました");
      console.log("画像アップロードエラー :", err);
    }
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(editProfile)} className="my-12 bg-white w-[90%] sm:max-w-[1000px] flex flex-col rounded-xl border pb-7 items-center py-7 sm:py-12 gap-6 sm:gap-10">
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="name" className="block tracking-wider text-sm sm:text-base w-full">ユーザーネーム *</label>
            <input {...register("name", {
              required: "ユーザーネームを入力してください",
              maxLength: { value: 50, message: "最大50文字です。" }
            })} id="name" type="text" placeholder="みやざきひなた" className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="file" className="block tracking-wider text-sm sm:text-base w-full">プロフィール画像 *</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 flex-wrap">
              <img className="h-[100px] w-[100px] sm:h-[200px] sm:w-[200px] border-2 rounded p-2" src={preview} />
              <input
                hidden 
                ref={inputRef}
                id="file" 
                type="file" 
                accept=".png, .jpg, .heic" 
                className="w-full rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9" 
                onChange={handleChangeFile}
              />
              <Button type="button" className="w-[160px] text-white bg-orange-300 px-7 rounded-xl" onClick={SelectImage}>画像を選択</Button>
            </div>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="text" className="block tracking-wider text-sm sm:text-base w-full">自己紹介文 *</label>
            <textarea {...register("profileText", {
              required: "自己紹介文を入力してください",
              maxLength: { value: 2000, message: "最大2000文字です。" }
            })} id="text" placeholder="自己紹介文を入力してください" className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base h-60"></textarea>
            {errors.profileText && <p className="text-red-600 text-[10px] sm:text-xs">{errors.profileText.message}</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">タイプ *</label>
            <select {...register("livingStatusType", {
              required: "居住状況を入力してください",
            })}  className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9">
              {livingStatusType.map(item => {
                return (
                  <option key={item.value} value={item.value}>{item.label}</option>
                );
              })}
            </select>
            {errors.livingStatusType && <p className="text-red-600 text-[10px] sm:text-xs">{errors.livingStatusType.message}</p>}
        </div>
        
        <Button className="rounded-xl w-[80%] text-white bg-orange-300">更新</Button>
        <LoadingModal isOpen={isModalOpen} closeModal={closeModal}/>
      </form>
    </div>
  );
};

export default ProfileForm;