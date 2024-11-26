import React, {useState,useEffect} from 'react'
import './styles/search_users.css';
const search_users = () =>{
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const URL = 'http://localhost:8000/search_users';
  
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
        setCurrentUser(data);  
      } else {
        console.error('Error al obtener información del usuario');
      }
    } catch (error) {
      console.error('Hubo un error al verificar el token:', error);
    }
  };

  const showData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      console.log(data); // Verifica la estructura de los datos recibidos

      // Acceder a la propiedad 'u' de cada objeto en el array
      const userList = data.map(item => item.u);  // Extraemos la propiedad 'u' de cada objeto
      setUsers(userList);  // Actualizamos el estado con los datos correctos
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  };

  const seacher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)

  }
  let results = []
  if(!search){
    //results = users
  }else{
    results = users.filter((dato) =>
    dato.username.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }
   const handleFollow = (user, index) => {
    console.log(`${currentUser.username}Siguiendo a ${user.username} en la posición ${index}`);
    // Aquí puedes agregar la lógica de lo que debe hacer el botón Follow, 
    // como enviar una solicitud a la API o actualizar el estado
  }

  useEffect(() => {
    getUserInfo();
    showData();
  }, []);

  return (
    <div className='container'>
      <input
        value={search}
        onChange={seacher}
        type="text"
        placeholder='Search Username'
        className='form-control'
      />
      <table className="table table-striped table-hover shadow-lg">
        <thead>
          <tr className="bg-curso text-white">
            
          </tr>
        </thead>
        {/* Contenedor de las filas con scroll */}
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
    </div>
  );
};
export default search_users
