import { useDeleteRoleMutation } from "@/data/role";
import ConfirmationCard from "../common/confirmation-card"
import { useModalAction, useModalState } from "../ui/modal/modal.context"
import { getErrorMessage } from "@/utils/form-error";

const RoleDeleteView = () => {
    const { mutate:deleteRole, isLoading: loading} = 
        useDeleteRoleMutation();
    const { data } = useModalState();
    const { closeModal } = useModalAction();

    async function handleDelete() {
        try{
            deleteRole({ id: data });
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

export default RoleDeleteView;