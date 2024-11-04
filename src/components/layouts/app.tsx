import { getAuthCredentials } from "@/utils/auth-utils";
import { SUPER_ADMIN } from "@/utils/constants";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AdminLayout = dynamic(()=> import('@/components/layouts/admin'));
const UserLayout = dynamic(()=> import('@/components/layouts/user'));

export default function AppLayout({
    ...props
}) {
    const {permissions} = getAuthCredentials();
    const [isPermission,setIsPermission] = useState(false);

    useEffect(()=> {
        permissions && setIsPermission(permissions?.includes(SUPER_ADMIN));
    },[permissions])

    if(isPermission) {
        return <AdminLayout {...props} /> 
    }

    return <UserLayout {...props}/>;
}