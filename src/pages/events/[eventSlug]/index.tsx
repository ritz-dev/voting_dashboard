
import CreateOrUpdateEventForm from '@/components/event/event-form';
import Layout from '@/components/layouts/admin';
import ErrorMessage from "@/components/ui/error-message";
import Loader from "@/components/ui/loader/loader";
import { Routes } from '@/config/routes';
import { useEventQuery } from '@/data/event';
import { getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from "next/router";

export default function DetailUser() {
    const { query } = useRouter();

    const { 
        event, 
        isLoading: loading, 
        error 
    } = useEventQuery({
        slug: query.eventSlug as string,
    });

    if(loading) return <Loader text={('Loading')} />;
    if(error) return <ErrorMessage message={error?.message as string} />;

    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Event Detail'}
                </h1>
            </div>
            <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            {/* Event Details */}
                <div className="mb-6 p-6 border-b border-dashed">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{event?.title}</h1>
                    <p className="text-gray-600 mb-6">{event?.description}</p>
                    <div className="text-gray-600">
                    <p className='mb-4'><span className="font-semibold">Start Date:</span> {dayjs(event?.startDate).format('MMMM D, YYYY')}</p>
                    <p><span className="font-semibold">End Date:</span> {dayjs(event?.endDate).format('MMMM D, YYYY')}</p>
                    </div>
                </div>

            {/* Candidates List */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Candidates</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {event?.candidate?.map((candidate: any, index: number) => (
                        <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                            {candidate.imageUrl ? (
                            <Image
                                src={candidate.imageUrl.url}
                                alt={candidate.imageUrl.alt}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                                N/A
                            </div>
                            )}
                            <div className='w-full flex justify-between'>
                                <p className="text-lg font-semibold text-gray-700">{candidate.name}</p>
                                <p className="text-gray-600 font-semibold pr-4">{candidate.vote_count} <span className='text-accent-600 ml-4'>Voted</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

DetailUser.authenticate = {
    permissions: [SUPER_ADMIN]
}

DetailUser.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const generateRedirectUrl = Routes.denied;  
    const {token, permissions} = getAuthCredentials(ctx);

    if(!isAuthenticated({token, permissions}) || !hasAccess([SUPER_ADMIN], permissions)) {
      return {
        redirect:{
          destination: generateRedirectUrl,
          permanent: false
        }
      };
    }
  
    return {
      props: {}
    }
}