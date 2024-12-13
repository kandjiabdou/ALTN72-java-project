import { useParams } from "react-router-dom";

const EditRessourcePage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Ressource {id}</h1>
    </div>
  );
};

export default EditRessourcePage;
