import { AlignType, Table } from '@/components/ui/table';
import cn from 'classnames';
import { NoDataFound } from '@/components/icons/no-data-found';
import { MappedPaginatorInfo, Records } from '@/types';
import Pagination from '@/components/ui/pagination';
import Badge from '@/components/ui/badge/badge';

export type IProps = {
  records: Records[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  title: string;
  className?: string;
};

const PenaltyVehicle = ({ 
  records, 
  title, 
  className,
  paginatorInfo,
  onPagination 
}: IProps) => {

  let columns = [
    {
      title: 'No',
      dataIndex: 'number',
      key: 'number',
      align: 'left' as AlignType,
      width: 30,
      className: 'cursor-pointer',
      render: (number: any) => `${number}`,
    },
    {
      title: ('Card ID'),
      dataIndex: 'cardId',
      key: 'cardId',
      align: 'left' as AlignType,
      width: 70,
      className: 'cursor-pointer',
      render: (cardId: string) => (
        <span className="truncate whitespace-nowrap">{cardId}</span>
      ),
    },
    {
      title: ('License'),
      dataIndex: 'licenseNum',
      key: 'licenseNum',
      align: 'left' as AlignType,
      ellipsis: true,
      width: 50,
      render: (license: string) => (
        <span className="truncate whitespace-nowrap">{license}</span>
      ),
    },
    {
      title: ('Entry Date'),
      className: 'entryDatetime',
      dataIndex: 'entryDatetime',
      key: 'entryDatetime',
      width: 70,
      align: 'center',
      render: (entryDatetime: number) => {
        return <span>{new Date(entryDatetime).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '')}</span>
      },
    },
    {
      title: ('Section'),
      className: 'section',
      dataIndex: 'section',
      key: 'section',
      width: 30,
      align: 'center',
      render: (section: number) => {
        return <span>{section}</span>;
      },
    },{
      title: ('Is Exit'),
      width: 30,
      className: 'cursor-pointer',
      dataIndex: 'is_exit',
      key: 'is_exit',
      align: 'center' as AlignType,
      render: (is_exit: number) => (
        <Badge
          textKey={ is_exit ? 'True' : 'False'}
          color={
              is_exit
              ? '!text-green-700 bg-green-400/30'
              : 'bg-status-failed/10 text-status-failed'
          }
        />
      ),
    },
  ];

  return (
    <>
  <div className={cn('flex flex-col justify-between overflow-hidden rounded-lg bg-white p-7 min-h-[400px]', className)}>
    <div className="flex items-center justify-between pb-7">
      <h3 className="before:content-'' relative mt-1.5 bg-light text-lg font-semibold text-heading before:absolute before:-top-0.5 before:h-8 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent before:-left-7">
        {title}
      </h3>
    </div>
    <div className="flex-grow">
      <Table
        /* @ts-ignore */
        columns={columns}
        emptyText={() => (
          <div className="flex flex-col items-center py-7">
            <NoDataFound className="w-52" />
            <div className="mb-1 pt-6 text-base font-semibold text-heading">
              {'Empty Data'}
            </div>
            <p className="text-[13px]">{"Sorry we couldn't found any data"}</p>
          </div>
        )}
        data={records}
        rowKey="number"
        scroll={{ x: 200 }}
      />
    </div>
    {!!paginatorInfo?.total && (
      <div className="flex justify-end pt-4">
        <Pagination
          total={paginatorInfo.total}
          current={paginatorInfo.currentPage}
          pageSize={paginatorInfo.perPage}
          onChange={onPagination}
        />
      </div>
    )}
  </div>
</>

  );
};

export default PenaltyVehicle;
