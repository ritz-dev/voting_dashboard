import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const BloodTypeSelector = ({ control, error}: Props) => {
    const options = [
        {
            label:'A',
            value:'A',
        },
        {
            label:'B',
            value:'B',
        },
        {
            label:'AB',
            value:'AB',
        },
        {
            label:'O',
            value:'O',
        },
    ]

    return (
        <div>
            <SelectInput
                required={true}
                label={('Blood Type')}
                name="blood_type"
                control={control}
                options={options!}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
            />
            {
                error && ( <ValidationError message={(error!)} /> )
            }
        </div>
    )

}

export default BloodTypeSelector;
