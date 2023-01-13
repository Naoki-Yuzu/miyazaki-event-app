import Head from 'next/head';
import React, { ReactElement } from 'react';
import AuthForm from '../components/auth-form';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';

const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>みやイベ | ログイン</title>
      </Head>
      <div className="flex items-center justify-center h-full">
        <AuthForm isRegister={false}/>
      </div> 
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Login;