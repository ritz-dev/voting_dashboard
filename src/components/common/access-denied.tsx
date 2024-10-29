import Image from "next/image";
import Link from "next/link";

const AccessDeniedPage = () => {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
                <span className="text-center">
                    <div className="text-md font-bold text-sub-heading lg:text-8xl">
                        {'403'}
                    </div>
                    <span className="mt-5 text-md font-bold text-sub-heading sm:mt-10 lg:text-2xl">
                    {'Forbidden'}
                </span>
                <p className="mt-2 text-center text-sm text-body lg:text-md">
                {'Access to this resource on the server is denied!'}
                    <Link
                        href="/"
                        className="ml-3 text-accent transition-colors ps-1 hover:text-accent-hover"
                    >
                        {'Return Home'}
                    </Link>
                </p>
                </span>
            </div>
        </>
        
    )
}

export default AccessDeniedPage;