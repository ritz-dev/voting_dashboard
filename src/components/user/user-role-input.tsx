import { Control } from "react-hook-form"
import SelectInput from "../ui/select-input";
import ValidationError from "../ui/form-validation-error";
import { useRolesQuery } from "@/data/role";
import { useMemo } from "react";
import { Role } from "@/types";

interface Props {
    control: Control<any>;
    error: string | undefined;
}

const UserRoleInput = ({ control, error}: Props) => {
    
    const { roles } = useRolesQuery({
        limit:200,
    });

    const roleOptions = useMemo(() => {
        return roles.map((role : Role)=> {
            return {
                label: role.name,
                value: String(role.id),
            }
        })
    },[roles]);

    return (
        <div className="mb-5">
            <SelectInput
                required={true}
                label={('Select Role')}
                name="role"
                control={control}
                options={roleOptions!}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
            />
            <ValidationError message={(error!)} />
        </div>
    )

}

export default UserRoleInput;