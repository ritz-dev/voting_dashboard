import { AuthResponse, LoginInput, QueryOptions, User, UserInput, UserPaginator, UserQueryOptions } from "@/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";
import { curdFactory } from "./crud-factory";


export const userClient = {
    ...curdFactory<User, QueryOptions, UserInput>(API_ENDPOINTS.USERS),
    get({ slug } : {slug: String }) {
        return HttpClient.get<User>(`${API_ENDPOINTS.USERS}/${slug}`);
    },
    me: () => {
        return HttpClient.get<User>(API_ENDPOINTS.ME);
    },
    login: (variables: LoginInput) => {
        return HttpClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, variables);
    },
    logout: () => {
        return HttpClient.post<any>(API_ENDPOINTS.LOGOUT, {});
    },
    paginated: ({ name, ...params} : Partial<UserQueryOptions>) => {
        return HttpClient.get<UserPaginator>(API_ENDPOINTS.USERS, {
            ...params,
            search: HttpClient.formatSearchParams({ name }),
        });
    },
}