import Card from "../common/card";
import PageHeading from "../common/page-heading";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Checkbox, Switch } from "@headlessui/react";
import { User } from "@/types";


interface Props {
    user: User;
    name?: string;
}

const CandidateCard = ({
    user,
    name = 'candidates',
} : Props ) => {

    const { setValue, control } = useFormContext();

    const candidatesGroup = useWatch({
        name: `candidates`,
        control
    });

    const [isEnabled, setIsEnabled] = useState(
        candidatesGroup?.includes(user.id) || false
    );

    const handleToggle = (checked: boolean) => {
        const currentCandidates = candidatesGroup || [];
    
        if (checked) {
            const newCandidates = [...currentCandidates, user.id];
            setValue('candidates', newCandidates);
        } else {
            const newCandidates = currentCandidates.filter((id: string) => id !== user.id);
            setValue('candidates', newCandidates);
        }

        setIsEnabled(checked);
    };

    return (
        <div className="flex flex-col md:flex-row border-dashed border border-gray-300 p-3">
            <div className="md:w-1/2">
                <span>{user.name}</span>
            </div>
            <div className="ml-auto">
                <Switch
                    checked={isEnabled}
                    onChange={(checked) => handleToggle(checked)}
                    disabled={false}
                    className={`${
                        isEnabled ? 'bg-accent' : 'bg-gray-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
                        false ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
                    }`}
                    id={name}
                >
                    <span className="sr-only">Enable</span>
                        <span
                            className={`${
                                isEnabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
                        />
                </Switch>
            </div>
        </div>               
    )
}

export default CandidateCard;