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
import { useCreateEventMutation, useUpdateEventMutation } from "@/data/event";
import { useUserQuery, useUsersQuery } from "@/data/user";

type FormValues = {
    slug: string;
    title: string;
    description: any;
    startDate: Date;
    endDate: Date;
    candidate: string[];    
    status: string;
}

const DEFAULT_EVEMT = {
    title:'',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    status:'upcoming'
}

type IProps = {
    initialValues?: Event | undefined;
};

const CreateOrUpdateEventForm = ({ initialValues }:  IProps ) => {

    const router = useRouter();

    const { mutate: createEvent, isLoading: creating } = useCreateEventMutation();
    const { mutate: updateEvent, isLoading: updating } = useUpdateEventMutation();

    const { users, loading, error} = useUsersQuery({});

    // const { permissions } = getAuthCredentials();
    
    const methods= useForm<FormValues>({
            defaultValues: initialValues
                ? {
                    ...initialValues,
                }
                : DEFAULT_EVEMT,
            //@ts-ignore
            resolver: yupResolver(eventValidationSchema),
            shouldUnregister: true
    });

    const {handleSubmit, register, formState: { errors },control} = methods;
    
    const onSubmit = async (values: FormValues) => {

        if(initialValues) {
            updateEvent({
                id: initialValues.id,
                ...values,
            });
        } else {
            createEvent({
                ...values,
            })
        }
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
                                name="startDate"
                            />
                            <DatePickerInput 
                                label="End Date"
                                control={control}
                                required={true}
                                name="endDate"
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
                            {
                                users?.map((user,index)=>{
                                    return (
                                        <CandidateCard user={user} key={index}/>
                                    )
                                })
                            }
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
                                        {('Update Event')}
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