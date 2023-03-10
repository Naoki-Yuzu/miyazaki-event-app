import Head from 'next/head';
import React, { ReactElement } from 'react'
import AuthForm from '../components/auth-form';
import Layout from '../components/layout';
import { useUser } from '../context/user-context';
import { NextPageWithLayout } from './_app';

const SignUp: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>みやイベ | 会員登録</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <AuthForm isRegister/>
      </div> 
    </>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default SignUp;