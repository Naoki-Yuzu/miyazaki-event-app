import React, { useRef, useState } from 'react';
import Button from './button';
import GoogleMap from './google-map';

const participationNumber = [
  {value: 1, label: 1},
  {value: 2, label: 2},
  {value: 3, label: 3},
  {value: 4, label: 4},
  {value: 5, label: 5},
  {value: 6, label: 6},
  {value: 7, label: 7},
  {value: 8, label: 8},
  {value: 9, label: 9},
  {value: 10, label: 10},
];

const PostForm = ({isCreate, image} : {isCreate: boolean, image: string | undefined}) => {
  const [preview, setPreview] = useState<string>("/no-image.png");
  const inputRef = useRef<HTMLInputElement>(null!);

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
  };

  return (
    <div className="flex justify-center">
      <div className="my-12 bg-white w-[90%] sm:max-w-[1000px] flex flex-col rounded-xl border pb-7 items-center py-7 sm:py-12 gap-6 sm:gap-10">
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="email" className="block tracking-wider text-sm sm:text-base w-full">タイトル *</label>
            <input id="email" type="email" autoComplete="email" placeholder={isCreate ? "タイトルを入力してください" : undefined} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="file" className="block tracking-wider text-sm sm:text-base w-full">画像 *</label>
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
              <Button className="w-[160px] text-white bg-orange-300 px-7 rounded-xl" onClick={SelectImage}>{isCreate ? "画像を選択" : "画像を再選択"}</Button>
            </div>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="text" className="block tracking-wider text-sm sm:text-base w-full">本文 *</label>
            <textarea id="text" placeholder={isCreate ? "本文を入力してください" : undefined} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-52"></textarea>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">参加可能人数 *</label>
            <select className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9">
              {participationNumber.map(item => {
                return (
                  <option key={item.value} value={item.value}>{item.label}</option>
                );
              })}
            </select>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">開催日 *</label>
            <input  type="date" min={formattedDate} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">応募締め切り日 *</label>
            <input  type="date" min={formattedDate} className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="location" className="block tracking-wider text-sm sm:text-base w-full">開催場所 *</label>
            <div className="flex gap-3 flex-wrap">
              <GoogleMap className="w-full h-[200px] sm:w-[500px] sm:h-[300px]"/> 
              <p className="sm:flex-1 text-xs sm:text-sm pt-2 pr-3 ">
                クリックまたはタップをして、開催場所にピンを立ててください
              </p>
            </div>
        </div>
        <Button className="rounded-xl w-[80%] text-white bg-orange-300">{isCreate ? "投稿" : "更新"}</Button>
      </div>
    </div>
  );
};

export default PostForm;