/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { message, Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
import { ArrowLeftOutlined } from "@ant-design/icons";
import Loader from "../../../commons/components/Loader";
import { useNavigate } from "react-router-dom";
const EditRessourcePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const ressourceId = useParams().id;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/ressource/${ressourceId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        form.setFieldsValue(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
        setLoading(false);
      });

    form.setFieldsValue({
      titre: "Github",
      domaine: "Développement",
      descriptionSimple: "Github est une plateforme de développement",
      descriptionDetaillee: "Github est une plateforme de développement",
      lien: "https://www.github.com",
      acces: "Gratuit",
    });
  }, [ressourceId, form]);

  const handleSubmit = async (values) => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/ressource/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          message.success("Ressource créé avec succès");
        } else {
          message.error("Erreur lors de la création de la ressource");
        }
      });
    } catch (error) {
      console.error(error);
    }
    // go to '/'
    navigate("/");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <span className="flex items-center gap-4">
        <Button icon={<ArrowLeftOutlined />} href="/" size="small" />
        <h1>
          Modifier la ressource {form.getFieldValue("titre")}{" "}
          {form.getFieldValue("nom")}
        </h1>
      </span>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="w-1/3"
        name="editRessource"
        layout="vertical"
      >
        <Form.Item
          label="Titre"
          name="titre"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un titre !",
            },
          ]}
        >
          <Input placeholder="Titre" name="titre" />
        </Form.Item>
        <Form.Item
          label="Domaine"
          name="domaine"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un domaine !",
            },
          ]}
        >
          <Input placeholder="Domaine" name="domaine" />
        </Form.Item>
        <Form.Item
          label="Description simple"
          name="descriptionSimple"
          rules={[
            {
              required: true,
              message: "Veuillez entrer une description simple !",
            },
          ]}
        >
          <TextArea placeholder="Description simple" name="descriptionSimple" />
        </Form.Item>
        <Form.Item
          label="Description détaillée"
          name="descriptionDetaillee"
          rules={[
            {
              required: true,
              message: "Veuillez entrer une description détaillée !",
            },
          ]}
        >
          <TextArea
            placeholder="Description détaillée"
            name="descriptionDetaillee"
          />
        </Form.Item>
        <Form.Item
          label="Lien"
          name="lien"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un lien !",
            },
          ]}
        >
          <Input placeholder="Lien" name="lien" />
        </Form.Item>
        <Form.Item
          label="Accès"
          name="acces"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un accès !",
            },
          ]}
        >
          <Input placeholder="Accès" name="acces" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Modifier
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditRessourcePage;
