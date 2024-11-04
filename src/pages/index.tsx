import AppLayout from '@/components/layouts/app';
import dynamic from "next/dynamic";
import Layout from '@/components/layouts/admin';
import { GetServerSideProps } from "next";
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { Routes } from "@/config/routes";
import AccessDeniedPage from '@/components/common/access-denied';

const AdminDashboard = dynamic(()=> import('@/components/dashboard/admin'));


export default function Dashboard() {
  const {permissions} = getAuthCredentials();
  if(hasAccess(allowedRoles, permissions)) {
    return <AdminDashboard />;
  }
  return <AccessDeniedPage />;
}

Dashboard.Layout = Layout;

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
    props: {}
  }
}