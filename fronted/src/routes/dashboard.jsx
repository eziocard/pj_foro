import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Verificar si el token existe
    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    // Función para obtener los datos del usuario
    const fetchUserData = async () => {
      try {
        // Hacer la solicitud al endpoint para verificar y obtener los datos del usuario
        const response = await axios.post('http://localhost:8000/verify/token', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Aquí asumimos que el backend devuelve los datos del usuario
        if (response.data) {
          setUserData(response.data);
        }
      } catch (err) {
        setError('Error al obtener los datos del usuario o el token es inválido.');
      }
    };

    fetchUserData();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Dashboard de {userData.name}</h1>
      <p>Nombre: {userData.name} {userData.lastname}</p>
      <p>Correo electrónico: {userData.email}</p>
      <p>Usuario: {userData.username}</p>
      {/* Aquí puedes agregar más información que desees mostrar */}
    </div>
  );
};

export default Dashboard;

