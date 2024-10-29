import Card from '@/components/common/card';
import PageHeading from '@/components/common/page-heading';
import Layout from '@/components/layouts/admin';
import { Routes } from '@/config/routes';
import { SortOrder } from '@/types';
import { getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { cardRecordPermission } from '@/utils/permission-utils';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfileUpdate() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState('cardId');
    const [sortedBy,  setColumn] = useState<SortOrder>(SortOrder.Asc);

    function handleSearch({ searchText }: { searchText:string }) {
        setSearchTerm(searchText);
    }

    function handlePagination(current:any) {
        setPage(current);
    }

    return (
    <>
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
    </>
  )
}

ProfileUpdate.authenticate = {
    permissions: cardRecordPermission
}

ProfileUpdate.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const generateRedirectUrl = Routes.login;
    const {token, permissions} = getAuthCredentials(ctx);
    
    if(!isAuthenticated({token, permissions}) || !hasAccess(cardRecordPermission, permissions)) {
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