import { useUser } from "./commons/hooks/auth";
import routes from "./commons/routes";
import { Button } from "antd";
import { Routes, Route } from "react-router-dom";

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
      <Route
        path="*"
        element={
          <>
            <h1>404 Not Found</h1>
            <Button type="link" href="/login">
              Login
            </Button>
          </>
        }
      />
    </Routes>
  );
};

export default Routing;
