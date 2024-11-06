import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <div id = "contenedor">
        <h1 id = "titulo">Foro web</h1>
        <div id = "buttons">
          <button><Link to="/signup">Sign up</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div> 
      </div>

    </>
  )
}

export default App
