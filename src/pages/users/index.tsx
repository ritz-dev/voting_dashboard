import Layout from '@/components/layouts/admin';
import Card from "@/components/common/card";
import PageHeading from "@/components/common/page-heading";
import UserList from "@/components/user/user-list";
import { useState } from 'react';
import { SortOrder } from '@/types';
import { useUsersQuery } from '@/data/user';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { GetServerSideProps } from 'next';
import { Routes } from "@/config/routes";
import { userPermission } from '@/utils/permission-utils';

export default function AllUsersPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState('name');
    const [sortedBy,  setColumn] = useState<SortOrder>(SortOrder.Asc);
    const { users, paginatorInfo, loading, error} = useUsersQuery({
        name: searchTerm,
        limit: 10,
        page,
        orderBy,
        sortedBy
    });

    function handleSearch({ searchText }: { searchText:string }) {
        setSearchTerm(searchText);
    }

    function handlePagination(current:any) {
        setPage(current);
    }

    return (
        <>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <PageHeading title={'Users'} />
                </div>
            </Card>
            <UserList
                users={users}
                paginatorInfo={paginatorInfo}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
                loading={loading}
            />
        </>
    )
}

AllUsersPage.authenticate = {
    permissions: userPermission
}

AllUsersPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const generateRedirectUrl = Routes.denied;  
    const {token, permissions} = getAuthCredentials(ctx);

    if(!isAuthenticated({token, permissions}) || !hasAccess(userPermission, permissions)) {
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