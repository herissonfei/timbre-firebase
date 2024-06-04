import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../img/png/logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nom = e.target[0].value;
    const courriel = e.target[1].value;
    const motDePasse = e.target[2].value;

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(
        auth,
        courriel,
        motDePasse
      );

      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        nom: nom,
        courriel: courriel,
        motDePasse: motDePasse,
      });

      navigate("/login");
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
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" name="nom" required />
            <label htmlFor="email">Courriel</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />

            <input
              type="submit"
              value="Crée un compte"
              className="login_submit"
            />
            {err && <span>Something went wrong</span>}
          </form>
        </div>
      </div>
    </div>
  );
};
