import { css } from '@emotion/css';
import { Button, Input, Select, Space } from 'antd';
import { ArrowDownIcon, PlusIcon, Searchcon } from 'assets/svg';
import useDebounce from 'Hooks/utils/useDebounce';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { useEffect } from 'react';
import { useState } from 'react';
import ModalAddCoupon from './modals/ModalAddCoupon';

function CouponsHeader({
  title,
  couponsCount,
  handlePrintPdf,
  handlePrintExcel,
}) {
  const CouponsHeaderStyles = css`
    /* padding: 2.4rem 0; */
    /* background-color: #f9f8f8; */
    margin-bottom: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    .col-start {
      .title {
        font-weight: 500;
        font-size: 2rem;
        line-height: 3rem;
        text-transform: capitalize;
        color: #2a2a2a;
      }
      .sub-title {
        font-weight: 400;
        font-size: 1.3rem;
        line-height: 2rem;
        color: #6a6f73;
      }
    }
    .col-end {
      .input {
        height: 4rem;
        background-color: #f3f3f4;
        background-color: #fff;
        &.search {
          svg {
            width: 1.1rem;
            margin-inline-end: 3px;
          }
          input {
            background-color: #f3f3f4;
            background-color: #fff;
            &::placeholder {
              font: normal normal normal 1.4rem/2rem Poppins;
              letter-spacing: 0px;
              color: #6a6f73;
            }
          }
        }
        &.select {
          display: flex;
          align-items: center;
          .ant-select-selector {
            height: 4rem;
            background-color: #f3f3f4;
            background-color: #fff;
            font-size: 1.4rem;

            .ant-select-selection-placeholder,
            .ant-select-selection-item {
              display: flex;
              align-items: center;
              font-size: 1.4rem;
              letter-spacing: 0px;
              color: #6a6f73;
            }
          }
          .ant-select-arrow {
            svg {
              width: 0.9rem;
            }
          }
        }
      }
      .btn-add {
        font-size: 1.5rem;
        padding: 0.5rem 1.2rem;
        svg {
          width: 1.3rem;
          margin-inline-end: 0.6rem;
        }
      }
    }
  `;
  const [isModalAddCoupon, setIsModalAddCoupon] = useState(false);
  const { searchQueryObj, setSearchQuery } = useSearchQuery();
  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounce = useDebounce(searchValue, 500);

  useEffect(() => {
    const newQueryObj = {
      ...searchQueryObj,
      page: 1,
      q: searchValueDebounce,
    };

    if (!newQueryObj?.q) delete newQueryObj?.q;
    setSearchQuery(newQueryObj);
  }, [searchValueDebounce, setSearchQuery, searchQueryObj]);

  const onFilter = (value) => {
    console.log('onFilter  value', value);
    const newQueryObj = {
      ...searchQueryObj,
      status: value,
    };

    setSearchQuery(newQueryObj);
    return {};
  };

  const onExport = (value) => {
    console.log('onExport  value', value);
    if (value === 'pdf') return handlePrintPdf();
    if (value === 'excel') return handlePrintExcel();

    return {};
  };
  return (
    <>
      <div className={CouponsHeaderStyles}>
        <div className="col-start">
          <div className="title">{title}</div>
          <div className="sub-title">
            You have total {couponsCount} Coupons.
          </div>
        </div>
        <div className="col-end">
          <Space>
            <Input
              suffix={<Searchcon />}
              // defaultValue={searchQueryObj.title?.replaceAll('*', '')}
              placeholder="Search by name"
              className="input search"
              onChange={({ target }) => setSearchValue(target.value)}
            />
            <Select
              placeholder="Status"
              suffixIcon={<ArrowDownIcon />}
              className="input select"
              onChange={onFilter}
              // size="large"
              dropdownStyle={{
                fontSize: '1.1rem',
              }}
              dropdownMatchSelectWidth={200}
              options={[
                {
                  value: 1,
                  label: 'Active',
                },
                {
                  value: 0,
                  label: 'Deactive',
                },
              ]}
            />
            <Select
              placeholder="Export"
              suffixIcon={<ArrowDownIcon />}
              className="input select"
              onChange={onExport}
              // size="large"
              dropdownStyle={{
                fontSize: '1.1rem',
              }}
              dropdownMatchSelectWidth={200}
              options={[
                {
                  value: 'pdf',
                  label: 'Pdf',
                },
                {
                  value: `excel`,
                  label: 'Excel',
                },
                // {
                //   value: 'print',
                //   label: 'Print',
                // },
              ]}
            />

            <Button
              type="primary"
              size="small"
              icon={<PlusIcon />}
              className="btn-add"
              onClick={() => setIsModalAddCoupon(true)}
            >
              Add
            </Button>
          </Space>
        </div>
      </div>
      <ModalAddCoupon open={isModalAddCoupon} setOpen={setIsModalAddCoupon} />
    </>
  );
}

export default CouponsHeader;
