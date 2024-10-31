import { Event, MappedPaginatorInfo, SortOrder, User } from "@/types"
import { useState } from "react";
import Pagination from "../ui/pagination";
import Table from "rc-table";
import { NoDataFound } from "../icons/no-data-found";
import { AlignType } from "../ui/table";
import LanguageSwitcher from "../ui/lang-action/action";
import { Routes } from "@/config/routes";
import Badge from "../ui/badge/badge";
import Loader from "../ui/loader/loader";
import { getAuthCredentials } from "@/utils/auth-utils";
import { SUPER_ADMIN } from "@/utils/constants";
import { useRouter } from "next/router";

type IProps = {
    events: Event[];
    paginatorInfo: MappedPaginatorInfo | null;
    onPagination: (current: number) => void;
    onSort: (current: any) => void;
    onOrder: (current: string) => void;
    loading: boolean
}

const EventList = ({
    events,
    paginatorInfo,
    onPagination,
    onSort,
    onOrder,
    loading
}: IProps) => {
    const router = useRouter();
    const { permissions } = getAuthCredentials();
    const superAdmin = permissions?.includes(SUPER_ADMIN);

    const [sortingObj, setSortingObj] = useState<{
        sort: SortOrder;
        column: string | null;
    }>({
        sort: SortOrder.Desc,
        column: null
    });

    const onHeaderClick = (column: string | null) => ({
        onClick: () => {
            onSort((currentSortDirection: SortOrder) =>
                currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc 
            );
            onOrder(column!);

            setSortingObj({
                sort:
                  sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
                column: column,
            });
        }
    });

    const columns = [
        {
            title: 'No',
            dataIndex: 'number',
            key: 'number',
            align: 'left' as AlignType,
            width: 10,
            render: (number: number) => `${number}`,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('title'),
            render: (title: any) => (
                <div className="flex items-center">
                    {/* <Avatar name={name} src={profile?.avatar?.thumbnail} /> */}
                    <div className="flex flex-col whitespace-nowrap font-medium ms-2">
                        {title}
                    </div>
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('description'),
            render: (description: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {description}
                    </span>
                </div>
            ),
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('startDate'),
            render: (startDate: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {startDate}
                    </span>
                </div>
            ),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('endDate'),
            render: (endDate: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {endDate}
                    </span>
                </div>
            ),
        },
        {
            title: 'Status',
            width: 150,
            className: 'cursor-pointer',
            dataIndex: 'status',
            key: 'isActive',
            align: 'center' as AlignType,
            onHeaderCell: () => onHeaderClick('status'),
            render: (status: boolean) => (
              <Badge
                textKey={status ? 'Active' : 'Inactive'}
                color={
                    status
                    ? '!text-green-700 bg-green-400/30'
                    : 'bg-status-failed/10 text-status-failed'
                }
              />
            ),
        },
        ...(superAdmin
            ? [
                {
                    title: 'Actions',
                    dataIndex: 'slug',
                    key: 'actions',
                    align: 'right' as AlignType,
                    width: 120,
                    render: (slug: string, record: Event) => (
                        <LanguageSwitcher
                            slug={record.id}
                            record={record}
                            deleteModalView={superAdmin ? "DELETE_EVENT" : undefined}
                            routes={superAdmin ? Routes?.event : undefined}
                            detailsUrl={superAdmin ? `${router.asPath}/${record.id}` : undefined}
                        />
                    ),
                },
        ] : []),
    ]

    if (loading) return <Loader text={('Loading')} />;

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow">
                <Table
                    columns={columns}
                    emptyText={() => (
                        <div className="flex flex-col items-center py-7">
                            <NoDataFound className="w-52" />
                            <div className="mb-1 pt-6 text-base font-semibold text-heading">
                                {'Empty Table Data'}
                            </div>
                            <p className="text-[13px]">{'Empty Table Text'}</p>
                        </div>
                    )}
                    data={events}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                />
            </div>
            {!!paginatorInfo?.total && (
                <div className="flex item-center justify-end select-none">
                    <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.currentPage}
                        pageSize={paginatorInfo.perPage}
                        onChange={onPagination}
                    />
                </div>
            )}
        </>
    )

}

export default EventList;