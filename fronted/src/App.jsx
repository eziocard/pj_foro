import styles from './App.module.css'
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <div id = {styles.contenedor}>
        <h1 id = {styles.titulo}>Foro web</h1>
        <div>
          <button className = {styles.button}><Link className = {styles.a} to="/signup">Sign up</Link></button>
          <button className= {styles.button}><Link className = {styles.a} to="/login">Login</Link></button>
        </div> 
      </div>

    </>
  )
}

export default App
