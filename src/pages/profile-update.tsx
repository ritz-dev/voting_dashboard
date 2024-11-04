import Card from '@/components/common/card';
import AppLayout from '@/components/layouts/app';
import { Routes } from '@/config/routes';
import { useUser } from '@/contexts/me.context';
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { GetServerSideProps } from 'next';
import Image from 'next/image';

export default function ProfileUpdate() {

  const {user} = useUser();

    return (
    <div className='w-1/3 mx-auto'>
        <Card className="mb-8 flex flex-col items-center justify-center md:flex-row">
            {user?.imageUrl ? (
              <Image
                  className="w-36 h-full object-cover"
                  src={user?.imageUrl?.thumbnail}
                  alt={user?.imageUrl?.thumbnail}
                  width={200}
                  height={200}
              />
            ) : (
              <div className="w-32 h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                  N/A
              </div>
              )}
            <div className="p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{user?.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full uppercase tracking-wide">
                {user?.role}
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