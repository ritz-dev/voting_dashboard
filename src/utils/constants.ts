import { atom } from "jotai";

export const SUPER_ADMIN = '9d5fd9ac-8ac8-4754-a950-7c33a9f035c5';
export const STORE_OWNER = 'store_owner';
export const STAFF = '9d5fd9ac-90fa-4f7c-8b85-9a7399944384';
export const TOKEN = 'token';
export const AUTH_CRED = 'AUTH_CRED';
export const EMail_VERIFIED = 'emailVerified';
export const PERMISSIONS = 'permissions';
export const RESPONSIVE_WIDTH = 1024 as number;
export const ExpireDuration = 1;

export const statusList = [
  {
    label: 'Yes',
    id: 'yes',
    value: 'true',
  },
  {
    label: 'No',
    id: 'no',
    value: 'false',
  },
];

export const phoneRegExp =
  /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const ACCEPTED_FILE_TYPES = {
    'image/jpeg': [],
    'image/png': [],
    'application/pdf': [],
    'application/zip': [],
    'application/vnd.rar': [],
    'application/epub+zip': [],
    '.psd': [],
};

export const ACCEPTED_IMAGE_TYPES = {
    'image/jpeg': [],
    'image/png': [],
    'image/gif': [],      // You might want to include other common image types like GIF
    'image/webp': [],     // And WebP
    'image/bmp': [],      // And BMP
    'image/tiff': [],     // And TIFF
};

export const imageUrlRegExp = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

export const searchModalInitialValues = atom(false);
export const miniSidebarInitialValue = atom(false);
export const checkIsMaintenanceModeComing = atom(false);
export const checkIsMaintenanceModeStart = atom(false);