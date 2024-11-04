import { useEventsQuery } from "@/data/event";
import EventList from "../vote/event-list";
import { useMyVoteQuery } from "@/data/vote";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/contexts/me.context";

export default function Dashboard () {
    const { user,setUserVoted } = useUser();
    const { events } = useEventsQuery({});
    const { mutate: myVoted } = useMyVoteQuery();

    const { handleSubmit, formState: { errors } } = useForm<{user_id: string}>();

    const onSubmit = () => {
        myVoted(
            {
                user_id: user?.id || ''
            },
            {
                onSuccess: (data) => {
                    setUserVoted(data);
                },
                onError: () => {
                    // handle error
                },
            }
        );
    };

    console.log(events)

    useEffect(() => {
        onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12">
                {
                    events?.map((event,index)=>{
                        return(
                            <div className="col-span-full rounded-lg bg-light p-6 md:p-7" key={index}>
                                <div className="mb-5 flex justify-between md:mb-7">
                                    <h3 className="relative mt-1 bg-light text-2xl font-semibold text-accent-hover">
                                        {event.title}
                                    </h3>
                                </div>
                                <EventList events={event}/>
                            </div>
                        )
                    })
                }
            </div>
        </form>
    )
}