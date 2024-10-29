import Label from '@/components/ui/label';
import cn from 'classnames';
import { ActionMeta } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


type Props = {
  onRecordsFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  className?: string;
  startDate?: Date | null;
  endDate?: Date | null; 
  type?: string;
  enableType?: boolean;
  enableRecord?: boolean;
  onDateFilter?: (dates: [Date | null, Date | null]) => void;
};

export default function RecordsTypeFilter({
  className,
  startDate,
  endDate,
  enableRecord,
  onDateFilter
}: Props) {

  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0',
        className,
      )}
    >
      {enableRecord ? (
        <div>
          <Label className='text-gray-800'>{('From Date - To Date')}</Label>
          <DatePicker
            // @ts-ignore
            selected={startDate ? startDate : null}
            startDate={startDate ? startDate : undefined}
            onChange={onDateFilter}
            selectsRange
            endDate={endDate ? endDate : undefined}
            dateFormat="MM/dd/yyyy"
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
