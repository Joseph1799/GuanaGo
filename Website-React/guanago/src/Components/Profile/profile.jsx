import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./profile.css";


const idioma = {
  en: {
    language: "Language",
    // Otros textos en inglés...
  },
  es: {
    language: "Idioma",
    // Otros textos en español...
  }
};

const textos = {
  en: {
    preferences: "Preferences",
    currency: "Currency",
    language: "Language",
    accessibility: "Accessibility Requirements",
    datosPersonales: "Personal Data",
    preferencias: "Preferences",
    datosDePago: "Payment Information",
    actualizar: "Update",
    guardar: "Save",
    nombre: "Name",
    apellido: "Last Name",
    correoElectronico: "Email",
    nuevaContrasena: "New Password",
    cambiarContrasena: "Change Password",
    // Agrega más palabras aquí según sea necesario
  },
  es: {
    preferences: "Preferencias",
    currency: "Moneda",
    language: "Idioma",
    accessibility: "Requisitos de Accesibilidad",
    datosPersonales: "Datos personales",
    preferencias: "Preferencias",
    datosDePago: "Datos de pago",
    actualizar: "Actualizar",
    guardar: "Guardar",
    nombre: "Nombre",
    apellido: "Apellido",
    correoElectronico: "Correo Electrónico",
    nuevaContrasena: "Nueva Contraseña",
    cambiarContrasena: "Cambiar contraseña",
    // Agrega más palabras aquí según sea necesario
  }
};


const Profile = () => {


  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [newPassword, setNewPassword] = useState('');

  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  const [activeSection, setActiveSection] = useState('datos-personales');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/guanago/usuarios/datos-usuario", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          // Actualiza el estado con los datos del usuario
          setProfileData({
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            email: data.email || '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    };

    fetchUserData();
  }, []);

  const translateContent = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'AIzaSyA2-q3jpNjbRR0dW9tGJICK5mYhMqEeZZo', // Secure this properly
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
      }
      );
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // Fallback to the original text if translation fails
    }
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  // Función para cambiar la sección activa
  const changeSection = (section) => {
    setActiveSection(section);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch("http://localhost:8080/guanago/usuarios/editar-usuario", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: profileData.nombre,
            apellido: profileData.apellido,

          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        Swal.fire({
          title: '¡Éxito!',
          text: 'Perfil actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el perfil.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró un token de sesión.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    // Mostrar un diálogo de confirmación con SweetAlert
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Estás a punto de cambiar tu contraseña.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar contraseña',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem('token'); // Obtén el token de localStorage
      if (token) {
        try {
          // Aquí, utiliza el endpoint específico para cambiar la contraseña
          const response = await fetch("http://localhost:8080/guanago/usuarios/editar-contrasena", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              contrasena: newPassword // Usa el estado newPassword
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Si la actualización fue exitosa, muestra un SweetAlert
          Swal.fire(
            '¡Contraseña cambiada!',
            'Tu contraseña ha sido actualizada con éxito.',
            'success'
          );

          // Restablece el campo de contraseña o realiza más acciones aquí

        } catch (error) {
          console.error('Error changing password:', error);
          Swal.fire(
            'Error',
            'No se pudo cambiar la contraseña.',
            'error'
          );
        }
      } else {
        Swal.fire(
          'Error',
          'No se encontró un token de sesión.',
          'error'
        );
      }
    }
  };


  return (
    <div className="profile-container">
    <aside className="sidebar">
      {/* Lista de opciones de navegación para la sección del perfil */}
      <ul>
        <li onClick={() => changeSection('datos-personales')}>{textos[currentLanguage].datosPersonales}</li>
        <li onClick={() => changeSection('preferencias')}>{textos[currentLanguage].preferencias}</li>
        <li onClick={() => changeSection('datos-de-pago')}>{textos[currentLanguage].datosDePago}</li>
      </ul>
    </aside>
  
    <main className="profile-content">
      {activeSection === 'datos-personales' && (
        <div id="datos-personales">
          <h2>{textos[currentLanguage].datosPersonales}</h2>
          <p>{textos[currentLanguage].actualizar} tus datos</p>
          {/* Formulario con los campos del usuario */}
          <form onSubmit={handleUpdateProfile}>
            {/* Cada entrada de información se podría poner en un componente separado */}
            <div className="input-group">
              <label htmlFor="nombre">{textos[currentLanguage].nombre}</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={profileData.nombre}
                onChange={(e) => setProfileData({ ...profileData, nombre: e.target.value })}
              />
            </div>
  
            <div className="input-group">
              <label htmlFor="apellido">{textos[currentLanguage].apellido}</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={profileData.apellido}
                onChange={(e) => setProfileData({ ...profileData, apellido: e.target.value })}
              />
            </div>
  
            <div className="input-group">
              <label htmlFor="correo">{textos[currentLanguage].correoElectronico}</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
  
            <div className="button-group">
              <button type="submit">{textos[currentLanguage].guardar}</button>
            </div>
          </form>
          <form onSubmit={handleChangePassword}>
            <div className="input-group">
              <label htmlFor="contrasena">{textos[currentLanguage].nuevaContrasena}</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="submit">{textos[currentLanguage].cambiarContrasena}</button>
            </div>
          </form>
        </div>
      )}
  
      {activeSection === 'preferencias' && (
        <div id="preferencias">
          <div className="preferencias-container">
            <h2>{textos[currentLanguage].preferencias}</h2>
            <div className="preferencia-item">
              <label>{textos[currentLanguage].currency}</label>
              <div className="preferencia-info">
                <button>{textos[currentLanguage].actualizar}</button>
              </div>
            </div>
            <div className="preferencia-item">
              <label>{textos[currentLanguage].language}</label>
              <div className="preferencia-info">
                <select value={currentLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
            <div className="preferencia-item">
              <label>{textos[currentLanguage].accessibility}</label>
              <div className="preferencia-info">
                <button>{textos[currentLanguage].actualizar}</button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {activeSection === 'datos-de-pago' && (
        <div id="datos-de-pago">
          <div className="datos-pago-container">
            <h2>{textos[currentLanguage].datosDePago}</h2>
            <p>{textos[currentLanguage].añadirEliminarMetodosPago}</p>
            <div className="metodos-pago">
              <div className="tarjetas-pago">
                {/* Listado de tarjetas de pago, cada tarjeta sería un componente o div */}
                <h3>{textos[currentLanguage].tarjetasDePago}</h3>
                {/* Iterar sobre las tarjetas de pago aquí */}
              </div>
              <button className="btn">{textos[currentLanguage].añadirTarjeta}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  </div>
  
  );
};


export default Profile;
