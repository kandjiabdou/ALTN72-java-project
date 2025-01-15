/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { message, Form, Input, Button, Spin } from "antd";
import { Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";

import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const EditUserPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const userId = useParams().id;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        form.setFieldsValue(data);
        setLoading(false);
      });

    setLoading(false);
  }, [userId, form]);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log("values", values);
      fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          message.success("Utilisateur modifié avec succès");
          navigate("/users");
        } else {
          message.error("Erreur lors de la modification de l'utilisateur");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-full">
      <Spin />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-full gap-4 pt-32">
      <span className="flex items-center gap-4">
        <Button icon={<ArrowLeftOutlined />} href="/users" size="small" />
        <h1>
          Modifier l'utilisateur {form.getFieldValue("prenom")}{" "}
          {form.getFieldValue("nom")}
        </h1>
      </span>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="w-1/3"
        name="createUser"
      >
        <div className="flex gap-4">
          <Form.Item
            name="prenom"
            rules={[
              {
                required: true,
                message: "Veuillez entrer un prénom !",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Prénom" />
          </Form.Item>
          <Form.Item
            name="nom"
            rules={[
              {
                required: true,
                message: "Veuillez entrer un nom !",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nom" />
          </Form.Item>
        </div>
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un nom d'utilisateur !",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nom d'utilisateur" />
        </Form.Item>
        <Form.Item
          name="mdp"
          extra="Laissez vide pour ne pas changer le mot de passe"
        >
          <Input
            type="password"
            prefix={<LockOutlined />}
            placeholder="Mot de passe"
          />
        </Form.Item>
        <Form.Item name="role">
          <Select defaultValue="ETUDIANT" style={{ width: 150 }}>
            <Select.Option value="ETUDIANT">Étudiant</Select.Option>
            <Select.Option value="PROF">Professeur</Select.Option>
            <Select.Option value="ADMIN">Administrateur</Select.Option>
          </Select>
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

export default EditUserPage;
