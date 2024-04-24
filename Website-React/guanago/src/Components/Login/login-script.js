export const handleLogin = async (
  username,
  password,
  setError,
  login,
  navigate
) => {
  const formData = {
    email: username,
    contrasena: password,
  };

  try {
    const response = await fetch(
      "http://localhost:8080/guanago/usuarios/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      setError("Email o contraseña incorrectos");
      throw new Error("Failed to login");
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    login(data); // Llama a la función login del contexto de autenticación
    console.log("Login successful");
    console.log("Token:", data.token);
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
  }
};
