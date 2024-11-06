import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Login from "./routes/login"
import Signup from "./routes/signup"
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
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
);
