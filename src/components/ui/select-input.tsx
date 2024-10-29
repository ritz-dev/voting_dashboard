import TooltipLabel from '@/components/ui/tooltip-label';
import dynamic from 'next/dynamic';
import { twMerge } from "tailwind-merge";
import { Controller } from 'react-hook-form';
import { GetOptionLabel } from 'react-select';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: {
    label: string | number;
    value: string | number;
  }[];
  getOptionLabel?: GetOptionLabel<unknown>;
  getOptionValue?: GetOptionLabel<unknown>;
  isMulti?: boolean;
  isClearable?: boolean;
  border?: boolean;
  hideDropdownIndicator?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  [key: string]: unknown;
  placeholder?: string;
  required?: boolean;
  label?: string;
  toolTipText?: string;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  border= true,
  hideDropdownIndicator = false,
  disabled,
  isMulti,
  isClearable,
  isLoading,
  placeholder,
  label,
  required,
  toolTipText,
  ...rest
}: SelectInputProps) => {

  const labelClasses = `text-sm font-medium ${label === 'space' ? 'opacity-0' : ''}`;

  const Select = dynamic(() => import('@/components/ui/select/select'), { ssr: false });

  return (
    <div className="relative w-full"> 
      {label && (
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
          className={twMerge(
            "absolute -top-2 left-3 bg-white px-1 text-xs z-10",
            labelClasses
        )}
        />
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        {...rest}
        render={({ field }) => (
          <Select
            {...field}
            border={border}
            hideDropdownIndicator={hideDropdownIndicator}
            value={options.find(option => option.value === field.value) || ''}
            onChange={(selectedOption) => field.onChange((selectedOption as any)?.value || '')}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            placeholder={placeholder}
            isMulti={isMulti}
            isClearable={isClearable}
            isLoading={isLoading}
            options={options}
            isDisabled={disabled as boolean}
          />
        )}
      />
    </div>
  );
};

export default SelectInput;
