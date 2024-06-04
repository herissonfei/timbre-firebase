import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../img/png/logo.png";
export const Footer = () => {
  return (
    <footer className="footer">
      <img width="150" src={logo} alt="logo Stampee" />
      <div className="wrapper grid grid--3-var-footer footer--border-white">
        <section>
          <h2>Accès rapides</h2>
          <ul className="footer__menu">
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Actualités
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                La philatélie, c'est la vie
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Biographie du Lord
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Historique familial
              </Link>
            </li>
          </ul>
          {/* <!-- Connexion/Inscription --> */}
          <ul className="wrapper--header menu__sous-menu menu__sous-menu--footer">
            <li className="menu__item">
              <Link to="login" className="menu__link">
                Se connecter
              </Link>
            </li>
            <li className="menu__item">
              <Link to="register" className="menu__link">
                Devenir membre
              </Link>
            </li>
          </ul>
          <br />
          <small>© Stampee 2024, Tous droits réservés</small>
        </section>

        <section>
          <h2>Abonnez-vous à notre infolettre !</h2>
          <p className="tile__text tile__text--white">
            Prenez connaissance en avance de toutes nos nouveautés et profiter
            d'offres exceptionnels !
          </p>
          <form action="#" method="POST">
            <div className="input-bar">
              <input
                className="input-bar__input"
                type="text"
                id="input-bar-footer"
                name="input-bar"
                placeholder="Entrez votre courriel"
              />
              <div className="input-bar__text">
                <p>S'abonner</p>
              </div>
            </div>
          </form>
          <i className="fab fa-brands fa-facebook-square fa-lg icone-social"></i>
          <i className="fab fa-brands fa-twitter-square fa-lg icone-social"></i>
          <i className="fab fa-instagram fa-lg icone-social"></i>
        </section>

        <section>
          <h2>Contact & support</h2>
          <ul className="footer__menu">
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Termes et conditions
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Aide
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Contactez le webmestre
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                Contactez-nous
              </Link>
            </li>
          </ul>
          <address>
            {/* <!-- Adresse --> */}
            <p>
              1748 Princes St, Richmond <br /> TW9 1ED, Royaume-Uni
            </p>
            {/* <!-- Telephone --> */}
            <p>
              <Link to="tel:442089402218">+442089402218</Link>
            </p>
            {/* <!-- Courriel --> */}
            <p>
              <Link
                to="mailto:contact.info@stampee.co.uk"
                className="menu__link"
              >
                contact.info@stampee.co.uk
              </Link>
            </p>
          </address>
        </section>
      </div>
    </footer>
  );
};
