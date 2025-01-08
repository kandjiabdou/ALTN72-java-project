import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../commons/components/Loader";
import { Button, Tag } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUser } from "../../commons/hooks/auth";
import { Form, Input, Select } from "antd";

const RessourcePage = () => {
  const { id } = useParams();
  const [ressource, setRessource] = useState(null);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const user = useUser();
  useEffect(() => {
    const getRessource = async () => {
      try {
        fetch(`${import.meta.env.VITE_API_URL}/ressource/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setRessource(data));

        // REMOVE THIS
        // setRessource({
        //   titre: "Github",
        //   domaine: "Développement",
        //   descriptionSimple: "Github est une plateforme de développement",
        //   descriptionDetaillee: "Github est une plateforme de développement",
        //   lien: "https://www.github.com",
        //   acces: "Gratuit",
        //   feedbacksUtilisateurs: [
        //     {
        //       id: 1,
        //       note: 4,
        //       contenu: "Super ressource",
        //       auteur: {
        //         id: 1,
        //         prenom: "John",
        //         nom: "Doe",
        //         role: "professeur",
        //       },
        //     },
        //     {
        //       id: 2,
        //       note: 3,
        //       contenu: "Pas mal",
        //       auteur: {
        //         id: 2,
        //         prenom: "Jane",
        //         nom: "Doe",
        //         role: "etudiant",
        //       },
        //     },
        //   ],
        // });
      } catch (error) {
        console.error(error);
      }
    };

    getRessource();
  }, [id]);

  if (!ressource) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <Button href="/" icon={<ArrowLeftOutlined />} size="small" />
        <h1 className="text-3xl font-bold">{ressource.titre}</h1>
        <Button className="opacity-0" />
      </div>
      <div className="w-full mb-4 flex justify-center items-center">
        <Tag>{ressource.domaine}</Tag>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4 bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <strong>Description simple:</strong> {ressource.descriptionSimple}
          </div>
          <div className="mb-4">
            <strong>Description détaillée:</strong>{" "}
            {ressource.descriptionDetaillee}
          </div>
          <div className="mb-4">
            <strong>Accès:</strong> {ressource.acces}
          </div>
          <div className="mb-4">
            <strong>Lien:</strong>{" "}
            <a className="text-blue-500 hover:underline" href={ressource.lien}>
              {ressource.lien}
            </a>
          </div>
          <div className="mb-4">
            <strong>Feedbacks :</strong>
            <div className="flex flex-col gap-4 mt-2">
              {ressource.feedbacksUtilisateurs.map((feedback) => (
                <div key={feedback.id} className="p-2 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <h2 className="font-semibold">
                        {feedback.auteur.prenom} {feedback.auteur.nom}
                      </h2>
                      <Tag>{feedback.auteur.role}</Tag>
                    </span>
                    <span className="flex items-center gap-4">
                      <p className="text-gray-600">{feedback.note}/5</p>
                      {user && user.role == "administrateur" && (
                        <Button icon={<DeleteOutlined />} danger size="small" />
                      )}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm">{feedback.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 mt-8 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mt-4">Ajouter un feedback</h2>
          <Form
            onFinish={() => {
              try {
                fetch(
                  `${import.meta.env.VITE_API_URL}/ressource/${id}/feedback`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                      note: form.getFieldValue("note"),
                      contenu: form.getFieldValue("contenu"),
                    }),
                  }
                )
                  .then((response) => response.json())
                  .then((data) => console.log(data));
              } catch (error) {
                console.error(error);
              }
            }}
            name="createFeedback"
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="Note sur 5"
              name="note"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer une note !",
                },
              ]}
            >
              <Select className="w-16" name="note">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Contenu"
              name="contenu"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer un contenu !",
                },
              ]}
            >
              <TextArea
                placeholder="Contenu"
                name="contenu"
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Envoyer</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RessourcePage;
