import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const GenderSelector = ({ control, error}: Props) => {
    const options = [
        {
            label:'Male',
            value:'male',
        },
        {
            label:'Female',
            value:'female',
        },
        {
            label:'Other',
            value:'other',
        },
    ]

    return (
        <div>
            <SelectInput
                required={true}
                label={('Select Gender')}
                name="gender"
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

export default GenderSelector;
