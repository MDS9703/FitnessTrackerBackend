import React from "react";
import { useState } from "react";
import { registerUser } from "../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div id="registerform">
      <h2>Register!</h2>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const token = await registerUser(username, password);
            setToken(token);
            localStorage.setItem("token", token);
            console.log("this is token in register", token);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div id="inputs">
          <input
            type="text"
            id="Userreg"
            value={username}
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <label htmlFor="Userreg">Username</label>
          <input
            type={passwordShown ? "text" : "password"}
            id="Passwordreg"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
          <label htmlFor="password">Password - must be 8 characters</label>
          <button id="buttonreg" type="submit">
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;