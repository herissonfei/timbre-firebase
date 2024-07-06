import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";

import logo from "../../img/png/logo.png";

export const Login = () => {
  const { t } = useTranslation();

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
          <h2>{t("Log_in")}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">{t("E_mail")}</label>
            <input type="text" id="email" name="email" required />

            <label htmlFor="password">{t("Password")}</label>
            <input type="password" id="password" name="password" required />

            <input
              type="submit"
              value={t("Log_in")}
              className="login_submit"
            />
            {err && <span>{t("Incorrect")}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};
