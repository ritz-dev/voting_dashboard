import CreateOrUpdateEventForm from '@/components/event/event-form';
import Layout from '@/components/layouts/admin';
import { Routes } from '@/config/routes';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';
import { GetServerSideProps } from 'next';

export default function CreateEvent() {
  return (
      <>
          <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
              <h1 className="text-lg font-semibold text-heading">
                  {'Create Event'}
              </h1>
          </div>
          <CreateOrUpdateEventForm />
      </>
  )
}

CreateEvent.authenticate = {
  permissions: [SUPER_ADMIN]
}

CreateEvent.Layout = Layout


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
  const generateRedirectUrl = Routes.denied;  
  const {token, permissions} = getAuthCredentials(ctx);

  if(!isAuthenticated({token, permissions}) || !hasAccess([SUPER_ADMIN], permissions)) {
    return {
      redirect:{
        destination: generateRedirectUrl,
        permanent: false
      }
    };
  }

  return {
    props: {}
  }
}