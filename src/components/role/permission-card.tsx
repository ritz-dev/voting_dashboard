import Card from "../common/card";
import PageHeading from "../common/page-heading";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Checkbox, Switch } from "@headlessui/react";


interface Props {
    title: string;
    name?: string;
    permissionList: {
        label: string;
        name: string;
    }[]
}

const PermissionCard = ({
    title,
    name = 'permissions',
    permissionList,
} : Props ) => {

    const { setValue, control } = useFormContext();
    const [isAllChecked, setIsAllChecked] = useState(false);

    const permissionsGroup = useWatch({
        name: `permissions`,
        control
    });

    useEffect(()=> {
        const allChecked = permissionList.every(permission => permissionsGroup.includes(permission.name));
        setIsAllChecked(allChecked);
    }, [permissionsGroup,permissionList]);

    const handelToggleAll = (checked : boolean) => {

        if(checked) {
            const newPermissions = [
                ...permissionsGroup,
                ...permissionList.filter(
                    (permission) => !permissionsGroup.includes(permission.name)
                ).map(permission => permission.name)
            ]
            
            setValue('permissions', newPermissions);
        } else {
            const newPermissions = permissionsGroup.filter(
                (permission : string) => !permissionList.some(p => p.name === permission)
            );
            setValue('permissions', newPermissions);
        }
    };

    const handleCheckboxChange = (value: string) => {
        const currentPermissions = permissionsGroup;
        const newPermissions = currentPermissions?.includes(value)
            ? currentPermissions.filter((p: string) => p !== value)
        : [...currentPermissions, value];

        setValue('permissions', newPermissions);
    }

    return (
        <Card>
            <div className="mb-8 flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/2">
                    <PageHeading title={title} />
                </div>
                <div className="ml-auto">
                    <Switch
                        checked={isAllChecked}
                        onChange={(checked) => handelToggleAll(checked)}
                        disabled={false}
                        className={`${
                            isAllChecked ? 'bg-accent' : 'bg-gray-300'
                        } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
                            false ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
                        }`}
                        id={name}
                    >
                        <span className="sr-only">Enable</span>
                            <span
                                className={`${
                                    isAllChecked ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
                            />
                    </Switch>
                </div>
            </div>
            <div className="p-4 rounded">
                <ul className="list-disc list-outside space-y-2 text-gray-800 select-none">
                    {
                        permissionList?.map((permission,index)=>{
                            return (
                                <li className="font-medium" key={index}>
                                    <div className="flex justify-between">
                                        <span className="w-5/6 text-sm">{permission.label}</span>
                                        <Controller
                                            name={name}
                                            control={control}
                                            render={() => (
                                                <Checkbox
                                                    checked={permissionsGroup.includes(permission.name)}
                                                    onChange={() => handleCheckboxChange(permission.name)}
                                                    className="group block size-5 rounded border border-base-dark bg-white data-[checked]:bg-accent"
                                                >
                                                    <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Checkbox>
                                            )}
                                        />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>                            
        </Card>
    )
}

export default PermissionCard;