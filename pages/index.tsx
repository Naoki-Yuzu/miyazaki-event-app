import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import EmailVerificationModal from '../components/email-verification-modal';
import { useUser } from '../context/user-context';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post } from '../types/post';
import  PostComp from '../components/post';
import { adminDB } from '../firebase/server-app';

export const getStaticProps: GetStaticProps<{posts: Post[] | undefined}> = async () => {
  let posts = undefined;

  try {
    const snap = await adminDB.collection("posts").orderBy("createdAt", "desc").get();
    posts = snap.docs.map(doc => doc.data() as Post);
  }
  catch (err) {
    console.log("記事群取得エラー :", err);
  }

  // console.log("投稿群", posts);

  return {
    props: {
      posts
    },
  };


}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({posts}) => {
  const { currentUser, isLoading } = useUser();

  // console.log("現在のユーザー from トップページ:", currentUser);


  return (
    <>
      <Head>
        <title>みやイベ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen items-center py-12 sm:py-0 px-4 sm:px-64 justify-center sm:justify-between flex-wrap gap-12 sm:gap-0">
        {/* {new Array(4).fill(null).map((_, index) => {
          return (
            <PostComp thumbnail="dummyString" title="dummyString" userImage="dummyString" key={index}/>
          );
        })} */}
        {posts?.map((post) => {
          return (
            <PostComp postId={post.id} thumbnail={post.thumbnailURL} title={post.title} authorId={post.authorId} key={post.id}/>
          );
        })}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Home;