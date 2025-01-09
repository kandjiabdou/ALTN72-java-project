/* eslint-disable react/prop-types */
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableComponent = ({ data }) => {
  const columns = [
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <Button
            size="small"
            icon={<EditOutlined />}
            href={`/users/edit/${record.idUser}`}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.idUser)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;
