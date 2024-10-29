import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const EventStatusInput = ({ control, error}: Props) => {
    
    const Options = [
        {
            label: 'upcoming',
            value: 'upcoming'
        },
        {
            label: 'ongoing',
            value: 'ongoing'
        },
        {
            label: 'completed',
            value: 'completed'
        }
    ];

    return (
        <div className="mb-5 mt-8">
            <SelectInput
                required={true}
                label={('Select Status')}
                name="status"
                control={control}
                options={Options!}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
            />
            <ValidationError message={(error!)} />
        </div>
    )

}

export default EventStatusInput;