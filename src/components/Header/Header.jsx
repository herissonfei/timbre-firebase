import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/png/logo.png";
import dropdownArrowBlue from "../../img/png/icone-dropdown-arrow-blue.png";
import { AuthContext } from "../../context/AuthContext";
import { MenuContext } from "../../context/MenuContext";
import "./Header.css";
import { db, auth } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import LanguageSwitcher from "../../LanguageSwitcher";
import { useTranslation } from "react-i18next";

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

  const { toggleMenu } = useContext(MenuContext);
  const { t } = useTranslation();

  return (
    <div>
      <header className="header header--bg">
        <div className="wrapper--header">
          <Link to="/home">
            <img className="header__logo" src={logo} alt="logo Stampee" />
          </Link>
          <div className="input-bar">
            <div className="input-bar__text">
              <p>{t("Advanced")} </p>
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
              placeholder={t("Find")}
            />
          </div>
          {/* ------------------------------------- */}
          {/* <LanguageSwitcher /> */}
          {currentUser ? (
            <ul className="wrapper--header menu__sous-menu menu__sous-menu--header--login">
              <div>
                <li style={{ marginTop: "22px" }}>
                  {" "}
                  <LanguageSwitcher />
                </li>
              </div>

              <div>
                <li className="menu__item divid">
                  <Link className="navEntete-link" to="#">
                    {t("Hi")} {user.nom}
                  </Link>
                </li>
                <li className="menu__item divid">
                  <Link className="navEntete-link" to="/publish">
                    {t("post")}
                  </Link>
                </li>
              </div>

              <div>
                <li className="menu__item">
                  <Link className="" onClick={() => signOut(auth)}>
                    {t("Sign_out")}
                  </Link>
                </li>

                <li className="menu__item">
                  <Link className="navEntete-link" to="/listePrive">
                    {t("my_auctions")}
                  </Link>
                </li>
              </div>
            </ul>
          ) : (
            <ul className="wrapper--header menu__sous-menu menu__sous-menu--header">
              <li>
                {" "}
                <LanguageSwitcher />
              </li>
              <li className="menu__item">
                <Link to="/login">{t("Log_in")}</Link>
              </li>
              <li className="menu__item">
                <Link to="/register">{t("Become_a_member")}</Link>
              </li>
            </ul>
          )}
        </div>
      </header>
      <nav className="menu">
        <div className="menu__logo">
          <a href="/home">
            <img src={logo} alt="logo Stampee" />
          </a>
        </div>
        <div className="input-bar input-bar--tablet">
          <div className="input-bar__text">
            <p>{t("Advanced")}</p>
            <img
              className="icone-dropdown-arrow icone-dropdown-arrow--input-bar"
              src={dropdownArrowBlue}
              alt="fleche dropwdown"
            />
          </div>
          <input
            className="input-bar__input"
            type="text"
            id="input-bar-tablet"
            name="input-bar"
            placeholder="Trouvez une enchère"
          />
        </div>
        <button
          className="burger"
          onClick={toggleMenu}
          aria-label="burger"
          data-js-burger
        >
          <span className="burger__bar"></span>
          <span className="burger__bar"></span>
          <span className="burger__bar"></span>
        </button>
      </nav>
    </div>
  );
};
