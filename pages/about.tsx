import { ChatBubbleBottomCenterIcon, ChatBubbleOvalLeftEllipsisIcon, NewspaperIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { ReactElement } from 'react'
import Layout from '../components/layout';
import useWindowSize from '../utils/use-window-size';
import { NextPageWithLayout } from './_app';

const About: NextPageWithLayout = () => {
  const [ width ] = useWindowSize();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center px-5 py-10 sm:py-16 bg-white gap-6 sm:gap-10">
        <h1 className="text-lg sm:text-2xl font-semibold">
          <span className="text-orange-500 text-xl sm:text-3xl">みや</span><span className="text-green-600 text-xl sm:text-3xl">イベ</span>とは？
        </h1>
        <p className="text-sm leading-[2.2] sm:text-base  sm:leading-loose text-center	tracking-wider">
          <span className="font-semibold">宮崎県を盛り上げたい人</span>、<span className="font-semibold">移住者を増やしたい人</span>と<br/>
          <span className="font-semibold">県外から県内に</span>、<span className="font-semibold">県内から県内に移住したい人</span>を繋ぐ{width >= 639 && <br />}
          <span className="font-semibold">宮崎県に特化した{width <= 639 && <br />}</span><span className="font-bold text-lg  sm:text-xl text-orange-500"> 移住支援プラットフォーム </span>です！
        </p>
        <div className="flex gap-10 sm:gap-52">
          <Image className="border-b border-orange-300 object-cover h-[125px] w-[125px] sm:h-[250px] sm:w-[250px] object-top" src="/character-kiritan.png" alt="キャラクター画像" height={300} width={300}/>
          <Image className="border-b border-orange-300 object-cover h-[125px] w-[125px] sm:h-[250px] sm:w-[250px] object-top" src="/character-zundamon.png" alt="キャラクター画像" height={300} width={300}/>
        </div>
      </div>
      <div className="bg-orange-50 w-full py-10 sm:py-16 flex flex-col items-center gap-10">
        <h1 className="text-lg sm:text-2xl font-semibold ">
          どんな機能があるの？
        </h1>
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-40 items-center ">
          <div className="min-h-[310px] sm:min-h-[390px] w-4/5 sm:w-[400px] py-6 px-10 flex flex-col items-center bg-white rounded-3xl gap-5">
            <h2 className="text-base sm:text-lg font-semibold">記事投稿</h2>
            <NewspaperIcon className="h-28 w-28 sm:h-40 sm:w-40"/>
            <p className="text-left sm:leading-relaxed sm:text-sm text-xs">
              開催したいイベントの記事を掲載することができます。<br />
              日程・開催場所・参加可能人数まで詳しく記載できるため、主催者も参加者も安心してイベントに出向くことが可能です。
            </p>
          </div>
          <div className="min-h-[310px] sm:min-h-[390px] w-4/5 sm:w-[400px] py-6 px-10 bg-white rounded-3xl flex flex-col items-center gap-5">
            <h2 className="text-base sm:text-lg font-semibold">チャット</h2>
            <ChatBubbleOvalLeftEllipsisIcon className="h-28 w-28 sm:h-40 sm:w-40"/>
            <p className="text-xs text-left sm:leading-relaxed sm:text-sm">
              参加者は質問や疑問などがあれば、主催者に直接メッセージを送ることができます。<br />
              また公に公開したくないURLなどを、伝えたいときなどにも活用可能です。
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white w-full py-10 sm:py-16 flex flex-col items-center gap-10">
        <h1 className="text-lg sm:text-2xl font-semibold ">
          誰が運営しているの？
        </h1>
        <div>
          <Image className=" h-[150px] w-[150px] sm:h-[200px] sm:w-[200px]" src="/app-owner-image.png" alt="運営者画像" height={300} width={300}/>
          <p className="text-center text-gray-600 text-xs sm:text-sm">Nさん</p>
        </div>
        <p className="text-center text-xs sm:text-sm leading-relaxed sm:leading-relaxed">
          22歳のときに、関東から宮崎県へ移住しました。<br />
          【その人が生きたい場所で、その人らしく暮らして欲しい】<br />
          【移住する人も地元の人も、ハッピーな関係を構築して欲しい】<br />
          そんな想いを手助けできるサービスを作りたいと考え、<br />
          みやイベを開発しました。
        </p>
      </div>
    </div>
  )
};

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default About;