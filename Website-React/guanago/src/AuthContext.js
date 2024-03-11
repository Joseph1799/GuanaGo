import React, { createContext, useContext, useState } from "react";

// Crear un contexto para manejar la autenticación
const AuthContext = createContext();

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar si el usuario está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Función para iniciar sesión
  const login = () => {
    // Almacenar en el localStorage que el usuario está autenticado
    localStorage.setItem("isLoggedIn", "true");
    // Actualizar el estado para reflejar que el usuario está autenticado
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    // Almacenar en el localStorage que el usuario no está autenticado
    localStorage.setItem("isLoggedIn", "false");
    // Actualizar el estado para reflejar que el usuario no está autenticado
    setIsLoggedIn(false);
    alert("Sesión cerrada");
  };

  // Devolver el contexto con el valor del estado de autenticación y las funciones de login y logout
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
