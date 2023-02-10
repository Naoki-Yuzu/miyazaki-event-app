import { PaperClipIcon, PencilIcon } from '@heroicons/react/24/solid';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { useUser } from '../../../context/user-context';
import { db } from '../../../firebase/client-app';
import { User } from '../../../types/user';
import { NextPageWithLayout } from '../../_app';

const Profile: NextPageWithLayout = () => {
  const { currentUser } = useUser();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    const ref = doc(db, `users/${router.query.id}`);
    getDoc(ref).then((result) => {
      // console.log("リザルト プロフィールページ :", result.data() as User);
      setUserProfile(result.data() as User);
    }).catch((err) => {
      console.log("プロフィール閲覧ページエラー :", err);
    })
  }, [userProfile == undefined]);

  console.log("クエリーID :", router.query.id);

  return (
    <div className="flex justify-center">
      <div className="mt-10 border w-[90%] sm:max-w-[1000px] bg-white rounded-xl flex flex-col justify-center gap-6 sm:gap-10 py-7 sm:py-12 items-center">
        <div className="flex items-center gap-10">
          <span className="border-b-2 border-orange-300 w-12 sm:w-[100px]"/>
          {/* <Image className="h-16 w-16 sm:h-[124px] sm:w-[124px] rounded-full object-cover" src="/profile-image.jpg" alt="プロフィール画像" height={500} width={500} /> */}
          <img className="h-16 w-16 sm:h-[124px] sm:w-[124px] rounded-full object-cover" src={userProfile && userProfile.profileImage ? userProfile.profileImage : "/profile-image.svg"} alt="プロフィール画像" height={500} width={500} />
          <span className="border-b-2 border-orange-300 w-12 sm:w-[100px]"/>
        </div>
        <div className="flex flex-col items-center gap-1 relative">
          {/* <h3 className="text-lg sm:text-2xl font-semibold">串間 ミヤコ</h3> */}
          <h3 className="text-lg sm:text-2xl font-semibold">{userProfile ? userProfile.name: "名無しさん"}</h3>
          {currentUser && router.query.id == currentUser.uid && 
          <Link href={`/profiles/${router.query.id}/edit-profile`} className="p-1 sm:p-0 absolute top-[1px] right-[-28px] sm:top-[6px]">
            <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-300 "/>
          </Link>
          }
          <div className="flex items-center gap-1">
            <PaperClipIcon className="h-3 w-3 sm:h-[14px] sm:hw-[14px] text-slate-500"/>
            <p className="text-xs sm:text-sm text-slate-500">{userProfile && userProfile.livingStatusType ? userProfile.livingStatusType : "居住情報無し"}</p>
          </div>
        </div>
        <div className="bg-orange-50 sm:px-[70px] sm:py-[30px] sm:min-h-[250px] flex items-center mx-4 p-5 rounded-xl">
          <p className="text-sm sm:text-base">
            {userProfile && userProfile.profileText ? userProfile.profileText : "自己紹介はありません。"}
            {/* 半年前に北海道から宮崎県へ移住してきました。<br />
            橘通でテナントを借りてヨガのトレーナーをしています。<br />
            まだまだ宮崎は知らないことだらけなので、色々な方々と関わりを持っていき、宮崎のことをより多く知れたら良いなと思っています。<br />
            そして宮崎のことをもっと好きになっていきたいです。<br />
            皆さん、どうぞよろしくお願いします！<br /> */}
          </p>
        </div>
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Profile;