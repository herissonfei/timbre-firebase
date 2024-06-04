import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/png/logo.png";
import dropdownArrowBlue from "../../img/png/icone-dropdown-arrow-blue.png";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";
import { db, auth } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  // console.log(auth);
  // console.log(currentUser);
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const getUser = () => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setUser(doc.data());
        });

        return () => {
          unsub();
        };
      };

      getUser();
    }
  }, [currentUser]);
  return (
    <div>
      <header className="header header--bg">
        <div className="wrapper--header">
          <Link to="/home">
            <img className="header__logo" src={logo} alt="logo Stampee" />
          </Link>
          <div className="input-bar">
            <div className="input-bar__text">
              <p>Avancée</p>
              <img
                className="icone-dropdown-arrow icone-dropdown-arrow--input-bar"
                src={dropdownArrowBlue}
                alt="fleche dropwdown"
              />
            </div>
            <input
              className="input-bar__input"
              type="text"
              id="input-bar"
              name="input-bar"
              placeholder="Trouvez une enchère"
            />
          </div>
          {/* ------------------------------------- */}
          <button className="burger" aria-label="burger" data-js-burger>
            <span className="burger__bar"></span>
            <span className="burger__bar"></span>
            <span className="burger__bar"></span>
          </button>
          {currentUser ? (
            <ul className="wrapper--header menu__sous-menu menu__sous-menu--header--login">
              <div>
                <li className="menu__item divid">
                  <Link className="navEntete-link" to="#">
                    Bonjour {user.nom}
                  </Link>
                </li>
                <li className="menu__item divid">
                  <Link className="navEntete-link" to="/publish">
                    publier une enchère
                  </Link>
                </li>
              </div>

              <div>
                <li className="menu__item">
                  <Link className="" onClick={() => signOut(auth)}>
                    Se déconnecter
                  </Link>
                </li>

                <li className="menu__item">
                  <Link className="navEntete-link" to="/listePrive">
                    mes enchères
                  </Link>
                </li>
              </div>
            </ul>
          ) : (
            <ul className="wrapper--header menu__sous-menu menu__sous-menu--header">
              <li className="menu__item">
                <Link to="/login">Se connecter</Link>
              </li>
              <li className="menu__item">
                <Link to="/register">Devenir membre</Link>
              </li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};
