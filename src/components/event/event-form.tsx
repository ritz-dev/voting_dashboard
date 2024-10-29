import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateRoleMutation, useUpdateRoleMutation } from "@/data/role";
import Description from "../ui/description";
import Card from "../common/card";
import Input from "../ui/input";
import StickyFooterPanel from "../ui/sticky-footer-panel";
import Button from "../ui/button";
import TextArea from "../ui/text-area";
import { Event } from "@/types";
import { UpdateIcon } from "../icons/update";
import { useRouter } from "next/router";
import { accessPermissions } from "@/utils/permission-utils";
import PermissionCard from "../role/permission-card";
import { eventValidationSchema } from "./event-validation-scheme";
import DatePickerInput from "../ui/date-picker-range";
import CandidateCard from "./candidate-card";
import EventStatusInput from "./event-status-input";

type FormValues = {
    slug: string;
    title: string;
    description: any;
    candidates: string[];    
    status: string;
}

const DEFAULT_EVEMT = {
    title:'',
    description: '',
    candidates:[],
    status:'upcoming'
}

type IProps = {
    initialValues?: Event | undefined;
};

const CreateOrUpdateEventForm = ({ initialValues }:  IProps ) => {

    const router = useRouter();

    const { mutate: createRole, isLoading: creating } = useCreateRoleMutation();
    const { mutate: updateRole, isLoading: updating } = useUpdateRoleMutation();


    const user = {
        name: 'Aung Kyaw Thu',
        email: 'aungkyawthu@ritz.com.mm',
        id: '213213',
        imageUrl: {
            thumbnail: '',
            original: '',
            id: 0,
            file_name: '',
        },
        role: 'admin'
    }
    
    // const { permissions } = getAuthCredentials();
    
    const methods= useForm<FormValues>({
            defaultValues: initialValues
                ? {
                    ...initialValues
                }
                : DEFAULT_EVEMT,
            //@ts-ignore
            resolver: yupResolver(eventValidationSchema),
            shouldUnregister: true
    });

    const {handleSubmit, register, formState: { errors },control} = methods;
    
    const onSubmit = async (values: FormValues) => {

        const input = {
            ...values,
            description: values.description === undefined ? null : values.description
        }

        // if(initialValues) {
        //     updateRole({
        //         id: initialValues.id,
        //         ...input,
        //     });
        // } else {
        //     createRole({
        //         ...input,
        //     })
        // }
    }
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Basic Info'}
                        details={'Add some basic info about event from here'}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />
                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <Input
                            label={'Title'}
                            {...register('title')}
                            variant="outline"
                            className="mb-5"
                            error={errors.title?.message!}
                            required
                        />
                        <TextArea
                            label={('Description')}
                            {...register('description')}
                            variant="outline"
                        />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-5">
                            <DatePickerInput 
                                label="Start Date"
                                control={control}
                                required={true}
                                name="dob"
                            />
                            <DatePickerInput 
                                label="End Date"
                                control={control}
                                required={true}
                                name="dob"
                            />
                        </div>
                        <EventStatusInput
                            control={control}
                            error={(errors.status?.message!)}
                        />
                    </Card>
                </div>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Candidates'}
                        details={'choose candidate person from here'}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />
                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mt-5">
                            {/* <CandidateCard user={user}/>
                            <CandidateCard user={user}/>
                            <CandidateCard user={user}/>
                            <CandidateCard user={user}/> */}
                        </div>
                    </Card>
                </div>
                <StickyFooterPanel className="z-0">
                    <div className="text-end">
                    {initialValues && (
                            <Button
                            variant="outline"
                            onClick={router.back}
                            className="text-sm me-4 md:text-base"
                            type="button"
                            >
                            {('Back')}
                            </Button>
                        )}
                        <Button
                            loading={creating || updating}
                            disabled={creating || updating}
                            size="medium"
                            className="text-sm md:text-base"
                        >
                            {initialValues ? (
                                <>
                                    <UpdateIcon className="w-5 h-5 shrink-0 mr-2" />
                                    <span className="sm:hidden">
                                        {('Update')}
                                    </span>
                                    <span className="hidden sm:block">
                                        {('Update Role')}
                                    </span>
                                </>
                                ) : ('Save')}
                        </Button>
                    </div>
                </StickyFooterPanel>
            </form>
        </FormProvider>
    )
}

export default CreateOrUpdateEventForm;