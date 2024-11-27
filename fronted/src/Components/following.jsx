import React, { useState, useEffect } from 'react';

const Following = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]); // Estado para los seguidores
  const [error, setError] = useState(null);

  // Obtener la información del usuario actual (nombre de usuario) usando el token
  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/verify/token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data); // Guardamos la información del usuario logeado
      } else {
        console.error('Error al obtener información del usuario');
      }
    } catch (error) {
      console.error('Hubo un error al verificar el token:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los seguidores del usuario
  const getFollowers = async (username) => {
    try {
      const response = await fetch(`http://localhost:8000/followers/${username}`);
      if (response.ok) {
        const data = await response.json();
        setFollowers(data);  // Guardamos los usernames de los seguidores
      } else {
        setError('Error al obtener los seguidores');
      }
    } catch (error) {
      setError('Hubo un error al obtener los seguidores');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getFollowers(currentUser.username); // Obtener los seguidores si ya tenemos el usuario
    }
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <p>No se encontró el usuario o no estás logueado.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 style={{color: 'black'}}>Following</h2>
      
      {/* Mostrar la tabla de seguidores */}
      <table className="table table-striped table-hover shadow-lg">
        <thead>
          <tr className="bg-curso text-white">
          </tr>
        </thead>
        <tbody>
          {followers.length > 0 ? (
            followers.map((follower, index) => (
              <tr key={index}>
                <td>{follower}</td> 

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="1">No tienes seguidores</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Following;

