import { Button } from "antd";
import { useUser } from "../hooks/auth";
import { logout } from "../hooks/auth";

const Header = () => {
  const user = useUser();
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between w-full">
      <ul className="flex gap-4">
        <li>
          <Button href="/">Dashboard</Button>
        </li>

        {user && user.role === "administrateur" ? (
          <li>
            <Button href="/users">Utilisateurs</Button>
          </li>
        ) : null}
      </ul>
      <ul>
        {user ? (
          <div className="flex gap-4 items-center text-sm">
            <p>
              Bonjour {user.prenom} {user.nom} !
            </p>
            <li>
              <Button onClick={logout}>Se Déconnecter</Button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Button href="/login">Connexion</Button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
