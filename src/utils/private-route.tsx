import { useRouter } from "next/router";
import { getAuthCredentials, hasAccess } from "./auth-utils";
import { useEffect, useState } from "react";
import { Routes } from "@/config/routes";
import AccessDeniedPage from "@/components/common/access-denied";
import Loader from "@/components/ui/loader/loader";

const PrivateRoute: React.FC<{ authProps: any; children?: React.ReactNode }> = ({ children, authProps }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const { token, permissions,role } = getAuthCredentials();
        const isUser = !!token;

        if (!isUser) {
            router.replace(Routes.login);
        } else {
            const hasPermission = true;
            // hasAccess(authProps.permissions, permissions);
            setIsAuthorized(hasPermission);
        }

        setLoading(false);
    }, [router, authProps.permissions]);

    if (loading) {
        return <Loader showText={true} />;
    }

    if (!isAuthorized) {
        return <AccessDeniedPage />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
