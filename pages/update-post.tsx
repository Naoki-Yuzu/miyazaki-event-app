import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import PostForm from '../components/post-form';
import { NextPageWithLayout } from './_app';

const UpdatePost: NextPageWithLayout = () => {
  return (
    <PostForm isCreate={false} image={undefined}/>
  );
};

UpdatePost.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}


export default UpdatePost;