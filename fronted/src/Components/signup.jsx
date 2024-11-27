import {Navigate,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './styles/signup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Signup({ onSignupSuccess, ...props }) {
  const goTo = useNavigate();
  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      if (!response.ok) {
        const errorData = await response.json();
        setErrorResponse(errorData.detail || "Hubo un problema al registrarse.");
        return;
      }

      const responseData = await response.json();
      console.log("Respuesta de la API:", responseData);
      setErrorResponse("");
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      if (onSignupSuccess) onSignupSuccess(); // Notifica al padre
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorResponse(
        error.message.includes("Failed to fetch")
          ? "No se pudo conectar con el servidor. Verifica tu conexión a Internet."
          : "Hubo un error inesperado. Intenta nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Crear Cuenta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="" name="username" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="" name="name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="" name="lastname" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="" name="email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="" name="password" required />
          </Form.Group>
          <Button variant="outline-danger" type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Crear Cuenta"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}