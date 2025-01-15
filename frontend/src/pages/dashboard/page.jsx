import { Select, Button } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table";
import { useEffect, useState, useMemo } from "react";
import { useUser } from "../../commons/hooks/auth";
import Loader from "../../commons/components/Loader";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [domaineFilter, setDomaineFilter] = useState(null);
  const user = useUser();

  useEffect(() => {
    getData();
  }, [user]);

  const getData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/ressources`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (user?.role === "ADMIN") {
          const updatedData = data.map((item, index) => ({
            ...item,
            key: index + 1,
          }));
          setData(updatedData);
        } else {
          const updatedData = data
            .filter((item) => item.status === "VALIDE")
            .map((item, index) => ({
              ...item,
              key: index + 1,
            }));
          setData(updatedData);
        }
      });
  };

  const uniqueDomaines = useMemo(() => {
    const domaines = [...new Set(data.map((item) => item.domaine))];
    return domaines.filter(Boolean); // Remove any null/undefined values
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchStatus = !statusFilter || item.status === statusFilter;
      const matchDomaine = !domaineFilter || item.domaine === domaineFilter;
      return matchStatus && matchDomaine;
    });
  }, [data, statusFilter, domaineFilter]);

  return !user ? (
    <Loader />
  ) : (
    <div className="p-4 py-10 bg-gray-100 eh-full flex flex-col gap-5 h-full">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <div className="flex gap-2">
        {(user.role === "ADMIN" || user.role === "PROF") && (
          <Button href="/ressource/create" icon={<PlusOutlined />} />
        )}

        <Button icon={<ReloadOutlined />} onClick={getData} />
        {user.role === "ADMIN" && (
          <Select
            placeholder="Filtrer par statut"
            style={{ width: 120 }}
            onChange={setStatusFilter}
            allowClear
            value={statusFilter}
          >
            <Select.Option value="VALIDE">Validé</Select.Option>
            <Select.Option value="PROPOSE">Proposée</Select.Option>
            <Select.Option value="REFUSE">Refusé</Select.Option>
          </Select>
        )}
        <Select
          placeholder="Filtrer par domaine"
          style={{ width: 250 }}
          onChange={setDomaineFilter}
          allowClear
          value={domaineFilter}
        >
          {uniqueDomaines.map((domaine) => (
            <Select.Option key={domaine} value={domaine}>
              {domaine}
            </Select.Option>
          ))}
        </Select>
      </div>
      <TableComponent data={filteredData} />
    </div>
  );
};

export default DashboardPage;
