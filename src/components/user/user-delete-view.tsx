import { useDeleteUserMutation } from "@/data/user";
import ConfirmationCard from "../common/confirmation-card"
import { useModalAction, useModalState } from "../ui/modal/modal.context"
import { getErrorMessage } from "@/utils/form-error";

const UserDeleteView = () => {
    const { mutate:deleteUser, isLoading: loading} = 
        useDeleteUserMutation();
    const { data } = useModalState();
    const { closeModal } = useModalAction();

    async function handleDelete() {
        try{
            deleteUser({ id: data });
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

export default UserDeleteView;