import React, { useState } from "react";
import { LoginUser } from "../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  // const [error, setError] = useState(null)
  // const [pass, setPass] = useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div id="loginform">
      <h2>Login!</h2>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const token = await LoginUser(username, password);
            setToken(token);
            localStorage.setItem("token", token);
            const redirToMyRoutines = () => {
              window.location.href = "/myroutines";
            };
            redirToMyRoutines();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div id="login-inputs">
          <input
            type="text"
            id="User-login"
            value={username}
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <label htmlFor="Userreg">Username</label>
          <input
            type={passwordShown ? "text" : "password"}
            id="Password-login"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
          <label htmlFor="password">Password</label>
          {/* <input onChange={handleChange} />
          {pass.length > 8 ? <p>Password is ok</p> : <p>Too short</p>} */}
          <button id="button-login" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;