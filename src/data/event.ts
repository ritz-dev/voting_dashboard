import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { adminOnly, getAuthCredentials, hasAccess } from "@/utils/auth-utils";
import { Routes } from "@/config/routes";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { Config } from "@/config";
import { GetParams, Event, EventPaginator, EventQueryOptions } from "@/types";
import { mapPaginatorData } from "@/utils/data-mappers";
import { eventClient } from "./client/event";
import { toast } from "react-toastify";


export const useCreateEventMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(eventClient.create, {
        onSuccess:() => {
            const { permissions } = getAuthCredentials();
            toast.success(('Successfully Created Event'), {
                toastId: 'successCreated',
            });
            if(hasAccess(adminOnly, permissions)) {
                return router.push(Routes.event.list);
            }
            router.push(Routes.dashboard);
            
        },
        // Always refetch after error or succes:
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
        },
    });
}

export const useUpdateEventMutation = () => {
    
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(eventClient.update, {
        onSuccess: async (data) => {
            if (data) {
                router.push(Routes.event.list);
            }
            toast.success(('Successfully Update'), {
                toastId: 'successUpdate',
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
        },
    });
};


export const useDeleteEventMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(eventClient.delete, {
        onSuccess: () => {
            
        },
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
        },
        onError: (error: any) => {

        }
    })
}

export const useEventQuery = ({ slug }: GetParams) => {
    const { data,error,isLoading } = useQuery<Event, Error>(
        [API_ENDPOINTS.EVENTS, { slug }],
        () => eventClient.get({ slug }),
        {
            enabled: !!slug
        }
    );

    return {
        event: data,
        error,
        isLoading,
    };
};

export const useEventsQuery = (options: Partial<EventQueryOptions>) => {
    const { data, error, isLoading } = useQuery<EventPaginator, Error>(
        [API_ENDPOINTS.EVENTS, options],
        ({ queryKey, pageParam }) =>
            eventClient.paginated(Object.assign({}, queryKey[1], pageParam)),
        {
            keepPreviousData: true,
        }
    );

    return {
        events: data?.data ?? [],
        paginatorInfo: mapPaginatorData(data),
        error,
        loading: isLoading
    }
}