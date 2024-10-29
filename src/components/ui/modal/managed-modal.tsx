import dynamic from "next/dynamic";
import Modal from "./modal";
import { MODAL_VIEWS, useModalAction, useModalState } from "./modal.context"

const RoleDeleteView = dynamic(
    () => import('@/components/role/role-delete-view'),
);

const UserDeleteView = dynamic(
    () => import('@/components/user/user-delete-view'),
);

const ChooseVote = dynamic(
    ()=> import('@/components/vote/vote-confirm-view')
)

function renderModal(view: MODAL_VIEWS | undefined, data:any) {
    switch (view) {
        case 'DELETE_ROLE':
            return <RoleDeleteView />;
        case 'DELETE_USER':
            return <UserDeleteView />;
        case 'CHOOSE_PERSON':
            return <ChooseVote/>
    }
}

const ManagedModal = () => {
    const { isOpen, view, data } = useModalState();
    const { closeModal } = useModalAction();

    return (
        <Modal open={isOpen} onClose={closeModal}>
            {renderModal(view, data)}
        </Modal>
    )
}

export default ManagedModal;