
import Cookie from "js-cookie";
import SSRCookie from 'cookie';
import { 
    AUTH_CRED, 
    EMail_VERIFIED, 
    PERMISSIONS, 
    STAFF, 
    STORE_OWNER, 
    SUPER_ADMIN, 
    TOKEN 
} from "./constants";

export const allowedRoles = [SUPER_ADMIN, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN,STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN,STORE_OWNER,STAFF];
export const adminOnly = [SUPER_ADMIN];
export const ownerOnly = [STORE_OWNER];
export const ownerAndStaffOnly = [STORE_OWNER,STAFF];

export function setEmailVerified(emailVerified: boolean) {
    Cookie.set(EMail_VERIFIED, JSON.stringify({emailVerified}));
}

export function getEmailVerified () : {
    emailVerified: boolean;
} {
    const emailVerified = Cookie.get(EMail_VERIFIED);
    return emailVerified ? JSON.parse(emailVerified) : false;
}

export function setAuthCredentials (token: string, permissions: any,role: any) {
    Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, role}));
}

export function getAuthCredentials(context?: any): {
    token: string | null;
    permissions: string[] | null;
    role: string | null
} {
    let authCred;
    if (context) {
        authCred = parseSSRCookie(context)[AUTH_CRED];
    } else {
        authCred = Cookie.get(AUTH_CRED);
    }
    if (authCred) {
        return JSON.parse(authCred);
    }

    return { token: null, permissions: null, role: null };
}

export function parseSSRCookie(context: any) {
    return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function hasAccess(
    _allowedRoles: string[],
    _userPermission: string[] | string | undefined | null
) {
    if(_userPermission) {
        return Boolean(
            _allowedRoles?.some((aRole) => _userPermission.includes(aRole))
        );
    }
    return false;
}

export function isAuthenticated(_cookies: any) {
    return (
        !!_cookies[TOKEN] && Array.isArray(_cookies[PERMISSIONS]) && !!_cookies[PERMISSIONS].length
    )
}