import * as yup from 'yup';
import Form from '@/components/ui/forms/form';
import { LoginInput } from '@/types';
import Link from '../ui/link';
import { Routes } from '@/config/routes';
import Input from '@/components/ui/input';
import PasswordInput from '../ui/password-input';
import Button from '../ui/button';
import { setAuthCredentials } from '@/utils/auth-utils';
import Router from 'next/router';
import { useLogin } from '@/data/user';
import { useState } from 'react';

const loginFormSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
})

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {mutate: login, isLoading, error} = useLogin();

    function onSubmit({ email, password }: LoginInput) {
        login(
            {
                email,
                password,
            },
            {
                onSuccess: (data) => {
                    if(data?.token) {
                        console.log(data)
                        // if (hasAccess(allowedRoles, data?.permissions)) {
                            setAuthCredentials(data?.token, data?.permissions, data?.role);
                            Router.push(Routes.dashboard);
                            return;
                        // }
                    } else {
                        setErrorMessage('Credential Wrong');
                    }
                },
                onError: () => {},
            }
        )
    }

    return (
        <>
            <Form<LoginInput> validationSchema={loginFormSchema} onSubmit={onSubmit} >
                {({ register, formState: { errors } }) => (
                    <>
                        <Input
                            label={('Email')}
                            {...register('email')}
                            type="email"
                            variant="outline"
                            className="mb-4"
                            styleType='type-2'
                            error={errors?.email?.message!}
                        />
                        <PasswordInput
                            label={('Password')}
                            forgotPassHelpText={'Forgot password?'}
                            {...register('password')}
                            error={errors?.password?.message!}
                            variant="outline"
                            className="mb-4"
                            styleType='type-2'
                            // forgotPageLink={Routes.forgotPassword}
                        />
                        <Button className="w-full" loading={false} disabled={false}>
                            {'Login'}
                        </Button>

                        {/* <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
                            <hr className="w-full" />
                            <span className="absolute -top-2.5 bg-light px-2 -ms-4 start-2/4">
                                {'Or'}
                            </span>
                        </div>

                        <div className="text-center text-sm text-body sm:text-base">
                            {"Don't have any account?"}{' '}
                            <Link
                                href={Routes.register}
                                className="font-semibold text-accent underline transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-700 focus:no-underline focus:outline-none"
                            >
                                {'Sign Up'}
                            </Link>
                        </div> */}
                    </>
                )}
            </Form>
            {/* {errorMessage ? (
                <Alert
                    message={errorMessage}
                    variant='error'
                    closeable={true}
                    className="mt-5"
                    onClose={() => setErrorMessage(null)}
                />
            ) : null} */}
        </>
    );
}

export default LoginForm;