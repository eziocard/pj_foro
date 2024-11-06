import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
 
      <nav>
        <ul>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

    </>
  )
}

export default App
