import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RefreshTokenComponent = () => {
  const [token, setToken] = useState('');

  // Función para llamar al endpoint de refresco del token
  const refreshToken = async () => {
    try {
      const response = await axios.get('/api/auth/refresh');
      const newToken = response.data.token; // Suponiendo que la respuesta del servidor contiene el nuevo token
      setToken(newToken);
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      // Manejar el error según sea necesario
    }
  };

  // Llamar a refreshToken al cargar el componente
  useEffect(() => {
    refreshToken();
  }, []);

  // Llamar a refreshToken cada vez que el token se actualice
  useEffect(() => {
    const tokenUpdateHandler = () => {
      refreshToken();
    };
    
    // Escuchar eventos de actualización del token (por ejemplo, usando un estado global)
    // Aquí asumimos que hay un evento 'tokenUpdate' que se emite cuando el token se actualiza
    // Puedes ajustar esto según cómo estés manejando los cambios de token en tu aplicación
    document.addEventListener('tokenUpdate', tokenUpdateHandler);

    return () => {
      document.removeEventListener('tokenUpdate', tokenUpdateHandler);
    };
  }, [token]); // Escucha cambios en el token

  return (
    <div>
      <h1>Token de acceso: {token}</h1>
      {/* Aquí puedes mostrar el token o realizar otras acciones con él */}
    </div>
  );
};

export default RefreshTokenComponent;