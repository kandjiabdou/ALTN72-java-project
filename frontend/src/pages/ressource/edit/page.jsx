/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { message, Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
import { ArrowLeftOutlined } from "@ant-design/icons";
import Loader from "../../../commons/components/Loader";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
const EditRessourcePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const ressourceId = useParams().id;

  let status = "";
  let color = "green";

  const getData = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/ressources/${ressourceId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        form.setFieldsValue(data);
        status = data.status;
        color = "green";
        if (status === "PROPOSE") {
          color = "orange";
        } else if (status === "REJETE") {
          color = "red";
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [ressourceId, form]);

  const handleSubmit = async (values) => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/ressources/${ressourceId}`, {
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
    <div className="flex flex-col justify-center items-center h-full gap-4 pt-12">
      <span className="flex items-baseline gap-4">
        <Button icon={<ArrowLeftOutlined />} href="/" size="small" />
        <h1>
          Modifier la ressource {form.getFieldValue("titre")}{" "}
          {form.getFieldValue("nom")}
        </h1>
        <Tag color={color}>{status}</Tag>
      </span>

      <span className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            disabled={status === "VALIDE"}
            onClick={() => {
              fetch(
                `${
                  import.meta.env.VITE_API_URL
                }/ressources/statut/${ressourceId}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status: "VALIDE" }),
                }
              ).then((response) => {
                if (response.ok) {
                  message.success("Ressource validée avec succès");
                  getData();
                } else {
                  message.error("Erreur lors de la validation de la ressource");
                }
              });
            }}
          >
            Valider
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            disabled={status === "PROPOSE"}
            onClick={() => {
              fetch(
                `${
                  import.meta.env.VITE_API_URL
                }/ressources/statut/${ressourceId}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status: "PROPOSE" }),
                }
              ).then((response) => {
                if (response.ok) {
                  message.success("Ressource refusée avec succès");
                  getData();
                } else {
                  message.error("Erreur lors du refus de la ressource");
                }
              });
            }}
          >
            Proposer
          </Button>
          <Button
            size="small"
            color="danger"
            variant="outlined"
            disabled={status === "REJETE"}
            onClick={() => {
              fetch(
                `${
                  import.meta.env.VITE_API_URL
                }/ressources/statut/${ressourceId}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status: "REJETE" }),
                }
              ).then((response) => {
                if (response.ok) {
                  message.success("Ressource refusée avec succès");
                  getData();
                } else {
                  message.error("Erreur lors du refus de la ressource");
                }
              });
            }}
          >
            Refuser
          </Button>
        </div>
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
