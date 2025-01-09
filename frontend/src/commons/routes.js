import DashboardPage from "../pages/dashboard/page";
import LoginPage from "../pages/login/page";
import RessourcePage from "../pages/ressource/page";
import CreateRessourcePage from "../pages/ressource/create/page";
import EditRessourcePage from "../pages/ressource/edit/page";
import UsersPage from "../pages/users/page";
import CreateUserPage from "../pages/users/create/page";
import EditUserPage from "../pages/users/edit/page";

const routes = [
    {
        name: "dashboard",
        path: "/",
        protected: true,
        roles: ["ADMIN", "PROF", "ETUDIANT"],
        component: DashboardPage,
    },
    {
        name: "login",
        path: "/login",
        protected: false,
        roles: [],
        component: LoginPage,
    },
    {
        name: "createUser",
        path: "/users/create",
        protected: true,
        roles: ["ADMIN"],
        component: CreateUserPage,
    },
    {
        name: "ressource",
        path: "/ressource/:id",
        protected: true,
        roles: ["ADMIN", "PROF", "ETUDIANT"],
        component: RessourcePage,
    },
    {
        name: "createRessource",
        path: "/ressource/create",
        protected: true,
        roles: ["ADMIN", "PROF"],
        component: CreateRessourcePage,
    },
    {
        name: "editRessource",
        path: "/ressource/edit/:id",
        protected: true,
        roles: ["ADMIN"],
        component: EditRessourcePage,
    },
    {
        name: "users",
        path: "/users",
        protected: true,
        roles: ["ADMIN"],
        component: UsersPage,
    },
    {
        name: "editUser",
        path: "/users/edit/:id",
        protected: true,
        roles: ["ADMIN"],
        component: EditUserPage,
    },
];

export default routes;