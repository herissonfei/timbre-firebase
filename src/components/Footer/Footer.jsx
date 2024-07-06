import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import "./Footer.css";
import logo from "../../img/png/logo.png";
export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <img width="150" src={logo} alt="logo Stampee" />
      <div className="wrapper grid grid--3-var-footer footer--border-white">
        <section>
          <h2>{t("Quick_access")}</h2>
          <ul className="footer__menu">
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("News")}
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("Philately_is_life")}
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("Lords_biography")}
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("Family_history")}
              </Link>
            </li>
          </ul>
          {/* <!-- Connexion/Inscription --> */}
          <ul className="wrapper--header menu__sous-menu menu__sous-menu--footer">
            <li className="menu__item">
              <Link to="login" className="menu__link">
                {t("Log_in")}
              </Link>
            </li>
            <li className="menu__item">
              <Link to="register" className="menu__link">
                {t("Become_a_member")}
              </Link>
            </li>
          </ul>
          <br />
          <small>© {t("Stampee_2024")}</small>
        </section>

        <section>
          <h2>{t("Subscribe_to_our_newsletter")}</h2>
          <p className="tile__text tile__text--white">
            {t("Get_early_access")}
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
                <p> {t("Subscribe")}</p>
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
                {t("Terms_conditions")}
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("Help")}
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("Contact_the_webmaster")}
              </Link>
            </li>
            <li className="menu__item menu__item--footer">
              <Link to="#" className="menu__link">
                {t("Contact_us")}
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
