import { getAuthCredentials } from "@/utils/auth-utils";
import { SUPER_ADMIN } from "@/utils/constants";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AdminLayout = dynamic(() => import('@/components/layouts/admin'));
const UserLayout = dynamic(() => import('@/components/layouts/user'));

export default function AppLayout({ ...props }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isPermission, setIsPermission] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Set mounted state to true after client-side mount
        const { permissions } = getAuthCredentials();
        setIsPermission(permissions?.includes(SUPER_ADMIN) || false); // Ensure boolean value
    }, []);

    if (!isMounted) {
        // Avoid rendering any layout until mounted on the client
        return null;
    }

    return isPermission ? <AdminLayout {...props} /> : <UserLayout {...props} />;
}
