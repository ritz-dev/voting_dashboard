import ConfirmationCard from "../common/confirmation-card"
import { useModalAction, useModalState } from "../ui/modal/modal.context"
import { getErrorMessage } from "@/utils/form-error";
import { useVotedMutation } from "@/data/vote";
import { useUser } from "@/contexts/me.context";

const VotedView = () => {
    const { mutate:createVote, isLoading: loading} = 
        useVotedMutation();

    const { data } = useModalState();
    const { closeModal } = useModalAction();

    async function handleDelete() {
        try{
            createVote(data);
            closeModal();
        } catch (error) {
            closeModal();
            getErrorMessage(error);
        }
    }

    return (
        <ConfirmationCard
            onCancel={closeModal}
            onDelete={handleDelete}
            deleteBtnLoading={loading}
        />
    )
}

export default VotedView;