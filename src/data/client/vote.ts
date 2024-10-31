import { QueryOptions, Vote, VoteInput } from "@/types";
import { API_ENDPOINTS } from "./api-endpoints";
import { curdFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const voteClient = {
    ...curdFactory<any, QueryOptions, VoteInput>(API_ENDPOINTS.VOTED),
    myVoted: (variables: {user_id: string}) => {
        return HttpClient.post<string>(API_ENDPOINTS.MYVOTED, variables);
    },
}