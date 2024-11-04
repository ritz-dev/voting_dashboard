import React from 'react';
import cn from 'classnames';
import { useModalAction } from '../ui/modal/modal.context';
import Image from 'next/image';
import { siteSettings } from '@/settings/site.setting';

interface StickerCardProps {
  icon?: React.ReactNode;
  active?: boolean;
  event_id: string;
  user_id: string;
  imageUrl: string | null;
  candidateInfo: any
}

const StickerCard = ({
  active,
  event_id,
  user_id,
  imageUrl,
  candidateInfo
}: StickerCardProps) => {

  const {openModal} = useModalAction();

  function handleChoose() {
    openModal('CHOOSE_PERSON',{
      event_id,
      candidate_id: candidateInfo.id,
      user_id
    })
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
            <Image src={imageUrl ?? siteSettings?.avatar?.placeholder} alt='' width={100} height={100} className='rounded-lg overflow-hidden'/>
          </div>
          <div className="flex w-full">
            <span className="mb-1 text-md font-semibold opacity-90">
              {candidateInfo.name}
            </span>
          </div>
        </div>
          <span className='text-white font-bold'>{active ? 'VOTED' : 'Choose'}</span>
      </div>
    </div>
  );
};

export default StickerCard;
