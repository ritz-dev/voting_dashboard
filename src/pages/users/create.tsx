import Layout from '@/components/layouts/admin';
import UserCreateOrUpdateForm from '@/components/user/user-form';
import { Routes } from '@/config/routes';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';
import { userPermission } from '@/utils/permission-utils';
import { GetServerSideProps } from 'next';

export default function CreateUserPage() {
    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Create Staff'}
                </h1>
            </div>
            <UserCreateOrUpdateForm/>
        </>
    )
}

CreateUserPage.authenticate = {
  permissions: [SUPER_ADMIN]
}

CreateUserPage.Layout = Layout;

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