import { Button } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table";

const UsersPage = () => {
  return (
    <div>
      <div className="p-4 py-10 bg-gray-100 h-full flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">Users</h1>
        <div className="flex gap-2">
          <Button href="/users/create" icon={<PlusOutlined />} />
          <Button icon={<ReloadOutlined />} />
        </div>
        <TableComponent />
      </div>
    </div>
  );
};

export default UsersPage;
