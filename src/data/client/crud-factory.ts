import { GetParams, PaginatorInfo } from "@/types";
import { HttpClient } from "./http-client"

interface LanguageParam {
    language: string;
}

export function curdFactory<Type, QueryParams extends LanguageParam,InputType>(
    endpoint: string
) {
    return {
        get({ slug }: GetParams) {
            return HttpClient.get<Type>(`${endpoint}/${slug}`);
        },
        create(data: InputType) {
            return HttpClient.post<Type>(endpoint, data);
        },
        update({ id, ...input }: Partial<InputType> & { id: string }) {
            return HttpClient.put<Type>(`${endpoint}/${id}`, input);
        },
        delete({ id }: { id: string }) {
            return HttpClient.delete<boolean>(`${endpoint}/${id}`);
        },
    };
}