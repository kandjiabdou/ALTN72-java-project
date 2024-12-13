import { useState } from "react";
import { message, Form, Input, Button } from "antd";
import { Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const CreateUserPage = () => {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    role: "etudiant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/user/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((response) => {
        if (response.ok) {
          message.success("Utilisateur créé avec succès");
        } else {
          message.error("Erreur lors de la création de l'utilisateur");
        }
      });
    } catch (error) {
      console.error(error);
    }
    setForm({
      prenom: "",
      nom: "",
      email: "",
      motDePasse: "",
      role: "etudiant",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <span className="flex items-center gap-4">
        <Button icon={<ArrowLeftOutlined />} href="/users" size="small" />
        <h1>Créer un utilisateur</h1>
      </span>
      <Form onFinish={handleSubmit} className="w-1/3" name="createUser">
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
            <Input
              prefix={<UserOutlined />}
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder="Prénom"
            />
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
            <Input
              name="nom"
              prefix={<UserOutlined />}
              value={form.nom}
              onChange={handleChange}
              placeholder="Nom"
            />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un email !",
            },
          ]}
        >
          <Input
            type="email"
            name="email"
            prefix={<MailOutlined />}
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Veuillez entrer un mot de passe !",
            },
          ]}
        >
          <Input
            type="password"
            name="motDePasse"
            prefix={<LockOutlined />}
            value={form.motDePasse}
            onChange={handleChange}
            placeholder="Mot de passe"
          />
        </Form.Item>
        <Form.Item name="role">
          <Select defaultValue="etudiant" style={{ width: 120 }}>
            <Select.Option value="etudiant">Étudiant</Select.Option>
            <Select.Option value="professeur">Professeur</Select.Option>
            <Select.Option value="administrateur">Administrateur</Select.Option>
          </Select>
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

export default CreateUserPage;
