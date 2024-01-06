import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {

  const (email, setEmail) = useState("")
  const (password, setPassword) = useState("")

async function submit(e){
  e.preventDefault()
  try{
await axios.post("http://127.0.0.1:3000/api/v1/users/login",{email, password})
  }catch(e){
console.log(e)
  }
}

  return (
    <div>
      <h1>Login</h1>
      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          name=""
          id=""
        />
        <input
          type="password"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Password"
          name=""
          id=""
        />
        <input type="submit" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Login;
