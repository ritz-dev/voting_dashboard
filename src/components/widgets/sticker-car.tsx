import React from 'react';
import { IosArrowDown } from '@/components/icons/ios-arrow-down';
import { IosArrowUp } from '@/components/icons/ios-arrow-up';
import cn from 'classnames';
import { useModalAction } from '../ui/modal/modal.context';

interface StickerCardProps {
  titleTransKey: string;
  subtitleTransKey?: string;
  icon?: React.ReactNode;
  price: string | number;
  indicator?: 'up' | 'down';
  indicatorText?: string;
  note?: string;
  link?: string;
  linkText?: string;
  active?: boolean;
}

const StickerCard = ({
  titleTransKey,
  subtitleTransKey,
  icon,
  price,
  indicator,
  indicatorText,
  note,
  link,
  linkText,
  active
}: StickerCardProps) => {

  const {openModal} = useModalAction();

  function handleChoose() {
    openModal('CHOOSE_PERSON',1)
  }

  return (
    <div
      className={cn(
        'group flex h-full w-full flex-col rounded-xl border border-border-300 p-5 md:p-6 transition duration-300 ease-in-out select-none cursor-pointer',
        {
          'text-white bg-accent-500': active,
          'hover:bg-accent-500 hover:text-white': !active
        }
      )
    }
    onClick={handleChoose}
    >
      <div className="mb-auto flex w-full items-center justify-between">
        <div className='flex items-center'>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100/80 me-5">
            {icon}
          </div>
          <div className="flex w-full">
            <span className="mb-1 text-md font-semibold opacity-90">
              {"AUNG KYAW THU"}
            </span>
          </div>
        </div>
          <span className='text-white font-bold'>{active ? 'VOTED' : 'Choose'}</span>
      </div>
    </div>
  );
};

export default StickerCard;
