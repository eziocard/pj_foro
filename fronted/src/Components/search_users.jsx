import React, { useState, useEffect } from 'react';
import './styles/search_users.css';
import axios from 'axios';

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const URL = 'http://localhost:8000/search_users';

  // Obtener la información del usuario actual (username) usando el token
  const getUserInfo = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found');
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
        setCurrentUser(data);  // Guardamos la información del usuario logeado
      } else {
        console.error('Error al obtener información del usuario');
      }
    } catch (error) {
      console.error('Hubo un error al verificar el token:', error);
    }
  };

  // Obtener usuarios desde la API
  const showData = async (username) => {
    try {
      const response = await fetch(`${URL}/${username}`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      console.log(data); // Verifica la estructura de los datos recibidos

      // Procesar los datos de los usuarios
      const userList = data.map(item => item.u);  // Extraemos la propiedad 'u' de cada objeto
      setUsers(userList);  // Actualizamos el estado con los datos correctos
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleFollow = async (user, index) => {
    console.log(`${currentUser.username} siguiendo a ${user.username} en la posición ${index}`);
    
    const follower = currentUser.username;
    const followee = user.username;

    // Obtener el token desde el localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/make_follow', {
        follower,
        followee
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Añadir el token en los encabezados
        }
      });
      console.log('Respuesta de la API:', response.data);
    } catch (err) {
      console.error('Error al hacer el seguimiento', err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (currentUser) {
      showData(currentUser.username);
    }
  }, [currentUser]);

  // Filtrar usuarios según el término de búsqueda
  const results = search
    ? users.filter((dato) => dato.username.toLowerCase().includes(search.toLowerCase()))
    : users;
  
  const showNoResultsMessage = search && results.length === 0;
  return (
    <div className='container'>
      <input
        value={search}
        onChange={searchHandler}
        type="text"
        placeholder='Search Username'
        className='form-control'
      />
    {showNoResultsMessage && <p>No se encontraron resultados para "{search}"</p>}
      {results.length > 0 && (
      <table className="table table-striped table-hover shadow-lg">
        <thead>
          <tr className="bg-curso text-white">
          
          </tr>
        </thead>
        <tbody style={{ display: 'block', maxHeight: '200px', overflowY: 'auto' }}>
          {results.map((user, index) => (
            <tr key={index} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
              <td>{user.username}</td>
              <td>
                <button 
                  onClick={() => handleFollow(user, index)} 
                  className="btn btn-primary"
                >
                  Follow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default SearchUsers;

