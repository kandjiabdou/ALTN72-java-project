/* eslint-disable react/no-unescaped-entities */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

const LoginPage = () => {
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        localStorage.setItem("token", data.token);
        window.location.href = "/";
        message.success("Connexion réussie");
      } else {
        const msg = await response.json();
        message.error(msg?.message || "Erreur lors de la connexion");
      }

      console.log("fin");
    } catch (error) {
      console.log("error");
      message.error("Erreur lors de la connexion");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Form name="login" onFinish={onFinish}>
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
          rules={[
            {
              required: true,
              message: "Veuillez entrer un mot de passe !",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mot de passe"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
