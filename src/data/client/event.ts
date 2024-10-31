import { QueryOptions, EventInput, EventQueryOptions, Event, EventPaginator } from "@/types";
import { curdFactory } from "./crud-factory";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const eventClient = {
    ...curdFactory<Event, QueryOptions, EventInput>(API_ENDPOINTS.EVENTS),
    get({ slug } : {slug: String }) {
        return HttpClient.get<Event>(`${API_ENDPOINTS.EVENTS}/${slug}`);
    },
    paginated: ({ name, ...params} : Partial<EventQueryOptions>) => {
        return HttpClient.get<EventPaginator>(API_ENDPOINTS.EVENTS, {
            ...params,
            search: HttpClient.formatSearchParams({ name }),
          });
    },
}