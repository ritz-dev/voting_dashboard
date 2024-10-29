import { useAnalyticsQuery } from "@/data/dashboard";
import { ShoppingIcon } from "../icons/summary/shopping";
import StickerCard from "../widgets/sticker-car";
import usePrice from "@/utils/use-price";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PenaltyVehicle = dynamic(
    () => import('@/components/dashboard/widgets/table/widget-penalty-vehicle'),
);

export default function Dashboard () {

    const [currentDate, setCurrentDate] = useState<number>(new Date().getFullYear());
    const [page, setPage] = useState(1);

    // const { data: analytiscData } = useAnalyticsQuery();
    // const { records,paginatorInfo} = usePenaltyVehicleQuery({
    //     limit: 6,
    //     page,
    // });
    // const { monthlyIncome , refetch } = useMonthlyIncome({
    //     year: currentDate
    // });
    // const { yearlyIncome } = useYearlyIncome();

    // const {price: total_charge} = usePrice(
    //     analytiscData && {
    //         amount: analytiscData?.dailyTotalRecord?.totalCharge
    //     }
    // );

    function handlePagination(current:any) {
        setPage(current);
    }

    // useEffect(()=>{
    //     refetch();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[currentDate]);

    return (
        <>
            <div className="grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12">
                <div className="col-span-full rounded-lg bg-light p-6 md:p-7">
                    <div className="mb-5 flex justify-between md:mb-7">
                        <h3 className="relative mt-1 bg-light text-2xl font-semibold text-accent-hover">
                            {'BEST PERFORMANCE STAFF VOTE'}
                        </h3>
                    </div>
                    {/* <div className="grid w-full gap-5 grid-cols-1 2xl:grid-cols-3">
                        <StickerCard
                            titleTransKey="Daily Total Entry"
                            icon={<ShoppingIcon className="h-8 w-8" />}
                            price={0}
                        />
                        <StickerCard
                            titleTransKey="Daily Total Entry"
                            icon={<ShoppingIcon className="h-8 w-8" />}
                            price={0}
                        />
                        <StickerCard
                            titleTransKey="Daily Total Entry"
                            icon={<ShoppingIcon className="h-8 w-8" />}
                            price={0}

                        />
                        <StickerCard
                            titleTransKey="Daily Total Entry"
                            icon={<ShoppingIcon className="h-8 w-8" />}
                            price={0}

                        />
                        <StickerCard
                            titleTransKey="Daily Total Entry"
                            icon={<ShoppingIcon className="h-8 w-8" />}
                            price={0}
                        />
                    </div> */}
                </div>
            </div>
        </>
    )
}