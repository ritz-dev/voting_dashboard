import { CheckedIcon } from '@/components/icons/checked';
import Button from '@/components/ui/button';
import cn from 'classnames';

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = 'VOTED',
  description = 'Are you sure, vote this person?',
  cancelBtnText = 'Cancel',
  deleteBtnText = 'Confirm',
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
}) => {

  return (
    <div className="m-auto w-full max-w-sm rounded-md bg-light p-4 pb-6 sm:w-[24rem] md:rounded-xl">
      <div className="w-full h-full text-center">
        <div className="flex flex-col justify-between h-full">
          {icon ? (
            icon
          ) : (
            <CheckedIcon className="w-12 h-12 m-auto mt-4 text-accent" />
          )}
          <p className="mt-4 text-xl font-bold text-heading">{(title)}</p>
          <p className="px-6 py-2 leading-relaxed text-body-dark dark:text-muted">
            {(description)}
          </p>
          <div className="flex items-center justify-between w-full mt-8 space-x-4">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  'w-full rounded bg-red-700 py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-red-800 focus:bg-red-800 focus:outline-none',
                  cancelBtnClassName,
                )}
              >
                {(cancelBtnText)}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="custom"
                className={cn(
                  'w-full rounded bg-green-700 py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-green-800 focus:bg-green-800 focus:outline-none',
                  deleteBtnClassName,
                )}
              >
                {(deleteBtnText)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
