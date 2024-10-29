import ValidationError from '@/components/ui/form-validation-error';
import TooltipLabel from '@/components/ui/tooltip-label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';

interface DatePickerInputProps {
  control: any;
  minDate?: Date;
  maxDate?: Date;
  endDate?: Date;
  startDate?: Date;
  locale?: string;
  disabled?: boolean;
  placeholder?: string;
  todayButton?: string;
  name: string;
  label?: string;
  toolTipText?: string;
  required?: boolean;
  error?: string;
  dateFormat?: string; // Allow custom date format
  className?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  control,
  minDate,
  startDate,
  locale,
  disabled,
  placeholder = 'Select Date',
  todayButton = 'Today',
  name,
  label,
  toolTipText,
  required,
  error,
  dateFormat = "d MMMM, yyyy", // Set default date format to display month as text
  className,
  maxDate,
  endDate,
  ...rest
}) => {
  const labelClasses = 'text-sm font-medium';

  return (
    <div className="relative w-full"> {/* Added relative container */}
      {label && (
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
          className={`${labelClasses} absolute -top-2 left-3 bg-white px-1 z-50`} 
          /* Absolute position with slight offset and background */
        />
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            minDate={minDate}
            closeOnScroll={(e) => e.target === document}
            // @ts-ignore
            selected={field?.value ? new Date(field?.value) : null}
            startDate={startDate ? new Date(startDate) : undefined}
            locale={locale}
            todayButton={todayButton}
            placeholderText={placeholder}
            disabled={disabled}
            dateFormat={dateFormat}
            maxDate={maxDate}
            endDate={endDate}
            {...rest}
          />
        )}
      />
      {error && <ValidationError message={error} />}
    </div>
  );
};

export default DatePickerInput;
