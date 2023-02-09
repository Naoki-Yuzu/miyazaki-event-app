import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
import PostForm from '../../../components/post-form';
import { NextPageWithLayout } from '../../_app';

const EditPost: NextPageWithLayout = () => {
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