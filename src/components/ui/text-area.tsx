import TooltipLabel from '@/components/ui/tooltip-label';
import { default as classNames, default as cn } from 'classnames';
import React, { TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  toolTipText?: string;
  label?: string;
  name: string;
  error?: string;
  placeholder?: string;
  styleType?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline' | 'none';
  disabled?: boolean;
}

const classes = {
  root: 'py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 h-20',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  none: 'border-none',
  shadow: 'focus:shadow',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    className,
    label,
    toolTipText,
    name,
    error,
    placeholder = '',
    styleType = 'type-1',
    variant = 'normal',
    shadow = false,
    inputClassName,
    disabled,
    required,
    ...rest
  } = props;

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
    inputClassName,
  );

  return (
    <div className={twMerge("relative",className)}>
      {label && (
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
      <textarea
        id={name}
        name={name}
        className={twMerge(
          classNames(
            rootClassName,
            disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : '',
          ),
        )}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        disabled={disabled}
        {...rest}
      />
      {error && (
        <p className="my-2 text-xs text-red-500 ltr:text-left rtl:text-right">
          {error}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
