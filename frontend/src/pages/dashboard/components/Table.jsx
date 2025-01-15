/* eslint-disable react/prop-types */
import { Table, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useUser } from "../../../commons/hooks/auth";
import { Tag } from "antd";

const TableComponent = ({ data }) => {
  const handleDelete = (id) => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/ressources/${id}`, {
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

  const user = useUser();

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        let color = "green";
        if (status === "PROPOSE") {
          color = "orange";
        } else if (status === "REJETE") {
          color = "red";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Titre",
      dataIndex: "titre",
      key: "titre",
    },
    {
      title: "Domaine",
      dataIndex: "domaine",
      key: "domaine",
    },
    {
      title: "Description",
      dataIndex: "descriptionSimple",
      key: "descriptionSimple",
    },
    {
      title: "Lien",
      dataIndex: "lien",
      key: "lien",
      render: (_, record) => (
        <Button type="link" href={record.lien} target="_blank">
          Lien
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <Button
            size="small"
            icon={<MessageOutlined />}
            href={`/ressource/${record.id}`}
          />

          {user && user.role === "ADMIN" && (
            <>
              <Button
                size="small"
                icon={<EditOutlined />}
                href={`/ressource/edit/${record.id}`}
              />
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-auto">
      <Table
        pagination={{ pageSize: 5 }}
        scroll={{ y: 500 }}
        className="w-full h-50vh"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div className="p-4 flex flex-col gap-4">
              <p>
                <strong>Description détaillée: </strong>
                {record.descriptionDetaillee}
              </p>
              <p>
                <strong>Accès: </strong>
                {record.acces}
              </p>
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;
