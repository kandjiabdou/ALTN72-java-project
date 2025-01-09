import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../commons/components/Loader";
import { Button, Tag } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUser } from "../../commons/hooks/auth";
import { Form, Input, message } from "antd";

const RessourcePage = () => {
  const { id } = useParams();
  const [ressource, setRessource] = useState(null);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const getRessource = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ressources/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setRessource(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFeedbacks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ressources/${id}/feedbacks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRessource((prevRessource) => ({
        ...prevRessource,
        feedbacksUtilisateurs: data.feedbacks,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    await getRessource();
    await getFeedbacks();
  };

  const user = useUser();
  useEffect(() => {
    fetchData();
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
              {ressource.feedbacksUtilisateurs?.length === 0 && (
                <p className="text-gray-500 text-sm ml-4">
                  Pas de feedback pour le moment
                </p>
              )}
              {ressource.feedbacksUtilisateurs?.map((feedback) => (
                <div key={feedback.id} className="p-2 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <h2 className="font-semibold">
                        {feedback.auteur.prenom} {feedback.auteur.nom}
                      </h2>
                      <Tag>{feedback.auteur.role}</Tag>
                    </span>
                    <span className="flex items-center gap-4">
                      {user && user.role == "ADMIN" && (
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                          size="small"
                          onClick={() => {
                            fetch(
                              `${
                                import.meta.env.VITE_API_URL
                              }/ressources/${id}/feedback/${feedback.id}`,
                              {
                                method: "DELETE",
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            )
                              .then((response) => response.json())
                              .then((data) => console.log(data));
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm">{feedback.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {ressource?.feedbacksUtilisateurs?.length >= 5 ? (
          <div className="w-1/4 bg-white p-4 rounded shadow-md">
            <span className="text-sm text-gray-500">
              Le nombre maximum de feedbacks a été atteint
            </span>
          </div>
        ) : (
          <div className="w-1/4 mt-8 p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mt-4">Ajouter un feedback</h2>
            <Form
              onFinish={() => {
                try {
                  fetch(
                    `${
                      import.meta.env.VITE_API_URL
                    }/ressources/${id}/feedback/${user.idUser}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify({
                        contenu: form.getFieldValue("contenu"),
                      }),
                    }
                  ).then((response) => {
                    if (response.ok) {
                      message.success("Feedback ajouté avec succès");
                      getFeedbacks();
                    } else {
                      console.log(response);
                      message.error("Erreur lors de l'ajout du feedback");
                    }
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
              name="createFeedback"
              form={form}
              layout="vertical"
            >
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
        )}
      </div>
    </div>
  );
};

export default RessourcePage;
