import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/client-app';

const Post = ({postId, thumbnail, title, authorId} : {postId: string, thumbnail: string | null, title: string, authorId: string}) => {
  // console.log("著者ID :",authorId)
  const [name, setName] = useState();
  const [profileImageURL, setProfileImageURL] = useState();

  if (thumbnail == null) {
    thumbnail = "post-thumbnail.jpg"
  }

  useEffect(() => {
    const ref = doc(db, `users/${authorId}`);
    getDoc(ref).then((result) => {
      console.log(result.data());
      const authorInfo = result.data();
      setName(authorInfo?.name);
      setProfileImageURL(authorInfo?.profileImage);
    })
  })

  return (
    <div className="flex flex-col w-[300px] sm:w-[400px] items-center bg-white rounded-xl overflow-hidden shadow-lg">
      {/* <Link href="/post-detail"> */}
      <Link href={`/post-detail/${postId}`}>
        {/* <Image src="/post-thumbnail.jpg" alt="thumbnail" height={180} width={400} className="h-[140px] sm:h-[180px] object-cover"/> */}
        <img src={thumbnail} alt="thumbnail" height={180} width={400} className="h-[140px] sm:h-[180px] object-cover"/>
        {/* <h1 className=" font-bold text-base sm:text-xl pt-1 px-1 tracking-wider">【暮らし】宮崎出身のカメラマンが自然豊かな西都原での生活を紹介</h1> */}
        <h1 className=" font-bold text-base sm:text-xl pt-1 px-1 tracking-wider">{title}</h1>
      </Link>
      <Link href="/" className="w-full">
        <div className="flex items-center gap-2 mx-1">
          {/* <Image src="/user-image-miyazaki-hinata.jpg" alt="userImage"  className="w-[30px] h-[30px] object-cover rounded-full my-1"  height={30} width={30}/> */}
          <img src={profileImageURL} alt="userImage"  className="w-[30px] h-[30px] object-cover rounded-full my-1"  height={30} width={30}/>
          {/* <p className="text-zinc-700 text-sm sm:text-base tracking-wide">宮崎 ヒナタ</p> */}
          <p className="text-zinc-700 text-sm sm:text-base tracking-wide">{name}</p>
        </div>
      </Link>
      <p className="text-left w-full text-xs sm:text-sm text-slate-400 px-3 my-1 tracking-wide">6日前</p>
    </div>
  );
};

export default Post;