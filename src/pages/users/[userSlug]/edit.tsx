import Layout from '@/components/layouts/admin';
import ErrorMessage from "@/components/ui/error-message";
import Loader from "@/components/ui/loader/loader";
import UserCreateOrUpdateForm from "@/components/user/user-form";
import { Routes } from '@/config/routes';
import { useUserQuery } from "@/data/user";
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { userPermission } from '@/utils/permission-utils';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";

export default function UpdateUser() {
    const { query } = useRouter();

    const { 
        user, 
        isLoading: loading, 
        error 
    } = useUserQuery({
        slug: query.userSlug as string,
    });

    if(loading) return <Loader text={('Loading')} />;
    if(error) return <ErrorMessage message={error?.message as string} />;

    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Edit User'}
                </h1>
            </div>
            <UserCreateOrUpdateForm initialValues={user}/>
        </>
    )
}

UpdateUser.authenticate = {
    permissions: [userPermission[2]]
}

UpdateUser.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const generateRedirectUrl = Routes.denied;  
    const {token, permissions} = getAuthCredentials(ctx);

    if(!isAuthenticated({token, permissions}) || !hasAccess([userPermission[2]], permissions)) {
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