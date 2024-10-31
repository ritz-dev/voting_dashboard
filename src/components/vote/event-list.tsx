import { useUser } from "@/contexts/me.context";
import StickerCard from "../widgets/sticker-car";

export default function EventList({ events }: { events: any }) {
    const { user,userVoted } = useUser();

    return (
        <>
            {events.status === 'completed' ? (
                <div className="text-base-dark/80">This event is already finished.</div>
            ) : events.status === 'upcoming' ? (
                <div className="text-base-dark/80">This event is coming soon.</div>
            ) : (
                <div className="grid w-full gap-5 grid-cols-1 2xl:grid-cols-3">
                    {events.candidate?.map((candi: any, index: number) => {

                        const isMatch =  Array.isArray(userVoted) ? userVoted?.filter((vote: any)=> vote.event_id === events.id).some((item:any) => item.candidate_id === candi.id) : false;

                        return(
                            <StickerCard
                                key={index}
                                event_id={events.id}
                                candidateInfo={candi}
                                user_id={user?.id || ''}
                                active={isMatch}
                            />
                        )})}
                </div>
            )}
        </>
    );
}
