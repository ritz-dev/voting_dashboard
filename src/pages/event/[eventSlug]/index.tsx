import Layout from '@/components/layouts/admin';
import CreateOrUpdateRoleForm from '@/components/role/role-form';
import { Routes } from '@/config/routes';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { rolePermission } from '@/utils/permission-utils';
import { GetServerSideProps } from 'next';

export default function EditEvent() {
  return (
      <>
          <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
              <h1 className="text-lg font-semibold text-heading">
                  {'Create Role'}
              </h1>
          </div>
          <CreateOrUpdateRoleForm />
      </>
  )
}

EditEvent.authenticate = {
  permissions: [rolePermission[0]]
}

EditEvent.Layout = Layout


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