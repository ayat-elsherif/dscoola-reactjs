import { reduce } from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowIcon,
  BackArrowIcon,
  MessageIcon,
  PhoneIcon,
} from '../../../../../assets/svg';
import { useGetMyInvoiceDetails } from '../../hooks/useInvoices';
import './index.scss';
import InvoiceTable from './table';
import { Skeleton } from 'antd';
const InvoiceDetails = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const { data: invoiceData, isLoading } = useGetMyInvoiceDetails(id);

  return (
    <div className="invoice-details">
      <div className="invoice-details_header">
        <div className="title">
          Invoices <ArrowIcon />{' '}
          <span>
            {isLoading ? (
              <Skeleton.Input active size="small" />
            ) : (
              invoiceData?.data?.user_name
            )}
          </span>
        </div>
        <div className="back" onClick={() => navigate(-1)}>
          <BackArrowIcon /> Back
        </div>
      </div>
      <div className="invoice-details_body">
        <div className="invoice-logo">
          <img src="/assets/images/invoice.png" alt="invoice" />
        </div>
        <div className="invoice-header">
          <div className="user-details">
            <h5>Invoice to</h5>
            <h4>
              {isLoading ? (
                <Skeleton.Input active size="small" />
              ) : (
                invoiceData?.data?.user_name
              )}
            </h4>
            <div>
              <MessageIcon />
              <span>
                {isLoading ? (
                  <Skeleton.Input active size="small" />
                ) : (
                  invoiceData?.data?.user_email
                )}
              </span>
            </div>
            <div>
              <PhoneIcon />
              <span>
                {' '}
                {isLoading ? (
                  <Skeleton.Input active size="small" />
                ) : (
                  invoiceData?.data?.user_phone
                )}
              </span>
            </div>
          </div>
          <div className="invoice-data">
            <h4>Invoice</h4>
            <div>
              <span className="label">Invoice Id</span>
              <span className="value">
                :{' '}
                {isLoading ? (
                  <Skeleton.Input active size="small" />
                ) : (
                  invoiceData?.data?.id
                )}
              </span>
            </div>
            <div>
              <span className="label">Date</span>
              <span className="value">
                :{' '}
                {isLoading ? (
                  <Skeleton.Input active size="small" />
                ) : (
                  dayjs(invoiceData?.data?.created_at).format('ll')
                )}
              </span>
            </div>
          </div>
        </div>
        <InvoiceTable data={invoiceData?.data?.courses} isLoading={isLoading} />
        <div className="invoice-footer">
          <div>
            {' '}
            <span className="label">Sub Total</span>
            <span className="value">
              $
              {reduce(
                invoiceData?.data?.courses,
                function (sum, n) {
                  console.log('sumnnd', sum, n);
                  return sum + +n.sale_price;
                },
                0,
              )}
            </span>
          </div>
          <div>
            {' '}
            <span className="label">Point Discount</span>
            <span className="value">$200</span>
          </div>
          <div className="custom-divider"></div>
          <div>
            {' '}
            <span className="label">Total Pay</span>
            <span className="value">${invoiceData?.data?.total_pay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
