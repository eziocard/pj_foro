import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import App from './App.jsx'
import Login from "./Components/login"
import Signup from "./Components/signup"
import Dashboard from './Pages/dashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/signup",
    element: <Signup />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/dashboard",
    element: <Dashboard />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
);
