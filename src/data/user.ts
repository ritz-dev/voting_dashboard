import { useMutation, useQuery, useQueryClient } from "react-query";
import { userClient } from "./client/user";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { GetParams, User, UserPaginator, UserQueryOptions } from "@/types";
import { Routes } from "@/config/routes";
import axios from "axios";
import { setEmailVerified } from "@/utils/auth-utils";
import Cookies from "js-cookie";
import { AUTH_CRED } from "@/utils/constants";
import { mapPaginatorData } from "@/utils/data-mappers";
import { toast } from "react-toastify";
import { useUser } from "@/contexts/me.context";

export const useMeQuery = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useQuery<User, Error>([API_ENDPOINTS.ME], userClient.me, {
        retry: false,

        onSuccess: () => {
            if(router.pathname === Routes.verifyLicense) {
                router.replace(Routes.dashboard);
            }
            if(router.pathname === Routes.verifyEmail) {
                setEmailVerified(true);

                router.replace(Routes.dashboard);
            }
        },
        onError: (err) => {
            if(axios.isAxiosError(err)) {
                // if(err.response?.status === 417) {
                //     router.replace(Routes.verifyLicense);
                //     return;
                // }

                // if(err.response?.status === 409) {
                //     setEmailVerified(false);
                //     router.replace(Routes.verifyEmail);
                // }

                // if(err.response?.status === 401) {
                //     router.replace(Routes.login);
                //     return;
                // }

                queryClient.clear();
                router.replace(Routes.login);
            }
        },
    })
};

export function useLogin() {
    return useMutation(userClient.login);
}

export const useLogoutMutation = () => {
    const router = useRouter();

    return useMutation(userClient.logout, {
        onSuccess: () => {
            Cookies.remove(AUTH_CRED);
            // router.replace(Routes.login);
            // toast.success('successfully logout', {
            //     toastId: 'logoutSuccess'
            // });
        },
        onError:(error) => {
            console.error('Logout failed;', error);
        }
    });
}

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(userClient.create, {
        onSuccess: (data: any) => {
            if (data) {
                router.push(Routes.user.list);
            }
            toast.success(('Successfully Register'), {
                toastId: 'successRegister',
            });
        },
        onError: (error: any) => {
            // Object.keys(error?.response?.data).forEach((field: any) => {
            //   setError(field, {
            //     type: 'manual',
            //     message: error?.response?.data[field][0],
            //   });
            // });
          },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.USERS);
        },
    })
}

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(userClient.update, {
        onSuccess: (data: any) => {
            if (data) {
                router.push(Routes.user.list);
            }
            toast.success(('Successfully Update'), {
                toastId: 'successUpdate',
            });
        },
        onError: (error: any) => {
            // Object.keys(error?.response?.data).forEach((field: any) => {
            //   setError(field, {
            //     type: 'manual',
            //     message: error?.response?.data[field][0],
            //   });
            // });
          },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.USERS);
        },
    })
}



export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(userClient.delete, {
        onSuccess: () => {
            toast.success(('Successfully Delete'), {
                toastId: 'successDelete',
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.USERS);
        },
        onError: (error: any) => {

        }
    })
}

export const useUserQuery = ({ slug }: GetParams) => {
    const { data, error, isLoading } = useQuery<User, Error>(
        [API_ENDPOINTS.USERS, {slug}],
        () => userClient.get({ slug }),
        {
            enabled: !!slug
        }
    );

    return {
        user: data,
        error,
        isLoading,
    };
}

export const useUsersQuery = (options: Partial<UserQueryOptions>) => {
    const { data, error, isLoading } = useQuery<UserPaginator, Error>(
        [API_ENDPOINTS.USERS, options],
        ({ queryKey, pageParam }) =>
            userClient.paginated(Object.assign({}, queryKey[1], pageParam)),
        {
            keepPreviousData: true,
        }
    );

    return {
        users: data?.data ?? [],
        paginatorInfo: mapPaginatorData(data),
        error,
        loading: isLoading
    }
}

