import { useUser } from "./commons/hooks/auth";
import routes from "./commons/routes";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/page";

const Routing = () => {
  const user = useUser();

  return (
    <Routes>
      {routes.map((route) => {
        if (route.protected) {
          if (user && route.roles.includes(user.role)) {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={<route.component />}
              />
            );
          }
        } else {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          );
        }
      })}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default Routing;
