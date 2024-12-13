import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    }

    // TEMP
    setUser({
      prenom: "John",
      nom: "Doe",
      role: "etudiant",
    });
  }, []);
  return { user };
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export { useUser, logout };
