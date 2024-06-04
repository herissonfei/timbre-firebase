import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo from "../../img/png/logo.png";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courriel = e.target[0].value;
    const motDePasse = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, courriel, motDePasse);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="loginDiv">
      <div>
        <div className="returnLogo">
          <Link to="/home">
            <img
              width="200"
              className="returnImg"
              src={logo}
              alt="logo Stampee"
            />
          </Link>
        </div>
        <div className="login-box">
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Courriel</label>
            <input type="text" id="email" name="email" required />

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />

            <input
              type="submit"
              value="Se Connecter"
              className="login_submit"
            />
            {err && <span>E-mail ou mot de passe incorrect</span>}
          </form>
        </div>
      </div>
    </div>
  );
};
