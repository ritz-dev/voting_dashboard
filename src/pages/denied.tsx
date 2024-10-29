import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getAuthCredentials, isAuthenticated } from "@/utils/auth-utils";
import { Routes } from "@/config/routes";

const AccessDeniedPage = dynamic(()=> import('@/components/common/access-denied'));

export default function Denied() {
  return <AccessDeniedPage/>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const generateRedirectUrl = Routes.login;
  const {token, permissions} = getAuthCredentials(ctx);
  
  if(!isAuthenticated({token, permissions})) {
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