import CreateOrUpdateEventForm from '@/components/event/event-form';
import Layout from '@/components/layouts/admin';
import { Routes } from '@/config/routes';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { rolePermission } from '@/utils/permission-utils';
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
  permissions: [rolePermission[0]]
}

CreateEvent.Layout = Layout


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
  const generateRedirectUrl = Routes.denied;  
  const {token, permissions} = getAuthCredentials(ctx);

  if(!isAuthenticated({token, permissions}) || !hasAccess([rolePermission[0]], permissions)) {
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