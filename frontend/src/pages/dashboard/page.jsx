import { Select, Button } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "./components/Table";
import { useEffect, useState } from "react";
import { useUser } from "../../commons/hooks/auth";
import Loader from "../../commons/components/Loader";

const DashboardPage = () => {
  const [data, setData] = useState([]);

  const user = useUser();

  useEffect(() => {
    setData([
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
      {
        key: 5,
        id: 5,
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
        key: 6,
        id: 6,
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
        key: 7,
        id: 7,
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
        key: 8,
        id: 8,
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
      {
        key: 9,
        id: 9,
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
        key: 10,
        id: 10,
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
        key: 11,
        id: 11,
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
        key: 12,
        id: 12,
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
      {
        key: 13,
        id: 13,
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
        key: 14,
        id: 14,
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
        key: 15,
        id: 15,
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
        key: 16,
        id: 16,
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
      {
        key: 5,
        id: 5,
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
        key: 6,
        id: 6,
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
        key: 7,
        id: 7,
        titre: "Nowledgeable",
        domaine: "Codage / Développement",
        description_simple: "Site web pour les exercices de programmation",
        description_detaillee: "Exercices pratiques de programmation, en ligne",
        lien: "https://nowledgeable.com/",
        acces: `"a) Allez sur : https://nowledgeable.com/login
    b) Saisissez votre adresse mail EFREI
    c) Un lien vous sera envoyé pour créer et activer un compte"`,
      },
    ]);
    getData();
  }, []);

  const getData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  return !user ? (
    <Loader />
  ) : (
    <div className="p-4 py-10 bg-gray-100 eh-full flex flex-col gap-5 h-full">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <div className="flex gap-2">
        {user.role === "administrateur" ||
          (user.role === "professeur" && (
            <Button href="/ressource/create" icon={<PlusOutlined />} />
          ))}

        <Button icon={<ReloadOutlined />} onClick={getData} />
        {user.role === "administrateur" && (
          <Select placeholder="Filtrer par statut" style={{ width: 120 }}>
            <Select.Option value="valide">Validé</Select.Option>
            <Select.Option value="en_cours">Proposée</Select.Option>
            <Select.Option value="refuse">Refusé</Select.Option>
          </Select>
        )}
        <Select placeholder="Filtrer par domaine" style={{ width: 250 }}>
          <Select.Option value="codage">Bouquet de services</Select.Option>
          <Select.Option value="design">Codage / Développement</Select.Option>
          <Select.Option value="autre">Autre</Select.Option>
        </Select>
      </div>
      <TableComponent data={data} />
    </div>
  );
};

export default DashboardPage;
