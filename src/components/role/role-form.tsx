import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { roleValidationSchema } from "./role-validation-scheme";
import { useCreateRoleMutation, useUpdateRoleMutation } from "@/data/role";
import Description from "../ui/description";
import Card from "../common/card";
import Input from "../ui/input";
import PermissionCard from "./permission-card";
import StickyFooterPanel from "../ui/sticky-footer-panel";
import Button from "../ui/button";
import TextArea from "../ui/text-area";
import { Role } from "@/types";
import { UpdateIcon } from "../icons/update";
import { useRouter } from "next/router";
import { accessPermissions } from "@/utils/permission-utils";



type FormValues = {
    slug: string;
    name: string;
    description: any;
    permissions: string[];    
}

const DEFAULT_ROLE = {
    name:'',
    description: '',
    permissions:[]
}

type IProps = {
    initialValues?: Role | undefined;
};

const CreateOrUpdateRoleForm = ({ initialValues }:  IProps ) => {

    const router = useRouter();

    const { mutate: createRole, isLoading: creating } = useCreateRoleMutation();
    const { mutate: updateRole, isLoading: updating } = useUpdateRoleMutation();
    
    // const { permissions } = getAuthCredentials();
    
    const methods= useForm<FormValues>({
            defaultValues: initialValues
                ? {
                    ...initialValues
                }
                : DEFAULT_ROLE,
            //@ts-ignore
            resolver: yupResolver(roleValidationSchema),
            shouldUnregister: true
    });

    const {handleSubmit, register, formState: { errors }} = methods;
    
    const onSubmit = async (values: FormValues) => {

        const input = {
            ...values,
            description: values.description === undefined ? null : values.description
        }

        if(initialValues) {
            updateRole({
                id: initialValues.id,
                ...input,
            });
        } else {
            createRole({
                ...input,
            })
        }
    }
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Basic Info'}
                        details={'Add some basic info about role from here'}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />
                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <Input
                            label={'Name'}
                            {...register('name')}
                            variant="outline"
                            className="mb-5"
                            error={errors.name?.message!}
                            required
                        />
                        <TextArea
                            label={('Description')}
                            {...register('description')}
                            variant="outline"
                        />
                    </Card>
                </div>
                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    <PermissionCard
                        title={'Role'}
                        permissionList={accessPermissions.filter(permission => permission.name.startsWith('role'))}
                    />
                    <PermissionCard
                        title={'User'}
                        permissionList={accessPermissions.filter(permission => permission.name.startsWith('user'))}
                    />
                    <PermissionCard
                        title={'Member Card'}
                        permissionList={accessPermissions.filter(permission => permission.name.startsWith('mcard'))}
                    />
                    <PermissionCard
                        title={'Member Vehicle'}
                        permissionList={accessPermissions.filter(permission => permission.name.startsWith('mvehicle'))}
                    />
                    <PermissionCard
                        title={'Vehicle Class'}
                        permissionList={accessPermissions.filter(permission => permission.name.startsWith('fee'))}
                    />
                    <PermissionCard
                        title={'Card Record'}
                        permissionList={accessPermissions.filter(permission => permission.name.startsWith('cardRecord'))}
                    />
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

export default CreateOrUpdateRoleForm;