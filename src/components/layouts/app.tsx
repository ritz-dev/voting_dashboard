import { getAuthCredentials } from "@/utils/auth-utils";
import { SUPER_ADMIN } from "@/utils/constants";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(()=> import('@/components/layouts/admin'));
const UserLayout = dynamic(()=> import('@/components/layouts/user'));

export default function AppLayout({
    ...props
}) {
    const {permissions} = getAuthCredentials();

    if(permissions?.includes(SUPER_ADMIN)) {
        return <AdminLayout {...props} /> 
    }

    return null;
}