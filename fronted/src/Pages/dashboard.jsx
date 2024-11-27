import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';
import User_logo from './icons/user_8647311.png';
import Search_users from '../Components/search_users';
import axios from 'axios';
import Following from '../Components/following'; // Importa el nuevo componente

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/verify/token', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    <div className='sidebar'>
      <h1 id='username'>{userData.username}</h1>
      <img src={User_logo} alt="Logo" width="120" />
      <h2 id='name'>{userData.name} {userData.lastname}</h2>
      <div id = "search_users">
      <Search_users />
      </div>
       <div id = "following">
      <Following username={userData.username} />
      </div>
    </div>
  );
};

export default Dashboard;
