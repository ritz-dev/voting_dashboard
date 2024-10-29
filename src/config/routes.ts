export const Routes = {
    dashboard: '/',
    login: '/login',
    logout: '/logout',
    profileUpdate: '/profile-update',
    verifyEmail: '/verify-email',
    verifyLicense: '/verify-license',
    denied: '/denied',
    user: {
        ...routesFactory('/users'),
    },
    role: {
        ...routesFactory('/roles'),
    },
    event: {
        ...routesFactory('/event'),
    }
};

function routesFactory(endpoint: string) {
    return {
        list: `${endpoint}`,
        create: `${endpoint}/create`,
        editWithoutLang: (slug: string, shop?: string) => {
            return shop
              ? `/${shop}${endpoint}/${slug}/edit`
              : `${endpoint}/${slug}/edit`
        },
        edit: (slug: string,language: string, shop?: string) => {
            return shop
                ? `/${language}/${shop}${endpoint}/${slug}/translate`
                : `${language}${endpoint}/${slug}/translate`;
        },
        translate: (slug: string, language: string, shop?: string) => {
            return shop
              ? `/${language}/${shop}${endpoint}/${slug}/translate`
              : `${language}${endpoint}/${slug}/translate`;
        },
        details: (slug: string) => `${endpoint}/${slug}`,
        editByIdWithoutLang: (id: string, shop?: string) => {
        return shop ? `/${shop}${endpoint}/${id}/edit` : `${endpoint}/${id}/edit`;
        },
    }
}

function routesChild(endpoint:  string ,childRoutes: string[]) {
    return childRoutes.reduce((acc, route) => {
        acc[route] = `${endpoint}/${route}`;
        return acc;
    }, {} as Record<string, string>);
}

