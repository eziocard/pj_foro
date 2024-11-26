import Login from '../Components/login';
import Signup from '../Components/signup';
import './styles/Login-Signup.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Home() {

  const [modalShowS, setModalShowS] = useState(false);
  const [modalShowL, setModalShowL] = useState(false);

  return (
    <Container fluid style={{ height: '100vh' }}>

      <Row style={{ display: 'flex', height: '100%' }}>
        
        <Col className='izquierda'>
        <img src="https://tienda.uautonoma.cl/wp-content/uploads/2024/10/pumin_chatbox.png" className="img-fluid" ></img>
        <div className='divider'></div>
        </Col>

        
        <Col className='derecha'>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => setModalShowS(true)}>
                Crear Cuenta
              </Button>
              <Signup
                show={modalShowS}
                onHide={() => setModalShowS(false)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => setModalShowL(true)}>
                Iniciar Sesion
              </Button>
              <Login
                show={modalShowL}
                onHide={() => setModalShowL(false)}
              />
            </Col>
          </Row>          
        </Col>        
      </Row>      
    </Container>
  );
}
  
  export default Home
