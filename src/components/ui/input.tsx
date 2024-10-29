import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import TooltipLabel from "./tooltip-label";
import cn from 'classnames';


export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    label?: string;
    toolTipText?: string;
    note?: string;
    name: string;
    error?: string;
    type?: string;
    shadow?: boolean;
    placeholder?: string;
    styleType?: string;
    variant?: 'normal' | 'solid' | 'outline' | 'none';
    dimension?: 'small' | 'medium' | 'big';
    showLabel?: boolean;
    required?: boolean;
    max?: number | string;
    min?: number | string;
}

const classes = {
    root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
    normal: 'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
    solid: 'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
    outline: 'border border-border-base focus:border-accent',
    none: 'border-none',
    shadow: 'focus:shadow',
};

const sizeClasses = {
    small: 'text-sm h-10',
    medium: 'h-14',
    big: 'h-16',
}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            label,
            note,
            name,
            error,
            children,
            styleType = 'type-1',
            placeholder = '',
            variant = 'normal',
            dimension = 'medium',
            shadow = false,
            type = 'text',
            inputClassName,
            disabled,
            showLabel = true,
            required,
            toolTipText,
            max,
            min,
            ...rest
        },
        ref,
    ) => {
        const rootClassName = cn(
            classes.root,
            {
                [classes.normal]: variant === 'normal',
                [classes.solid]: variant === 'solid',
                [classes.outline]: variant === 'outline',
                [classes.none]: variant === 'none'                
            },
            {
                [classes.shadow]: shadow,
            },
            sizeClasses[dimension],
            inputClassName,
        );

        let numberDisable = type === 'number' && disabled ? 'number-disable' : '';

        return (
            <div className={twMerge("relative", className)}>
                {showLabel && (
                    <TooltipLabel
                        htmlFor={name}
                        toolTipText={toolTipText}
                        label={label}
                        required={required}
                        className={twMerge(
                            styleType === 'type-1' && "absolute -top-2 left-3 bg-white px-1 text-sm font-medium",
                            styleType === 'type-2' && "font-semibold leading-none text-body-dark text-lg",
                        )}
                    />
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    ref={ref}
                    className={`${rootClassName} ${
                        disabled ? `cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] ${numberDisable} select-none` : ''
                    }`}
                    placeholder={placeholder}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    disabled={disabled}
                    aria-invalid={error ? 'true' : 'false'}
                    {...(type === 'number' ? { max, min } : {})}
                    {...rest}
                />
                {note && <p className="mt-2 text-xs text-body">{note}</p>}
                {error && (
                    <p className="my-2 text-xs text-red-500 text-start">{error}</p>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
