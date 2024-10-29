import { forwardRef, InputHTMLAttributes } from "react";
import { Controller } from "react-hook-form";
import TooltipLabel from "./tooltip-label";
import { twMerge } from "tailwind-merge";
import cn from 'classnames';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/material.css';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    label?: string;
    note?: string;
    name: string;
    error?: string;
    type?: string;
    toolTipText?: string;
    showLabel?: boolean;
    required?: boolean;
    control: any;
}

const PhoneNumberInput= forwardRef<HTMLInputElement, Props>(
    ({
    label,
    required,
    showLabel = true,
    error,
    className,
    inputClassName,
    toolTipText,
    disabled,
    note,
    name,
    control,
    ...rest
},ref) => {

    const labelClasses = 'text-sm font-medium'

    return (
        <div className={twMerge(cn('relative', className))}>
            <Controller
                render={({ field: { onChange, value } }) => (
                <>
                    {showLabel ? (
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
                    ) : (
                    ''
                    )}
                    <PhoneInput
                        country="mm" 
                        value={value}
                        onChange={onChange}
                        inputClass={twMerge(
                            cn(
                            'p-0 !pe-4 !ps-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-14',
                            disabled
                                ? 'cursor-not-allowed !border-[#D4D8DD] !bg-[#EEF1F4] select-none'
                                : '',
                            inputClassName,
                            ),
                        )}
                        dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
                        aria-invalid={error ? 'true' : 'false'}
                        disabled={disabled}
                        specialLabel=""
                        countryCodeEditable={true}
                    />
                </>
                )}
                id={name}
                name={name}
                control={control}
                {...rest}
            />
            {note && <p className="mt-2 text-xs text-body">{note}</p>}
            {error && <p className="my-2 text-xs text-red-500 text-start">{error}</p>}
        </div>
    );
});

PhoneNumberInput.displayName = 'PhoneNumberInput';

export default PhoneNumberInput;