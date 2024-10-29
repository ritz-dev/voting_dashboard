import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const TownshipSelector = ({ control, error}: Props) => {
    const options = [
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
        {
            label:'THAGAKA',
            value:'THAGAKA',
        },
    ]

    return (
        <div className="w-[28%]">
            <SelectInput
                required={true}
                label={('space')}
                name="nrc.code_Two"
                control={control}
                options={options!}
                border={false}
                hideDropdownIndicator={true}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
            />
            {
              error && ( <ValidationError message={(error!)} />)  
            }
            
        </div>
    )

}

export default TownshipSelector;
