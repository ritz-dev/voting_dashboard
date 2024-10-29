import { Checkbox } from "@headlessui/react";
import classNames from "classnames";
import { Control, Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import TooltipLabel from "./tooltip-label";
import ValidationError from "./form-validation-error";

interface Props {
    error?: string;
    name: string;
    [key: string]: unknown;
    required?: boolean;
    label?: string;
    toolTipText?: string;
    className?: string;
    value: boolean | undefined;
}

const CheckboxInput = ({
    label,
    name,
    error,
    required,
    toolTipText,
    className,
    value,
    ...rest
}: Props) => {
    const { control } = useFormContext();

    return (
        <>
            <div className={twMerge(classNames('flex items-center cursor-pointer', className))}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={value !== undefined ? value : false}
                    {...rest}
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            checked={value}
                            onChange={onChange}
                            className="group block size-5 rounded border border-base-dark bg-white data-[checked]:bg-accent"
                        >
                            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                      </Checkbox>
                    )}
                />
                {label ? (
                    <TooltipLabel
                        htmlFor={name}
                        className="mb-0"
                        toolTipText={toolTipText}
                        label={label}
                        required={required}
                    />
                ) : null}
            </div>
            {error ? <ValidationError message={error} /> : ''}
        </>
    );
}

export default CheckboxInput;