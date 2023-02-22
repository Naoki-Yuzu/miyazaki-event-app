import { PaperClipIcon, PencilIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-10 border w-[90%] sm:max-w-[1000px] bg-white rounded-xl flex flex-col justify-center gap-6 sm:gap-10 py-7 sm:py-12 items-center">
        <div className="flex items-center gap-10">
          <span className="border-b-2 border-orange-300 w-12 sm:w-[100px]"/>
          <Image className="h-16 w-16 sm:h-[124px] sm:w-[124px] rounded-full object-cover" src="/profile-image.jpg" alt="プロフィール画像" height={500} width={500} />
          <span className="border-b-2 border-orange-300 w-12 sm:w-[100px]"/>
        </div>
        <div className="flex flex-col items-center gap-1 relative">
          <h3 className="text-lg sm:text-2xl font-semibold">串間 ミヤコ</h3>
          <Link href="/edit-profile" className="p-1 sm:p-0 absolute top-[1px] right-[-28px] sm:top-[6px]">
            <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-300 "/>
          </Link>
          <div className="flex items-center gap-1">
            <PaperClipIcon className="h-3 w-3 sm:h-[14px] sm:hw-[14px] text-slate-500"/>
            <p className="text-xs sm:text-sm text-slate-500">移住初心者</p>
          </div>
        </div>
        <div className="bg-orange-50 sm:px-[70px] sm:py-[30px] sm:min-h-[250px] flex items-center mx-4 p-5 rounded-xl">
          <p className="text-sm sm:text-base">
            半年前に北海道から宮崎県へ移住してきました。<br />
            橘通でテナントを借りてヨガのトレーナーをしています。<br />
            まだまだ宮崎は知らないことだらけなので、色々な方々と関わりを持っていき、宮崎のことをより多く知れたら良いなと思っています。<br />
            そして宮崎のことをもっと好きになっていきたいです。<br />
            皆さん、どうぞよろしくお願いします！<br />
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