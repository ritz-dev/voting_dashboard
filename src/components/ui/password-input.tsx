import React, { InputHTMLAttributes, useState } from "react";
import cn from 'classnames';
import Link from "./link";
import { EyeOff } from "../icons/eye-off-icon";
import { Eye } from "../icons/eye-icon";
import { twMerge } from "tailwind-merge";
import TooltipLabel from "./tooltip-label";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    forgotPassHelpText?: string;
    label: string;
    name: string;
    forgotPageLink?: string;
    shadow?: boolean;
    variant?: 'normal' | 'solid' | 'outline';
    error?: string | undefined;
    styleType?: string;
    required?: boolean;
}

const classes = {
    root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
    normal:
      'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
    solid:
      'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
    outline: 'border border-border-base focus:border-accent',
    shadow: 'focus:shadow',
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            inputClassName,
            forgotPassHelpText,
            label,
            name,
            error,
            children,
            variant = 'normal',
            shadow = false,
            type = 'text',
            forgotPageLink = '',
            required,
            styleType="type-1",
            ...rest
        },
        ref
    ) => {
        const [show, setShow] = useState(false);

        const rootClassName = cn(
            classes.root,
            {
                [classes.normal]: variant === 'normal',
                [classes.solid]: variant === 'solid',
                [classes.outline]: variant === 'outline',
            },
            shadow == true && classes.shadow,
            inputClassName
        );

        return (
            <div className={twMerge("relative", className)}>
                <TooltipLabel
                    htmlFor={name}
                    label={label}
                    required={required}
                    className={twMerge(
                        styleType === 'type-1' && "absolute -top-2 left-3 bg-white z-50 px-1 text-sm font-medium",
                        styleType === 'type-2' && "font-semibold leading-none text-body-dark text-lg",
                    )}
                />
                <div className="relative">
                    <input
                        id={name}
                        name={name}
                        type={show ? 'text' : 'password'}
                        ref={ref}
                        className={rootClassName}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        {...rest}
                    />
                    <label
                        htmlFor={name}
                        className="absolute top-5 -mt-2 text-body end-4"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        {show ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </label>
                </div>
                {error && (
                    <p className="my-2 text-xs text-red-500 text-start">{error}</p>
                )}
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;