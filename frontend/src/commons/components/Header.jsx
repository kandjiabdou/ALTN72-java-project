import { Button } from "antd";
import routes from "../routes";
import { useUser } from "../hooks/auth";
import { logout } from "../hooks/auth";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <ul className="flex gap-2">
        {routes.map((route) => {
          return (
            <li key={route.id}>
              <Button href={route.path}>{route.name}</Button>
            </li>
          );
        })}
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
            <li>
              <Button href="/register">Inscription</Button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
