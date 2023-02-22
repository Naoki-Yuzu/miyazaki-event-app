import { async } from '@firebase/util';
import { arrayUnion, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/user-context';
import { auth, db, storage } from '../firebase/client-app';
import { Location } from '../types/location';
import { Post } from '../types/post';
import Button from './button';
import GoogleMap from './google-map';
import LoadingModal from './loading-modal';

const PostForm = ({isCreate, image} : {isCreate: boolean, image: string | undefined}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Post>();
  const [fileError, setFileError ] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>("/no-image.png");
  const [location, setLocation] = useState<Location>();
  const inputRef = useRef<HTMLInputElement>(null!);
  const { currentUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [oldPost, setOldPost] = useState<Post>()

  useEffect(() => {
    if(router.query.id) {
      const ref = doc(db, `posts/${router.query.id}`);
      getDoc(ref).then((result) => {
        const oldPost = result.data() as Post;
        reset(oldPost);
        setPreview(oldPost.thumbnailURL as string)
        setOldPost(oldPost)
      }).catch((err) => {
        console.log("更新記事取得エラー :", err);
      })
    }
  }, []);

  if (image) {
    setPreview(image);
  }

  const formattedDate = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");

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
    setFileError(false);
  };

  const ValidateContainFile = () => {
    if(preview == "/no-image.png" || null) {
      setFileError(true);
    }
    if(location == undefined) {
      setLocationError(true);
    }
  }

  const createPost = async (data: Post) => {
    if(preview == "/no-image.png" && location == undefined) {
      setFileError(true);
      setLocationError(true);
      return;
    } if(preview == "/no-image.png") {
      setFileError(true);
      return;
    } if(location == undefined) {
      setLocationError(true)
      return;
    }

    setIsModalOpen(true);
    const dbRef = isCreate ? doc(collection(db, "posts")) : doc(db, `posts/${router.query.id}`);

    try {
      let thumbnailURL;
      if (isCreate) {
        if (file == undefined) {
          return;
        }
        const storageRef = ref(storage, `posts/${dbRef.id}/thumbnailURL`);
        await uploadBytes(storageRef, file)
        thumbnailURL = await getDownloadURL(storageRef);
      }

      const post: Post = {
        id: isCreate ? dbRef.id : router.query.id as string,
        authorId: currentUser.uid,
        title: data.title,
        thumbnailURL: isCreate ? thumbnailURL : oldPost?.thumbnailURL,
        text: data.text,
        maxParticipation: data.maxParticipation,
        participationNumber: isCreate ? 0 : oldPost?.participationNumber,
        eventDate: data.eventDate,
        deadlineDate: data.deadlineDate,
        location: arrayUnion({
          lat: location.lat,
          lng: location.lng,
        }),
        createdAt: isCreate ? Date.now() :  oldPost!.createdAt,
        updatedAt: isCreate ? null : Date.now(),
      };
      setDoc(dbRef, post).then(() => {
        // revalidateの挑戦記録として残す
        // const token = await auth.currentUser?.getIdToken(true);
        // fetch("/api/revalidate?path=/", {
        //   method: "POST",
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   }
        // })
        // .then((res) => res.json())
        // .then(() => {
        //   console.log(`記事を${isCreate ? "投稿" : "更新"}しました。`);
        //   setIsModalOpen(false);
        //   router.push("/");
        // }).catch((err) => {
        //   console.log("onDemand ISR エラー :", err);
        // })
        console.log(`記事を${isCreate ? "投稿" : "更新"}しました。`);
        setIsModalOpen(false);
        router.push("/");
      }).catch((err) => {
        setIsModalOpen(false);
        alert("エラーが発生しました");
        console.log("記事投稿エラー：", err);
      })

    }
    catch (err) {
      setIsModalOpen(false);
      alert("エラーが発生しました");
      console.log("画像アップロードエラー :", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(createPost)} className="my-12 bg-white w-[90%] sm:max-w-[1000px] flex flex-col rounded-xl border pb-7 items-center py-7 sm:py-12 gap-6 sm:gap-10">
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="title" className="block tracking-wider text-sm sm:text-base w-full">タイトル *</label>
            <input {...register("title", {
              required: "タイトルを入力してください",
              maxLength: { value: 50, message: "最大50文字です。" }
            })} id="title" type="text"  placeholder={isCreate ? "タイトルを入力してください" : undefined} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
            {errors.title && <p className="text-red-600 text-[10px] sm:text-xs">{errors.title.message}</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="file" className="block tracking-wider text-sm sm:text-base w-full">画像 *</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 flex-wrap">
              <img className="object-contain h-[100px] w-[100px] sm:h-[200px] sm:w-[200px] border-2 rounded p-2" src={preview} />
              <input
                hidden
                ref={inputRef}
                id="file" 
                type="file" 
                accept=".png, .jpg, .heic" 
                className="w-full rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9" 
                onChange={handleChangeFile}
              />
              {isCreate && 
                <Button type="button" className="w-[160px] text-white bg-orange-300 px-7 rounded-xl" onClick={SelectImage}>{isCreate ? "画像を選択" : "画像を再選択"}</Button>
              }
            </div>
            {fileError && <p className="text-red-600 text-[10px] sm:text-xs">画像を選択してください</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="text" className="block tracking-wider text-sm sm:text-base w-full">本文 *</label>
            <textarea {...register("text", {
              required: "本文を入力してください",
              maxLength: {value: 2000, message: "最大2000文字です。"}
            })} id="text" placeholder={isCreate ? "本文を入力してください" : undefined} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-52"></textarea>
            {errors.text && <p className="text-red-600 text-[10px] sm:text-xs">{errors.text.message}</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">参加可能人数 *</label>
            <select {...register("maxParticipation", {
              required: "参加可能人数を入力してください。"
            })} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9">
              {new Array(51).fill(null).map((_, index,) => {
                if(index == 0) {
                  return null;
                } else {
                  return (
                    <option key={index} value={index}>{index}</option>
                  );
                }
              })}
            </select>
            {errors.maxParticipation && <p className="text-red-600 text-[10px] sm:text-xs">{errors.maxParticipation.message}</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">開催日 *</label>
            <input {...register("eventDate", {
              required: "開催日を選択してください。"
            })} type="date" min={formattedDate} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
            {errors.eventDate && <p className="text-red-600 text-[10px] sm:text-xs">{errors.eventDate.message}</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">応募締め切り日 *</label>
            <input {...register("deadlineDate", {
              required: "応募締め切り日を選択してください。"
            })} type="date" min={formattedDate} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
            {errors.deadlineDate && <p className="text-red-600 text-[10px] sm:text-xs">{errors.deadlineDate.message}</p>}
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="location" className="block tracking-wider text-sm sm:text-base w-full">開催場所 *</label>
            <div className="flex gap-3 flex-wrap">
              <GoogleMap setLocation={setLocation} setLocationError={setLocationError} eventLocation={undefined} className="w-full h-[200px] sm:w-[500px] sm:h-[300px]"/> 
              <p className="sm:flex-1 text-xs sm:text-sm pt-2 pr-3 ">
                クリックまたはタップをして、開催場所にピンを立ててください
              </p>
            </div>
            {locationError && <p className="text-red-600 text-[10px] sm:text-xs">開催場所を選択してください</p>}
        </div>
        <Button className="rounded-xl w-[80%] text-white bg-orange-300" onClick={ValidateContainFile}>{isCreate ? "投稿" : "更新"}</Button>
        <LoadingModal isOpen={isModalOpen} closeModal={closeModal}/>
      </form>

    </div>
  );
};

export default PostForm;