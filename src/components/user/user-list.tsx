import { MappedPaginatorInfo, SortOrder, User } from "@/types"
import { useState } from "react";
import Pagination from "../ui/pagination";
import Table from "rc-table";
import { NoDataFound } from "../icons/no-data-found";
import { AlignType } from "../ui/table";
import TitleWithSort from "../ui/title-with-sort";
import LanguageSwitcher from "../ui/lang-action/action";
import { Routes } from "@/config/routes";
import Badge from "../ui/badge/badge";
import Loader from "../ui/loader/loader";
import { getAuthCredentials } from "@/utils/auth-utils";
import { userPermission } from "@/utils/permission-utils";

type IProps = {
    users: User[];
    paginatorInfo: MappedPaginatorInfo | null;
    onPagination: (current: number) => void;
    onSort: (current: any) => void;
    onOrder: (current: string) => void;
    loading: boolean
}

const UserList = ({
    users,
    paginatorInfo,
    onPagination,
    onSort,
    onOrder,
    loading
}: IProps) => {

    const { permissions } = getAuthCredentials();

    const editAllow = permissions?.includes(userPermission[2]);
    const deleteAllow = permissions?.includes(userPermission[3]);



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
            title: (
                <TitleWithSort
                  title={'Name'}
                  ascending={
                    sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
                  }
                  isActive={sortingObj.column === 'name'}
                />
            ),
            dataIndex: 'name',
            key: 'name',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('name'),
            render: (name: any, { email }: any) => (
                <div className="flex items-center">
                    {/* <Avatar name={name} src={profile?.avatar?.thumbnail} /> */}
                    <div className="flex flex-col whitespace-nowrap font-medium ms-2">
                        {name}
                        <span className="text-[13px] font-normal text-gray-500/80">
                        {email}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: (
                <TitleWithSort
                  title={'Role'}
                  ascending={
                    sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
                  }
                  isActive={sortingObj.column === 'role'}
                />
            ),
            dataIndex: 'role',
            key: 'role',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('role'),
            render: (role: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {role}
                    </span>
                </div>
            ),
        },
        {
            title: 'Phone Number',
            dataIndex:'phonenumber',
            key:'phonenumber',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            render: (phonenumber: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {phonenumber}
                    </span>
                </div>
            )
        },
        {
            title: (
              <TitleWithSort
                title={('Status')}
                ascending={
                  sortingObj.sort === SortOrder.Asc &&
                  sortingObj.column === 'is_active'
                }
                isActive={sortingObj.column === 'is_active'}
              />
            ),
            width: 150,
            className: 'cursor-pointer',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center' as AlignType,
            onHeaderCell: () => onHeaderClick('is_active'),
            render: (is_active: boolean) => (
              <Badge
                textKey={is_active ? 'Active' : 'Inactive'}
                color={
                  is_active
                    ? '!text-green-700 bg-green-400/30'
                    : 'bg-status-failed/10 text-status-failed'
                }
              />
            ),
        },
        ...(editAllow || deleteAllow
            ? [
                {
                    title: 'Actions',
                    dataIndex: 'slug',
                    key: 'actions',
                    align: 'right' as AlignType,
                    width: 120,
                    render: (slug: string, record: User) => (
                        <LanguageSwitcher
                        slug={record.id}
                        record={record}
                        deleteModalView={deleteAllow ? "DELETE_USER" : undefined}
                        routes={editAllow ? Routes?.user : undefined}
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
                    data={users}
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

export default UserList;