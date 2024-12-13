import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./commons/layout";
import Routing from "./Routing";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routing />
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
