import React, { ReactElement } from 'react'
import Layout from '../../../components/layout';
import ProfileForm from '../../../components/profile-form';
import { NextPageWithLayout } from '../../_app';

const EditProfile: NextPageWithLayout = () => {
  return (
    <ProfileForm image={undefined} />
  )
}

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default EditProfile