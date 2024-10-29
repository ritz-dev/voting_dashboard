import Link from "next/link";
import { EditIcon } from "../icons/edit copy";
import { useModalAction } from "../ui/modal/modal.context";
import { TrashIcon } from "../icons/trash";
import { EyeIcon } from "../icons/category/eyes-icon";
import { Eye } from "../icons/eye-icon";

type Props = {
    id: string;
    editModalView?: string | any;
    deleteModalView?: string | any;
    editUrl?: string;
    previewUrl?: string;
    detailsUrl?: string;
    enablePreviewMode?: boolean;
}

const ActionButtons = ({
    id,
    editModalView,
    deleteModalView,
    enablePreviewMode = false,
    editUrl,
    previewUrl,
    detailsUrl,
}: Props) => {

    const { openModal } = useModalAction();

    function handleDelete() {
        openModal(deleteModalView, id);
    }

    function handleEditModel() {
        openModal(editModalView, id);
    }

    return (
        <div className="inline-flex items-center w-auto gap-3">
            {editModalView && (
                    <button
                        onClick={handleEditModel}
                        className="text-base transition duration-200 hover:text-heading"
                        title={('Edit')}
                    >
                        <EditIcon width={16} />
                    </button>
                )
            }
            {editUrl && (
                    <Link
                        href={editUrl}
                        className="text-base transition duration-200 hover:text-heading"
                        title={('Edit')}
                        >
                        <EditIcon width={16} />
                    </Link>
                )
            }
            {enablePreviewMode && (
                <>
                    {previewUrl && (
                        <Link
                            href={previewUrl}
                            className="text-base transition duration-200 hover:text-heading"
                            title={('Preview')}
                            target="_blank"
                        >
                            <EyeIcon width={18} />   
                        </Link>
                    )}
                </>
            )}
            {detailsUrl && (
                <Link
                    href={detailsUrl}
                    className="text-base transition duration-200 hover:text-heading"
                    title={('View')}
                    // locale={customLocale}
                >
                    <Eye className="w-5 h-5" />
                </Link> 
            )}
            {deleteModalView && ( 
                <button
                    onClick={handleDelete}
                    className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
                    title={('Delete')}
                >
                    <TrashIcon width={14}/>
                </button>   
            )}
        </div>
    )
}

export default ActionButtons;