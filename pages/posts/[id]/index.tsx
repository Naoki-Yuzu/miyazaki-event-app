import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import Button from '../../../components/button';
import { ArrowPathIcon, ClockIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/client-app';
import { Post } from '../../../types/post';
import { User } from '../../../types/user';
import { format } from 'date-fns';
import { useUser } from '../../../context/user-context';
import GoogleMap from '../../../components/google-map';
import { Location } from '../../../types/location';
import ErrorModal from '../../../components/error-modal';

const PostDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<User>();
  const [didParticipate, setDidParticipate] = useState<boolean>(false);
  const [isMaxParticipants, setIsMaxParticipants] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { currentUser } = useUser();
  const [eventLocaion, setEventLocation] = useState<Location>()

  useEffect(() => {
    const postRef = doc(db, `posts/${postId}`);
    getDoc(postRef).then((result) => {
      const postData = result.data();
      setPost(postData as Post);
      setEventLocation(postData?.location[0] as Location)

      const userRef = doc(db, `users/${post?.authorId}`)
      getDoc(userRef).then((useResult) => {
        setAuthor(useResult.data() as User);
      }).catch((err) => {
        console.log("エラー :", err);
      })
    }).catch((err) => {
      alert("エラーが発生しました");
      console.log("エラー :", err);
    })

    if(currentUser) {
      const participantRef = collection(db, "participants", currentUser?.uid, `${postId}`);
      getDocs(participantRef).then((result) => {
        result.docs.map((doc) => {
          doc.exists() && setDidParticipate(true);
        })
      }).catch((err) => {
        console.log("イベント参加所得状況エラー :", err)
      })
    }

  }, [post!=undefined])

  if(post == null) {
    return null;
  }
 

  const sendMessage = async () => {
    if(!currentUser) {
      setIsModalOpen(true);
      return null;
    }
    const combinedId = currentUser.uid > post.authorId ? currentUser.uid + post.authorId : post.authorId + currentUser.uid
    
    try {
      const ref = await getDoc(doc(db, "chats", combinedId));

      if(!ref.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] }, {merge: true});

        const ownerRef = collection(db, "chatPartnerLists", currentUser.uid, "data");

        await setDoc(doc(ownerRef, combinedId), ({
            combinedId: combinedId,
            partnerId: post.authorId,
            date: Date.now(),
        }), {merge: true});

        const partnerRef = collection(db, "chatPartnerLists", post.authorId, "data");

        await setDoc(doc(partnerRef, combinedId), ({
          combinedId: combinedId,
          partnerId: currentUser.uid,
          date: Date.now(),
        }), {merge: true});

      }
      console.log("完了しました");
    } 
    catch (err) {
      console.log("メッセージ送信準備エラー :", err);
    }
    finally {
      router.push("/chats");
    }
  }

  const participateEvent = async () => {
    if(!currentUser) {
      setIsModalOpen(true);
      return null;
    }
    if(currentUser) {
      try {
        const participantRef = collection(db, "participants", currentUser.uid, `${postId}`)
        await setDoc(doc(participantRef), {
          participation: true,
        }, {merge: true});
        const postRef = doc(db, `posts/${postId}`);
        await setDoc(postRef, {
          participationNumber: post.participationNumber ? post.participationNumber + 1 : 1,
        }, {merge: true});
      }
      catch (err) {
        console.log("イベント参加処理エラー :", err);
      }
      finally {
        router.push("/");
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
 
  const isParticipate = () => {
    return Date.parse(new Date(post.deadlineDate).toUTCString()) <= Date.now() ? true : false ;
  };

  return (
    <div className="flex justify-center relative">
      <div className="my-12 bg-white w-[90%] sm:max-w-[1000px] flex flex-col rounded-xl border pb-7 sm:pb-0">
        <div className="flex justify-end mt-5 gap-2 mr-3 mb-3">
          {post.updatedAt && 
          <div className="flex items-center gap-1">
            <ArrowPathIcon className="h-4 w-4 text-slate-300"/>
            <p className="text-slate-300 text-xs sm:text-sm">{format(post.updatedAt, "yyyy/MM/dd")}</p> 
          </div>
          }
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4 text-slate-300"/>
            <p className="text-slate-300 text-xs sm:text-sm">{format(post.createdAt, "yyyy/MM/dd")}</p>
          </div>
        </div>
        {/* <h1 className="mx-2 text-xl sm:text-3xl font-semibold">【イベント】高千穂に移住したい人たち集まれ！地元民による交流会を開催</h1> */}
        <h1 className="mx-2 text-xl sm:text-3xl font-semibold">{post?.title}</h1>
        <Link href={`/profiles/${post.authorId}`} className="w-full">
          <div className="flex items-center gap-2 m-3">
            {/* <Image src="/user-image-miyazaki-hinata.jpg" alt="userImage"  className="sm:w-[36px] sm:h-[36px] w-6 h-6 object-cover rounded-full"  height={36} width={36}/> */}
            <img src={author?.profileImage ? author?.profileImage : "/profile-image.svg"} alt="userImage"  className="sm:w-[36px] sm:h-[36px] w-6 h-6 object-cover rounded-full"  height={36} width={36}/>
            {/* <p className="text-zinc-700 text-xs sm:text-sm tracking-wide ">タカチホハッシン交流会</p> */}
            <p className="text-zinc-700 text-xs sm:text-sm tracking-wide ">{author?.name}</p>
          </div>
        </Link>
        {/* <Image src="/mountain.jpg" alt="thumnail" height={430} width={1000} className="w-full h-[200px] sm:h-[430px]"/> */}
        <img src={post?.thumbnailURL!} alt="thumnail" height={430} width={1000} className="w-full h-[200px] sm:h-[430px]"/>
        <div className="flex">
          <div className="w-full sm:w-[65%] my-5 mx-2 sm:mx-3 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
              <p className="text-base sm:text-lg font-bold  sm:mr-14">応募締め切り日：{post.deadlineDate}</p>
              <p className="text-xs sm:text-sm ml-1 sm:ml-0 sm:mr-14">参加可能人数：{post.maxParticipation}人</p>
              {currentUser && post.authorId == currentUser.uid &&
              <Link href={`/posts/${post.id}/edit-post`}>
                <PencilSquareIcon className="h-5 w-5 text-orange-300"/> 
              </Link>}
            </div>
            <hr className="border-slate-500"/>
            <p className="leading-loose tracking-wide text-sm sm:text-base whitespace-pre-wrap">{post.text}
            </p>
            <hr className="border-slate-500 sm:hidden"/>
            <h3 className="sm:hidden text-base sm:text-lg font-bold mt-2">開催場所</h3>
            <GoogleMap className="w-[95%] bg-orange-300 h-[200px] shadow-md rounded-lg sm:hidden mx-auto mt-5" 
            setLocation={null} setLocationError={null} eventLocation={eventLocaion}/>
           
          </div>
          <div className="hidden flex-1 sm:flex flex-col gap-10 py-8 px-10">
            {currentUser?.uid != post.authorId &&
            <Button className="rounded-full text-white bg-orange-300 h-12 shadow-md tracking-wide" onClick={sendMessage}>メッセージを送る</Button>
             }
            <p className="font-semibold pl-1 tracking-wide">{post.participationNumber}人が参加しています</p>
            {currentUser?.uid != post.authorId &&
            // <Button onClick={participateEvent} disabled={isMaxParticipants ? true : didParticipate ? true : isParticipate()} className="rounded-full text-gray-500 shadow-md border-slate-500 text-xs sm:text-sm">{isMaxParticipants ? "人数上限到達" : didParticipate ? "応募済み" : isParticipate() ? "応募終了" : "参加する"}</Button>
            <Button onClick={participateEvent} disabled={Number(post.maxParticipation) <= post.participationNumber! ? true : didParticipate ? true : isParticipate()} className="rounded-full text-gray-500 shadow-md border-slate-500 text-xs sm:text-sm">{didParticipate ? "応募済み" : Number(post.maxParticipation) <= post.participationNumber! ? "参加人数上限です" : isParticipate() ? "応募終了" : "参加する"}</Button>
            }
            <hr className="border-slate-500"/>
            <h3 className="font-semibold tracking-wide pl-1">開催場所</h3>
            <GoogleMap className="bg-orange-300 h-[200px] shadow-md rounded-lg" 
            setLocation={null} setLocationError={null} eventLocation={eventLocaion}/>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex-1 flex flex-col fixed bottom-5 w-[95%] bg-white border py-4 rounded-xl shadow-md">
        <div className="w-[90%] flex flex-col mx-auto gap-4">
          <p className="text-sm font-semibold pl-1 tracking-wide w-full">{post.participationNumber}人が参加しています</p>
          {currentUser?.uid != post.authorId &&
          <>
            <Button onClick={participateEvent} disabled={Number(post.maxParticipation) <= post.participationNumber! ? true : didParticipate ? true : isParticipate()} className="rounded-full text-gray-500 shadow-md border-slate-500 text-xs sm:text-sm w-full">{didParticipate ? "応募済み" : Number(post.maxParticipation) <= post.participationNumber! ? "参加人数上限です" : isParticipate() ? "応募終了" : "参加する"}</Button>
            <Button className="rounded-full text-white bg-orange-300 h-11 text-sm shadow-md tracking-wide w-full" onClick={sendMessage}>メッセージを送る</Button>
          </>
          }
        </div>
      </div>
      <ErrorModal isOpen={isModalOpen} closeModal={closeModal} errorMessage="この操作を行うには、アカウントの登録が必要です。" />
    </div>
  );
};

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default PostDetail;