import { Select, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table";

const DashboardPage = () => {
  return (
    <div className="p-4 py-10 bg-gray-100 h-full flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <div className="flex gap-2">
        <Button icon={<ReloadOutlined />} />
        <Select placeholder="Filtrer par statut" style={{ width: 120 }}>
          <Select.Option value="valide">Validé</Select.Option>
          <Select.Option value="en_cours">Proposée</Select.Option>
          <Select.Option value="refuse">Refusé</Select.Option>
        </Select>
        <Select placeholder="Filtrer par domaine" style={{ width: 250 }}>
          <Select.Option value="codage">Bouquet de services</Select.Option>
          <Select.Option value="design">Codage / Développement</Select.Option>
          <Select.Option value="autre">Autre</Select.Option>
        </Select>
      </div>
      <TableComponent />
    </div>
  );
};

export default DashboardPage;
