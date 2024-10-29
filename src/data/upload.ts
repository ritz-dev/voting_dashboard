import { useMutation, useQueryClient } from "react-query"
import { uploadClient } from "./client/upload";
import { API_ENDPOINTS } from "./client/api-endpoints";

export const useUploadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (input: any) => {
            return uploadClient.upload(input);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS);
            }
        }
    );
};