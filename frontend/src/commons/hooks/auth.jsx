import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    }

    //REMOVE THIS
    // setUser({
    //   prenom: "John",
    //   nom: "Doe",
    //   role: "ADMIN",
    // });
  }, []);
  return user;
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export { useUser, logout };
