import { useParams } from "react-router-dom";

const RessourcePage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Ressource {id}</h1>
    </div>
  );
};

export default RessourcePage;
