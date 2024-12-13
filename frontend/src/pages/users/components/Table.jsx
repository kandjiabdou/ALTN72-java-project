import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    prenom: "John",
    nom: "Doe",
    email: "johndoe@gmail.com",
    role: "admin",
  },
  {
    key: "2",
    prenom: "Jane",
    nom: "Doe",
    email: "janedoe@gmail.com",
    role: "user",
  },
  {
    key: "3",
    prenom: "John",
    nom: "Smith",
    email: "johnsmith@gmail.com",
    role: "user",
  },
];

const TableComponent = () => {
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
      render: () => (
        <div className="flex gap-2 items-center justify-center">
          <Button size="small" icon={<EditOutlined />} href="/users/edit/1" />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(1)}
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
