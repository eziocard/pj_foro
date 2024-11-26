import {Navigate,useNavigate} from 'react-router-dom';
import './styles/login.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Login(props){

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
  localStorage.setItem("token", responseData.token);
    goTo("/dashboard");  
  } catch (error) {
     console.error("Error en la solicitud:", error);
  setErrorResponse("Hubo un error en la solicitud. Intenta nuevamente.");
  }};


  return(
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Iniciar Sesion
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
          <Form.Group className="mb-3" >
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="" name='username' required/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password"  placeholder='' name='password' required/>
          </Form.Group>
          <Form.Group>
          <Button variant='outline-danger' type="submit">Ingresar</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  // <>
  //   <h1 id = 'titulo'>Login</h1>
  //   <form onSubmit={handleSubmit}>
  //     {!!errorResponse && <div className = "errorMessage">{errorResponse}</div>}
  //     <div className = 'form-group'>
  //         <label>Username</label>
  //         <input type= 'text' name = 'username' required></input>
  //       </div>

  //     <div className = 'form-group'>
  //       <label>Password</label>
  //       <input type ='password' name = 'password'required></input>
  //     </div>

  //       <button type = 'submit' >Login</button>
  //   </form>
    
  // </>
  
  )
}
