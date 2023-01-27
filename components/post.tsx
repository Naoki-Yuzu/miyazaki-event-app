import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Post = ({thumbnail, title, userImage} : {thumbnail: string, title: string, userImage: string}) => {
  return (
    <div className="flex flex-col w-[300px] sm:w-[400px] items-center sm:min-h-[300px] bg-white rounded-xl overflow-hidden shadow-lg">
      <Link href="/post-detail">
        <Image src="/post-thumbnail.jpg" alt="thumbnail" height={180} width={400} className="h-[140px] sm:h-[180px] object-cover"/>
        <h1 className=" font-bold text-base sm:text-xl pt-1 px-1 tracking-wider">【暮らし】宮崎出身のカメラマンが自然豊かな西都原での生活を紹介</h1>
      </Link>
      <Link href="/" className="w-full">
        <div className="flex items-center gap-2 mx-1">
          <Image src="/user-image-miyazaki-hinata.jpg" alt="userImage"  className="w-[30px] h-[30px] object-cover rounded-full my-1"  height={30} width={30}/>
          <p className="text-zinc-700 text-sm sm:text-base tracking-wide">宮崎 ヒナタ</p>
        </div>
      </Link>
      <p className="text-left w-full text-xs sm:text-sm text-slate-400 px-3 my-1 tracking-wide">6日前</p>
    </div>
  );
};

export default Post;