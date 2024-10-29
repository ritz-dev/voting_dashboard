import Card from "@/components/common/card";
import Layout from '@/components/layouts/admin';
import PageHeading from "@/components/common/page-heading";
import { getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { Routes } from "@/config/routes";
import RoleList from "@/components/role/role-list";
import { useState } from "react";
import { SortOrder } from "@/types";
import { useRolesQuery } from "@/data/role";
import Loader from "@/components/ui/loader/loader";
import ErrorMessage from "@/components/ui/error-message";
import { GetServerSideProps } from 'next';
import { rolePermission } from "@/utils/permission-utils";

export default function AllRolesPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState('created_at');
    const [sortedBy,  setColumn] = useState<SortOrder>(SortOrder.Asc);
    const { roles, paginatorInfo, loading, error} = useRolesQuery({
        name: searchTerm,
        limit: 10,
        page,
        orderBy,
        sortedBy
    });
    
    if (loading) return <Loader text={('Loading')} />;
    if (error) return <ErrorMessage message={error.message} />;
    
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
                    <PageHeading title={'Roles'} />
                </div>
            </Card>
            <RoleList
                roles={roles}
                paginatorInfo={paginatorInfo}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
            />
        </>
    );
}

AllRolesPage.authenticate = {
    permissions: rolePermission
};

AllRolesPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const generateRedirectUrl = Routes.denied;  
    const {token, permissions} = getAuthCredentials(ctx);

    if(!isAuthenticated({token, permissions}) || !hasAccess(rolePermission, permissions)) {
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
