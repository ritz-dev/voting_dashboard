import { twMerge } from "tailwind-merge";
import Label from "./label";
import { Tooltip } from "./tooltip";
import { InfoIcon } from "../icons/info-icon";


interface Props {
    className?: string;
    htmlFor?: string;
    label?: string;
    toolTipText?: string;
    required?: boolean;
}

const TooltipLabel = ({
    className,
    required,
    label,
    toolTipText,
    htmlFor,
}: Props) => {
    return(
        <Label className={twMerge(className)} htmlFor={htmlFor}>
            {label}
            {required ? <span className="ml-0.5 text-red-500">*</span> : ''}
            {toolTipText ? (
                <Tooltip content={toolTipText}>
                    <span className="ltr:ml-1 rtl:mr-1 text-base-dark/40 shrink-0">
                        <InfoIcon className="w-3.5 h-3.5" />
                    </span>
                </Tooltip>
            ) : (
                ''
            )}
        </Label>
    )
}

export default TooltipLabel;