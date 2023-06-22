import { css } from '@emotion/css';
import { Table } from 'antd';
import useCouponList from 'api-hooks/module/coupon/useCouponList';
import { ArrowDownIcon, ArrowUpIcon } from 'assets/svg';
import OwnPagination from 'components/own/OwnPagination';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CouponsHeader from './common/CouponsHeader';
import CellActions from './common/table-cells/CellActions';
import CellActivate from './common/table-cells/CellActivate';
import CellDescription from './common/table-cells/CellDescription';
import { Excel } from 'antd-table-saveas-excel';

function Coupons() {
  const CouponsStyles = css`
    background-color: #fff;

    .table-wrapper {
      .ant-table-thead {
        .ant-table-cell {
          background-color: #fff;
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 2.1rem;
          color: #2a2a2a;
          text-transform: capitalize;
        }
      }
      .ant-table-tbody {
        .ant-table-cell {
          background-color: #fff;
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 2.1rem;
          color: #6a6f73;
          text-transform: capitalize;
        }
      }

      .ant-table-expanded-row .ant-table-cell {
        padding: 0;
      }
    }
  `;

  const { couponList, couponListLod, pagination } = useCouponList();
  console.log('Coupons  pagination:', pagination);
  console.log('Coupons  couponList:', couponList);
  const componentRef = useRef();
  const dataSource = couponList?.map((coupon) => ({
    key: coupon?.id,
    coupon: coupon,
    coupon_name: coupon?.title,
    course_name: coupon?.courses_name,
    discount_type: coupon?.type === 1 ? 'Fixed Amount' : 'Percentage',
    percentage_off: coupon?.value,
    start_date: dayjs(coupon?.start_date).format('DD MMM YYYY'),
    end_date: dayjs(coupon?.end_date).format('DD MMM YYYY'),
    activate: !!coupon?.status,
    description: (
      <CellDescription
        code={coupon?.code}
        minPurchase={coupon?.min_purchase}
        max_discount={coupon?.max_discount}
        numOfUsed={coupon?.limit || '-'}
      />
    ),
  }));

  const columns = [
    {
      title: 'Coupon Name',
      dataIndex: 'coupon_name',
      key: 'coupon_name',
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Discount Type',
      dataIndex: 'discount_type',
      key: 'discount_type',
    },
    {
      title: 'Percentage Off',
      dataIndex: 'percentage_off',
      key: 'percentage_off',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Activate',
      dataIndex: 'activate',
      key: 'activate',
      render: (status, record) => (
        <CellActivate status={status} record={record} />
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return <CellActions coupon={record?.coupon} />;
      },
    },
  ];
  const handlePrintPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintExcel = () => {
    const excel = new Excel();

    const dataSourceCopy = couponList?.map((coupon) => ({
      key: coupon?.id,
      coupon_name: coupon?.title,
      course_name: coupon?.courses_name,
      discount_type: coupon?.type === 1 ? 'Fixed Amount' : 'Percentage',
      percentage_off: coupon?.value,
      start_date: dayjs(coupon?.start_date).format('DD MMM YYYY'),
      end_date: dayjs(coupon?.end_date).format('DD MMM YYYY'),
      activate: coupon?.status,
      code: coupon?.code,
    }));

    const columnsCopy = [
      {
        title: 'Coupon Name',
        dataIndex: 'coupon_name',
        key: 'coupon_name',
      },
      {
        title: 'Course Name',
        dataIndex: 'course_name',
        key: 'course_name',
      },
      {
        title: 'Discount Type',
        dataIndex: 'discount_type',
        key: 'discount_type',
      },
      {
        title: 'Percentage Off',
        dataIndex: 'percentage_off',
        key: 'percentage_off',
      },
      {
        title: 'Start Date',
        dataIndex: 'start_date',
        key: 'start_date',
      },
      {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
      },
      {
        title: 'code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Activate',
        dataIndex: 'activate',
        key: 'activate',
        // render: (status, record) => (
        //   <CellActivate status={status} record={record} />
        // ),
      },
    ];

    excel
      .addSheet('test')
      .addColumns(columnsCopy)
      .addDataSource(dataSourceCopy, {
        str2Percent: true,
      })
      .saveAs('Excel.xlsx');
  };

  return (
    <>
      <CouponsHeader
        title={'Coupons'}
        couponsCount={20}
        dataSource={dataSource}
        columns={columns}
        handlePrintPdf={handlePrintPdf}
        handlePrintExcel={handlePrintExcel}
      />

      <div ref={componentRef} className={CouponsStyles}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => {
              console.log('Coupons  record:', record);
              return record.description;
              // <p
              //   style={{
              //     margin: 0,
              //   }}
              // >
              // {record.description}
              // </p>
            },
            rowExpandable: (record) => record.name !== 'Not Expandable',
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <ArrowUpIcon
                  onClick={(e) => onExpand(record, e)}
                  className="clickable"
                />
              ) : (
                <ArrowDownIcon
                  onClick={(e) => onExpand(record, e)}
                  className="clickable"
                />
              ),
          }}
          className="table-wrapper"
        />

        <OwnPagination pagination={pagination} style={{ paddingBottom: 20 }} />
      </div>
    </>
  );
}

export default Coupons;
