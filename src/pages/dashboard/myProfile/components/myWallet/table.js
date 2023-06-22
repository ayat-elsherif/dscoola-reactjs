import { Table } from "antd";

export const InvoicesTable = ({ data }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "payable_id",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "date",
      dataIndex: "created_at",
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data || []}
      bordered
    />
  );
};
