import { useRouter } from 'next/router';
import React, { ReactElement } from 'react'
import Layout from '../../../components/layout';
import ProfileForm from '../../../components/profile-form';
import { useUser } from '../../../context/user-context';
import { NextPageWithLayout } from '../../_app';

const EditProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useUser();

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