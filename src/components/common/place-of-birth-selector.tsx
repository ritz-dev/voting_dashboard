import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const PlaceOfBirthSelector = ({ control, error}: Props) => {
    const options = [
        {
            label:'Yangon',
            value:'Yangon',
        },
        {
            label:'Mandalay',
            value:'Mandalay',
        },
        {
            label:'TaungGyi',
            value:'TaungGyi',
        },
        {
            label:'Pyay',
            value:'Pyay',
        },
    ]

    return (
        <div>
            <SelectInput
                required={true}
                label={('Place Of Birth')}
                name="pob"
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

export default PlaceOfBirthSelector;
