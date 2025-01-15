import { Button } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // REMOVE THIS
    // setData([
    //   {
    //     key: "1",
    //     prenom: "John",
    //     nom: "Doe",
    //     email: "johndoe@gmail.com",
    //     role: "admin",
    //   },
    //   {
    //     key: "2",
    //     prenom: "Jane",
    //     nom: "Doe",
    //     email: "janedoe@gmail.com",
    //     role: "user",
    //   },
    //   {
    //     key: "3",
    //     prenom: "John",
    //     nom: "Smith",
    //     email: "johnsmith@gmail.com",
    //     role: "user",
    //   },
    // ]);

    getData();
  }, []);

  const getData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };
  return (
    <div className="p-4 py-10 bg-gray-100 h-full flex flex-col gap-5 ">
      <h1 className="text-2xl font-bold text-center">Users</h1>
      <div className="flex gap-2">
        <Button href="/users/create" icon={<PlusOutlined />} />
        <Button icon={<ReloadOutlined />} onClick={getData} />
      </div>
      <TableComponent data={data} />
    </div>
  );
};

export default UsersPage;
