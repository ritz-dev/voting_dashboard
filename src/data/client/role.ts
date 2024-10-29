import { Role, QueryOptions, RoleInput, RoleQueryOptions, RolePaginator } from "@/types";
import { curdFactory } from "./crud-factory";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const roleClient = {
    ...curdFactory<Role, QueryOptions, RoleInput>(API_ENDPOINTS.ROLES),
    get({ slug } : {slug: String }) {
        return HttpClient.get<Role>(`${API_ENDPOINTS.ROLES}/${slug}`);
    },
    paginated: ({ name, ...params} : Partial<RoleQueryOptions>) => {
        return HttpClient.get<RolePaginator>(API_ENDPOINTS.ROLES, {
            ...params,
            search: HttpClient.formatSearchParams({ name }),
          });
    },
}