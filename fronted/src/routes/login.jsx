import {Navigate,useNavigate} from 'react-router-dom';
import './styles/login.css';
import { useState } from 'react';


export default function Login(){

 const [errorResponse,setErrorResponse] = useState("");
 const goTo = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  const url = "http://127.0.0.1:8000/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Comprobar si la respuesta fue exitosa
   if (!response.ok) {

      const errorData = await response.json();
      setErrorResponse(errorData.detail || "Error desconocido al procesar los datos.");
      return;       
    }

  const responseData = await response.json();
  console.log("Respuesta de la API:", responseData);
  goTo("/login");     
  } catch (error) {
     console.error("Error en la solicitud:", error);
  setErrorResponse("Hubo un error en la solicitud. Intenta nuevamente.");
  }};


  return(
  <>
    <h1 id = 'titulo'>Login</h1>
    <form onSubmit={handleSubmit}>
      {!!errorResponse && <div className = "errorMessage">{errorResponse}</div>}
      <div className = 'form-group'>
          <label>Username</label>
          <input type= 'text' name = 'username' required></input>
        </div>

      <div className = 'form-group'>
        <label>Password</label>
        <input type ='password' name = 'password'required></input>
      </div>

        <button type = 'submit' >Login</button>
    </form>

  </>
  )
}
