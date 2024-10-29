import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const ClassLevelSelector = ({ control, error}: Props) => {
    const options = [
        { label: 'Primary 1', value: 'primary-1' },
        { label: 'Primary 2', value: 'primary-2' },
        { label: 'Primary 3', value: 'primary-3' },
        { label: 'Primary 4', value: 'primary-4' },
        { label: 'Primary 5', value: 'primary-5' },
        { label: 'Primary 6', value: 'primary-6' },
        { label: 'Secondary 1', value: 'secondary-1' },
        { label: 'Secondary 2', value: 'secondary-2' },
        { label: 'Secondary 3', value: 'secondary-3' },
        { label: 'Secondary 4', value: 'secondary-4' },
        { label: 'High School 1', value: 'high-school-1' },
        { label: 'High School 2', value: 'high-school-2' },
        { label: 'High School 3', value: 'high-school-3' },
      ];

    return (
        <div>
            <SelectInput
                required={true}
                label={('Academic Level')}
                name="academic_level"
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

export default ClassLevelSelector;
