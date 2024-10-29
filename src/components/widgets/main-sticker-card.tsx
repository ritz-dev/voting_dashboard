import React from 'react';
import { IosArrowDown } from '@/components/icons/ios-arrow-down';
import { IosArrowUp } from '@/components/icons/ios-arrow-up';
import RadialBarChart from '../ui/radial-bar-chart';

const MainStickerCard = ({
  titleTransKey,
  subtitleTransKey,
  titleTransKeySec,
  priceSec,
  color,
  price,
  indicator,
  indicatorText,
  note,
  noteSec,
  link,
  linkText,
  chart,
  parkingSize
}: any) => {
  
  return (
    <div className='group grid grid-cols-3 h-full w-full rounded-xl border border-border-300 bg-light p-5 md:p-6 hover:bg-accent-500 hover:text-white transition duration-300 ease-in-out select-none'>
      <div
        className="grid grid-cols-5 ml-8 py-7 col-span-2"
      //   style={{ borderBottomColor: color }}
      >
        <div className="flex w-full flex-col col-span-3 justify-center border-r pr-5 border-gray-300 group-hover:border-gray-600">
            <span className="mb-3 text-md font-normal opacity-65">
            {(titleTransKey)}
            </span>
            <span className="text-xs font-semibold text-body">
            {(subtitleTransKey)}
            </span>
            <span className="font-semibold text-4xl">
            {price}
            </span>
            {indicator === 'up' && (
                <span
                    className="mt-4 text-sm font-semibold text-body flex items-center"
                    style={{ color: '#02bfa4' }}
                >
                    <div className='px-2 py-1 rounded-xl group-hover:bg-gray-50 transition-colors duration-300 ease-in-out bg-zinc-100'>
                        <IosArrowUp width="9px" height="11px" className="inline-block" />{' '}
                        {indicatorText}
                    </div>
                    <span className="text-sm font-normal text-body ml-4 group-hover:text-gray-400">{note}</span>
                </span>
            )}
            {indicator === 'down' && (
                <span
                    className="mb-12 inline-block text-sm font-semibold text-body"
                    style={{ color: '#FC6687' }}
                >
                    <IosArrowDown width="9px" height="11px" className="inline-block" />{' '}
                    {indicatorText}
                    <span className="text-sm font-normal text-body"> {note}</span>
                </span>
            )}
        </div>
        <div className="pl-8 flex w-full flex-col col-span-2 justify-center">
          <span className="mb-3 text-md font-normal opacity-65">
            {(titleTransKeySec)}
          </span>
          <span className="font-semibold text-4xl">
            {priceSec}
          </span>
          <span className="mt-4 text-sm font-normal text-body group-hover:text-gray-400">
            {noteSec}
          </span>
        </div>
      </div>
      {
        chart && (
        <div className='col-span-1 flex justify-center items-center'>
          <RadialBarChart parkingSize={parkingSize} currentSize={price}/>
        </div>
        )
      }
    </div>
    
  );
};

export default MainStickerCard;
