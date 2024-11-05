import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { userValidationSchema } from "./user-validation-schema";
import { useRegisterMutation, useUpdateUserMutation } from "@/data/user";
import Card from "@/components/common/card";
import Input from "../ui/input";
import Description from "../ui/description";
import PasswordInput from "../ui/password-input";
import FileInput from "../ui/file-input";
import StickyFooterPanel from "../ui/sticky-footer-panel";
import Button from "../ui/button";
import { Attachment, User } from "@/types";
import UserRoleInput from "./user-role-input";
import { UpdateIcon } from "../icons/update";
import { useRouter } from "next/router";

type FormValues = {
    name: string;
    email: string;
    password: string;
    imageUrl: Attachment | null;
    role: string;
    isActive: boolean;
}

const DEFAULT_USER = {
    name: '',
    email: '',
    password: '',
    imageUrl: null,
    role: '',
    isActive: true
}

type IProps = {
    initialValues?: User | undefined;
}

const UserCreateOrUpdateForm = ({ initialValues }: IProps) => {
    const router = useRouter();

    const { mutate: registerUser, isLoading: creating} = useRegisterMutation();
    const { mutate: updateUser, isLoading: updating} = useUpdateUserMutation();

    const methods= useForm<FormValues>({
        defaultValues: initialValues ? {
            name: initialValues.name,
            email: initialValues.email,
            password: '',
            imageUrl: initialValues.imageUrl,
            role: String(initialValues.role),
            isActive: Boolean(initialValues.isActive)
        } : DEFAULT_USER,
        resolver: yupResolver(userValidationSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = methods;

    const onSubmit = async (values : FormValues) => {
        console.log(values);
        if(initialValues){
            updateUser({
                id: initialValues.id,
                ...values,
            })
        } else {
            registerUser(
                values,
            )
        }   
    }

    console.log(getValues());

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Avatar'}
                        details={
                        <>
                            <span>Upload your profile image from here.</span><br/>
                            <span>Dimension of the avatar should be <span className="font-bold text-base">140 x 140px</span>.</span>
                        </>
                    }
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <FileInput name="imageUrl" control={control} multiple={false} />
                    </Card>
                </div>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Information'}
                        details={'Add your profile information from here'}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />
                    <Card className="w-full mb-5 sm:w-8/12 md:w-2/3 mt-8">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Input
                                label={('Name')}
                                {...register('name')}
                                error={(errors.name?.message!)}
                                variant="outline"
                                className="mb-5"
                                required
                            />
                            <Input
                                label={('Email')}
                                {...register('email')}
                                error={(errors.email?.message!)}
                                variant="outline"
                                className="mb-5"
                                required
                            />
                            <PasswordInput
                                label={('Password')}
                                {...register('password')}
                                variant="outline"
                                error={(errors.password?.message!)}
                                className="mb-5"
                                required
                            />
                            <UserRoleInput
                                control={control}
                                error={(errors.role?.message!)}
                            />
                        </div>
                    </Card>
                </div>
                <StickyFooterPanel className="z-0">
                    <div className="mb-5 text-end">
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
                                        {('Update')}
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

export default UserCreateOrUpdateForm;
