import Card from '@/components/common/card';
import AppLayout from '@/components/layouts/app';
import { Routes } from '@/config/routes';
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { cardRecordPermission } from '@/utils/permission-utils';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

export default function ProfileUpdate() {

    return (
    <div className='w-1/3 mx-auto'>
        <Card className="mb-8 flex flex-col items-center justify-center md:flex-row">
            <Image
                className="w-36 h-full object-cover"
                src={''}
                alt={''}
            />
            <div className="p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{"Aung Kyaw Thu"}</h2>
                <p className="text-gray-500 text-sm mb-4">{"aungkyawthu@ritz.com.mm"}</p>
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full uppercase tracking-wide">
                {"Staff"}
                </span>
            </div>
        </Card>
    </div>
  )
}

ProfileUpdate.authenticate = {
    permissions: allowedRoles
}

ProfileUpdate.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const generateRedirectUrl = Routes.login;
    const {token, permissions} = getAuthCredentials(ctx);
    
    if(!isAuthenticated({token, permissions}) || !hasAccess(allowedRoles, permissions)) {
      return {
        redirect:{
          destination: generateRedirectUrl,
          permanent: false
        }
      };
    }
  
    return {
      props: {
        userPermissions: permissions
      }
    }
  }