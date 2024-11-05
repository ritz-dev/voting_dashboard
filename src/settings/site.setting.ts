import { Routes } from "@/config/routes";
import { adminOwnerAndStaffOnly } from "@/utils/auth-utils";
import { permission } from "process";

export const siteSettings = {
    name: 'Dashboard',
    description: '',
    logo: {
        url: '/logo.png',
        alt: 'logo',
        href: '/',
        width: 180,
        height: 90,
    },
    LoginLogo: {
      url: '/login-logo.png',
      alt: 'login-logo',
      href: '/',
      width: 80,
      height: 90,
    },
    collapseLogo: {
        url: '/collapse-logo.png',
        alt: 'collapse-logo',
        href: '/',
        width: 40,
        height: 44,
    },
    avatar: {
      placeholder: '/avatar-placeholder.svg',
    },
    defaultLanguage: 'my',
    author:{
        name: 'RITZ, Inc.',
        websiteUrl: 'http://redq.io',
        address: '',
    },
    authorizedLinks: [
      {
        href: Routes.profileUpdate,
        labelTransKey: 'Profile',
        icon: 'UserIcon',
      },
      {
        href: Routes.logout,
        labelTransKey: 'Logout',
        icon: 'LogOutIcon',
      }
    ],
    headerLinks: [],
    currencyCode: 'USD',
    sidebarLinks: {
        admin: {
          "root.cardRecord.parkingReport": {
            href: Routes.dashboard,
            label: 'Main',
            icon: 'DashboardIcon',
            childMenu: [
              {
                mainTag:'dashboard',
                href: Routes.dashboard,
                label: 'Dashboard',
                icon: 'DashboardIcon'
              },
            ]
          },
          "user": {
            href: '',
            label: 'user-management',
            icon: 'AdminListIcon',
            childMenu:[
              { 
                mainTag:'user',
                href: '',
                label: 'Staff',
                icon: 'AdminListIcon',
                childMenu: [
                  {
                    tag:'user-read',
                    href: Routes.user.list,
                    label: 'All Staffs',
                    icon: 'AdminListIcon',
                  },
                  {
                    tag:'user-create',
                    href: Routes.user.create,
                    label: 'Add New Staff',
                    icon: 'AdminListIcon',
                  }
                ]
              },
            ]
          },
          "Event": {
            href: '',
            label: 'event-management',
            icon: 'OrdersIcon',
            childMenu:[
              { 
                mainTag:'event',
                href: '',
                label: 'Event',
                icon: 'OrdersIcon',
                childMenu: [
                  {
                    tag:'event-read',
                    href: Routes.event.list,
                    label: 'All Event',
                    icon: 'OrdersIcon',
                  },
                  {
                    tag:'event-create',
                    href: Routes.event.create,
                    label: 'Add New Event',
                    icon: 'OrdersIcon',
                  }
                ]
              },
            ]
          },
        }
    }
}