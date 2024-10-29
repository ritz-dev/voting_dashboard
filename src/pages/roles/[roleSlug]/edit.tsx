import Layout from '@/components/layouts/admin';
import CreateOrUpdateRoleForm from "@/components/role/role-form";
import ErrorMessage from '@/components/ui/error-message';
import Loader from "@/components/ui/loader/loader";
import { Routes } from '@/config/routes';
import { useRoleQuery } from '@/data/role';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { rolePermission } from '@/utils/permission-utils';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";

export default function UpdateRole() {
    const { query } = useRouter();

    const { 
        role,
        isLoading: loading,
        error,
    } = useRoleQuery({
        slug: query.roleSlug as string,
    });

    if(loading) return <Loader text={('Loading')} />;
    if (error) return <ErrorMessage message={error?.message as string} />;

    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Edit Role'}
                </h1>
            </div>
            <CreateOrUpdateRoleForm initialValues={role}/>
        </>
    )
}

UpdateRole.authenticate = {
    permissions: [rolePermission[2]]
}

UpdateRole.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const generateRedirectUrl = Routes.denied;  
    const {token, permissions} = getAuthCredentials(ctx);
  
    if(!isAuthenticated({token, permissions}) || !hasAccess([rolePermission[2]], permissions)) {
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
