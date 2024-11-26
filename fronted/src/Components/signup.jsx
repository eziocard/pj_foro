import {Navigate,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './styles/signup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Signup(props){
  
  const goTo = useNavigate();
  const [errorResponse,setErrorResponse] = useState("");
  


  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    username: e.target.username.value,
    name: e.target.name.value,
    lastname: e.target.lastname.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const url = "http://127.0.0.1:8000/signup";

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
    // goTo("/login");     
    } catch (error) {
       console.error("Error en la solicitud:", error);
    setErrorResponse("Hubo un error en la solicitud. Intenta nuevamente.");
    }};
   
  return(
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Cuenta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
          <Form.Group className="mb-3" >
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="" name='username'/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text"  placeholder='' name='name'/>
          </Form.Group>
          <Form.Group className="mb-3"  >
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text"  placeholder='' name='lastname'/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="text"  placeholder='' name='email'/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="text"  placeholder='' name='password' />
          </Form.Group>
          <Form.Group>
          <Button variant='outline-danger' type="submit">Ingresar</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
      
/* <>
    <h1 id = 'titulo'>Sign up</h1>

      <form className = "form" onSubmit={handleSubmit}>
         {!!errorResponse && <div className = "errorMessage">{errorResponse}</div>}
        <div className = 'form-group'>
          <label>username</label>
          <input type='text' name='username' required></input>
        </div>
        <div className = 'form-group'>
          <label>name</label>
          <input type='text' name='name'  required></input>
        </div>
         <div className = 'form-group'>
          <label>lastname</label>
          <input type='text' name='lastname'  required></input>
        </div>

        <div className = 'form-group'>
          <label>email</label>
          <input type='email' name='email'  required></input>
        </div>
        <div className = 'form-group'>
          <label>password</label>
          <input type='password' name='password' required></input>:
        </div>

        <button type='submit'>ready</button>
      </form>
 
  </> */ 

  )
}
