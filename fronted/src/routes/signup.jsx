import {Navigate,useNavigate} from 'react-router-dom';

export default function Signup(){
  
  const goTo = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    username: e.target.username.value,
    age: e.target.age.value,
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
      // Si la respuesta no es 200-299, lanzar un error
      
    }

    const responseData = await response.json();
    console.log("Respuesta de la API:", responseData);
    goTo("/login");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
   
  return(
  <>
    <h1>Sign up</h1>
    <form className = "form" onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input type='text' name='username' required></input>
        </div>
        <div>
          <label>age</label>
          <input type='number' min='18' name='age'  required></input>
        </div>
        <div>
          <label>email</label>
          <input type='email' name='email'  required></input>
        </div>
        <div>
          <label>password</label>
          <input type='password' name='password' required></input>
        </div>

        <button type='submit'>ready</button>
      </form>
 
  </>
  )
}
