import React, { useRef, useState } from 'react';
import Button from './button';

const livingStatusType = [
  {value: 1, label: "移住初心者"},
  {value: 2, label: "ベテラン移住者"},
  {value: 3, label: "地元出身者"},
];

const ProfileForm = ({image}: {image: string | undefined}) => {
  const [preview, setPreview] = useState<string>("/no-image.png");
  const inputRef = useRef<HTMLInputElement>(null!);

  if (image) {
    setPreview(image);
  }

  const SelectImage = () => {
    inputRef.current.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const fileObject = e.target.files[0];
    setPreview(window.URL.createObjectURL(fileObject));
  }

  return (
    <div className="flex justify-center">
      <div className="my-12 bg-white w-[90%] sm:max-w-[1000px] flex flex-col rounded-xl border pb-7 items-center py-7 sm:py-12 gap-6 sm:gap-10">
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="email" className="block tracking-wider text-sm sm:text-base w-full">ユーザーネーム *</label>
            <input id="email" type="email" autoComplete="email" placeholder="串間 ミヤコ" className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9"></input>
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
              <Button className="w-[160px] text-white bg-orange-300 px-7 rounded-xl" onClick={SelectImage}>画像を選択</Button>
            </div>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label htmlFor="text" className="block tracking-wider text-sm sm:text-base w-full">自己紹介文 *</label>
            <textarea id="text" placeholder="自己紹介文を入力してください" className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base h-60"></textarea>
        </div>
        <div className="flex flex-col gap-4 w-[80%] ">
            <label className="block tracking-wider text-sm sm:text-base w-full">タイプ *</label>
            <select className="w-full border-2 rounded tracking-wider px-1 outline-none text-sm sm:text-base sm:h-9">
              {livingStatusType.map(item => {
                return (
                  <option key={item.value} value={item.value}>{item.label}</option>
                );
              })}
            </select>
        </div>
        
        <Button className="rounded-xl w-[80%] text-white bg-orange-300">更新</Button>
      </div>
    </div>
  );
};

export default ProfileForm;