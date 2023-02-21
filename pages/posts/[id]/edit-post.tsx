import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
import PostForm from '../../../components/post-form';
import { useUser } from '../../../context/user-context';
import { NextPageWithLayout } from '../../_app';

const EditPost: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useUser();

  return (
    <PostForm isCreate={false} image={undefined}/>
  );
};

EditPost.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}


export default EditPost;