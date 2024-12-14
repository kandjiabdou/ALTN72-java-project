import { useState } from "react";
import { message, Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useUser } from "../../../commons/hooks/auth";

const CreateRessourcePage = () => {
  const [form, setForm] = useState({
    titre: "",
    domaine: "",
    descriptionSimple: "",
    descriptionDetaillee: "",
    lien: "",
    acces: "",
  });

  const user = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/ressource/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((response) => {
        if (response.ok) {
          message.success("Ressource créée avec succès");
        } else {
          message.error("Erreur lors de la création de la ressource");
        }
      });
    } catch (error) {
      console.error(error);
    }
    setForm({
      titre: "",
      domaine: "",
      descriptionSimple: "",
      descriptionDetaillee: "",
      lien: "",
      acces: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <span className="flex flex-col gap-4 items-center">
        <span className="flex items-center gap-4">
          <Button icon={<ArrowLeftOutlined />} href="/" size="small" />

          <h1>Créer un ressource</h1>
        </span>
        {user && user.role == "professeur" && (
          <span className="text-sm text-gray-500">
            Votre ajout sera soumis à validation par un administrateur
          </span>
        )}
      </span>
      <Form onFinish={handleSubmit} className="w-1/3" name="createRessource">
        <Form.Item
          name="titre"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un titre !",
            },
          ]}
        >
          <Input placeholder="Titre" name="titre" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="domaine"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un domaine !",
            },
          ]}
        >
          <Input placeholder="Domaine" name="domaine" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="descriptionSimple"
          rules={[
            {
              required: true,
              message: "Veuillez entrer une description simple !",
            },
          ]}
        >
          <Input
            placeholder="Description simple"
            name="descriptionSimple"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="descriptionDetaillee"
          rules={[
            {
              required: true,
              message: "Veuillez entrer une description détaillée !",
            },
          ]}
        >
          <Input
            placeholder="Description détaillée"
            name="descriptionDetaillee"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="lien"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un lien !",
            },
          ]}
        >
          <Input placeholder="Lien" name="lien" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="acces"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un accès !",
            },
          ]}
        >
          <Input placeholder="Accès" name="acces" onChange={handleChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Créer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRessourcePage;
