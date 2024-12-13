import { useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>EditUser {id}</h1>
    </div>
  );
};

export default EditUserPage;
