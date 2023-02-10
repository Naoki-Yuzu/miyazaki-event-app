import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import Button from '../../../components/button';
import { ArrowPathIcon, ClockIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/client-app';
import { Post } from '../../../types/post';
import { User } from '../../../types/user';
import { format } from 'date-fns';
import { useUser } from '../../../context/user-context';
import GoogleMap from '../../../components/google-map';
import { Location } from '../../../types/location';

const PostDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<User>();
  const { currentUser } = useUser();
  // console.log(postId);
  // const [eventLocaion, setEventLocation] = useState<Location>()
  const [eventLocaion, setEventLocation] = useState<Location>()

  useEffect(() => {
    console.log(postId);
    const postRef = doc(db, `posts/${postId}`);
    console.log("DBリファレンス", postRef);
    getDoc(postRef).then((result) => {
      console.log("リザルト", result.data());
      const postData = result.data();
      setPost(postData as Post);
      console.log(`型確認記事詳細 : ${typeof(postData?.location)}`)
      setEventLocation(postData?.location[0] as Location)

      const userRef = doc(db, `users/${post?.authorId}`)
      getDoc(userRef).then((useResult) => {
        console.log("ユーザーリザルト", useResult.data());
        setAuthor(useResult.data() as User);
      }).catch((err) => {
        console.log("エラー :", err);
      })
    }).catch((err) => {
      alert("エラーが発生しました");
      console.log("エラー :", err);
    })

  }, [post != undefined])

  // if (post != undefined) {
  //   setEventLocation(post.location as Location);
  // }

  if(post?.thumbnailURL == null) {
    return null;
  }


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
            <img src={author?.profileImage} alt="userImage"  className="sm:w-[36px] sm:h-[36px] w-6 h-6 object-cover rounded-full"  height={36} width={36}/>
            {/* <p className="text-zinc-700 text-xs sm:text-sm tracking-wide ">タカチホハッシン交流会</p> */}
            <p className="text-zinc-700 text-xs sm:text-sm tracking-wide ">{author?.name}</p>
          </div>
        </Link>
        {/* <Image src="/mountain.jpg" alt="thumnail" height={430} width={1000} className="w-full h-[200px] sm:h-[430px]"/> */}
        <img src={post?.thumbnailURL} alt="thumnail" height={430} width={1000} className="w-full h-[200px] sm:h-[430px]"/>
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
            {/* <p className="leading-loose tracking-wide text-sm sm:text-base">
              生まれも育ちも高千穂の【タカタカ チホチホさんとミヤミヤ ザキザキさん】が、なんと今回、イベントを主催して下さることになりました！<br />
              <br />
              「宮崎県外から宮崎市内に移住してきたけど、実は高千穂にも興味がある...」<br />
              「今は都心に住んでいるけど、実は高千穂に移住しようか悩んでいる...」<br />
              <br />
              そんな方々の参考になったら良いなと思い、今回のイベントを企画しました。<br />
              <br />
              イベント内容は主に、仕事・居住環境・地域の人たちの繋がり・相談会の4つとなっています。<br />
              <br />
              仕事については、高千穂に移住した場合どういった仕事があるのか、今後どういった仕事が増えていきそうかといった、生活していくうえで重要となる「働き方」に関して、焦点を絞ったお話しをして頂こうと思っています。<br />
              <br />
              そして居住環境については、高千穂の人たちはどういった環境で生活しているのかに着目していきます。大自然と隣合わせの生活だからこそ不安になる、「土砂災害や洪水といった問題とどう向き合っているのか、またそもそも安全に生活できるのか」そういった純粋な疑問にもお答えできればと考えています。<br />
              <br />
              そして地域の人たちの繋がりについては、高千穂の人々はどのようなコミュニティで成り立っているのかといったお話しをして頂きます。<br />
              移住することにおいて、人との繋がりは重要な問題となってきます。困ったときに支え合える存在がいることは、その地で生活することの安心感にも繋がってくるでしょう。<br />
              そんな不安を払拭できるような時間にしたいと思っています。<br />
              <br />
              最後の相談会については、タカタカ チホチホさんとミヤミヤ ザキザキさんに、直接質問をしたり、悩みを相談することができます。<br />
              <br />
              質問に関しては、参加者が共有し合えるように全員で行い、相談に関しては、個別で行う予定です。<br />
              是非、この機会を活かしてみてください！<br />
              <br />
              場所は、宮崎駅より徒歩約10分、橘通りのATOMicaの会議室となります。<br />
              Google Meetでオンライン上から参加することもできるので、直接足を運ぶことができない方でも気軽に参加できます！<br />
              <br />
              お二人のSNSは以下となっていますので、気になる方は覗いてみてください。<br />
              <br />
              タカタカ チホチホさん：https://twitter.com/demo_taka_chiho_demo<br />
              ミヤミヤ ザキザキさん：https://twitter.com/demo_miya_zaki_demo<br />
              <br />
              何か気になることがありましたら、「メッセージを送る」よりいつでも相談ください。<br />
              それでは、皆様と会えることを楽しみにしています！ */}
            <p className="leading-loose tracking-wide text-sm sm:text-base">{post.text}
            </p>
            <hr className="border-slate-500 sm:hidden"/>
            <h3 className="sm:hidden text-base sm:text-lg font-bold mt-2">開催場所</h3>
            <GoogleMap className="w-[95%] bg-orange-300 h-[200px] shadow-md rounded-lg sm:hidden mx-auto mt-5" 
            setLocation={null} setLocationError={null} eventLocation={eventLocaion}/>
           
          </div>
          <div className="hidden flex-1 sm:flex flex-col gap-10 py-8 px-10">
            <Button className="rounded-full text-white bg-orange-300 h-12 shadow-md tracking-wide">メッセージを送る</Button>
            <p className="font-semibold pl-1 tracking-wide">{post.participationNumber}人が参加しています</p>
            <Button className="rounded-full text-gray-500 shadow-md border-slate-500 text-xs sm:text-sm">参加する</Button>
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
          <Button className="rounded-full text-gray-500 shadow-md border-slate-500 text-xs sm:text-sm w-full">参加する</Button>
          <Button className="rounded-full text-white bg-orange-300 h-11 text-sm shadow-md tracking-wide w-full">メッセージを送る</Button>
        </div>
      </div>
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