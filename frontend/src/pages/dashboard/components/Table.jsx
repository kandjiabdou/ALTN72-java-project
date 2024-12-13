import { Table, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useUser } from "../../../commons/hooks/auth";

const data = [
  {
    key: 1,
    id: 1,
    titre: "GitHub Global Campus (GitHub Education)",
    domaine: "Bouquet de services",
    description_simple: "Pack d'outils Github pour les étudiants",
    description_detaillee:
      "Sélection d'outils et de services pour booster votre productivité en tant qu'élève-ingénieur du numérique. Le GitHub Student Developer Pack vous donne un accès gratuit à un impressionnant catalogue de services et d'outils. Ex: GitHub pro, GitHub Copilot, DigitalOcean, Outils JetBrains (IntelliJ IDEA Ultimate, PyCharm,...), Azure, Heroku, etc... Une courte vidéo de présentation est disponible ici  :https://www.youtube.com/watch?v=HIVFdN9VGgw",
    lien: "https://education.github.com/discount_requests/application",
    acces: `a) Aller sur le lien indiqué
b) Remplir les différents champs sur la page
c) Choisir "French School of Electronics and Computer Science" pour l'école
d) Envoyer un justificatif (idéalement la carte d'étudiant)
e) Attendre la validation par l'équipe de GitHub
f) Profiter des différentes offres incluses dans le programme`,
    feedback_utilisateurs: `Les utilisateurs ont trouvé le processus simple et rapide`,
  },
  {
    key: 2,
    id: 2,
    titre: "Coding Rooms",
    domaine: "Codage / Développement",
    description_simple: "Site web pour les exercices de programmation",
    description_detaillee: "Exercices pratiques de programmation, en ligne",
    lien: "https://www.codingrooms.com/",
    acces: `L'enseignant partage un lien d'invitation unique pour rejoindre son espace de cours sur la plateforme Coding Rooms.
On peut ensuite accéder aux exercices et aux ressources du cours.`,
    feedback_utilisateurs: `Les utilisateurs ont trouvé le processus simple et rapide`,
  },
  {
    key: 3,
    id: 3,
    titre: "Nowledgeable",
    domaine: "Codage / Développement",
    description_simple: "Site web pour les exercices de programmation",
    description_detaillee: "Exercices pratiques de programmation, en ligne",
    lien: "https://nowledgeable.com/",
    acces: `"a) Allez sur : https://nowledgeable.com/login
b) Saisissez votre adresse mail EFREI
c) Un lien vous sera envoyé pour créer et activer un compte"`,
  },
  {
    key: 4,
    id: 4,
    titre: "Jupyter notebook",
    domaine: "Codage / Développement",
    description_simple: "Application web pour le codage",
    description_detaillee:
      "Jupyter Notebook est une application web qui vous permet de stocker des lignes de code Python, les résultats de l’exécution de ces dernières (graphiques, tableaux, etc.) et du texte formaté. Il permet donc de combiner code, visualisations et explications dans un même document, ce qui facilite l'exploration et le partage de données.",
    lien: "https://www.google.com",
    acces: `a) Aller sur le lien indiqué
b) Remplir les différents champs sur la page
c) Choisir "French School of Electronics and Computer Science" pour l'école
d) Envoyer un justificatif (idéalement la carte d'étudiant)
e) Attendre la validation par l'équipe de GitHub
f) Profiter des différentes offres incluses dans le programme`,
    feedback_utilisateurs: `Les utilisateurs ont trouvé le processus simple et rapide`,
  },
];
const TableComponent = () => {
  const handleDelete = (id) => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/ressources/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const user = useUser();

  const columns = [
    {
      title: "Titre",
      dataIndex: "titre",
      key: "titre",
    },
    {
      title: "Domaine",
      dataIndex: "domaine",
      key: "domaine",
    },
    {
      title: "Description",
      dataIndex: "description_simple",
      key: "description_simple",
    },
    {
      title: "Lien",
      dataIndex: "lien",
      key: "lien",
      render: () => <Button type="link">https://www.google.com</Button>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <Button
            size="small"
            icon={<MessageOutlined />}
            href={`/ressource/${record.id}`}
          />

          {user && user.role === "administrateur" && (
            <>
              <Button
                size="small"
                icon={<EditOutlined />}
                href={`/ressource/edit/${record.id}`}
              />
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div className="p-4 flex flex-col gap-4">
            <p>
              <strong>Description détaillée: </strong>
              {record.description_detaillee}
            </p>
            <p>
              <strong>Accès: </strong>
              {record.acces}
            </p>
            <p>
              <strong>Feedback utilisateurs: </strong>
              {record.feedback_utilisateurs}
            </p>
          </div>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  );
};

export default TableComponent;
