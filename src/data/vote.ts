import { Routes } from "@/config/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { voteClient } from "./client/vote";
import { useUser } from "@/contexts/me.context";

export const useVotedMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setUserVoted } = useUser();
    const { mutate: myVoted } = useMyVoteQuery();

    // const myVoted = useMutation(
    //     voteClient.myVoted, // Replace with actual API call
    //     {
    //         onSuccess: (data) => {
    //             console.log(user_id)
    //             setUserVoted(data);
    //         },
    //         onError: () => {
    //             // handle error if needed
    //         },
    //     }
    // );

    const onSubmit = (value: string) => {
        myVoted(
            {
                user_id: value || ''
            },
            {
                onSuccess: (data) => {
                    console.log(data)
                    setUserVoted(data);
                },
                onError: () => {
                    // handle error
                },
            }
        );
    };
                                               
    return useMutation(
        voteClient.create, // First mutation API call
        {
            onSuccess: (data) => {
                if (data) {
                    router.push(Routes.dashboard);
                    // Trigger the dependent mutation after the first one succeeds
                    // myVoted.mutate(data.user_id); // Pass necessary data for `myVoted`
                    onSubmit(data.user_id)
                }
                toast.success('Successfully Voted', {
                    toastId: 'successVoted',
                });
            },
            onError: (error) => {
                // handle error if needed
            },
            onSettled: () => {
                // Invalidate the query to refetch data after either success or error
                queryClient.invalidateQueries(API_ENDPOINTS.VOTED);
            },
        }
    );
}

export const useMyVoteQuery = () => {
    return useMutation(voteClient.myVoted)
};
