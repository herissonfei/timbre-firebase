import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "../../LanguageSwitcher";
import dropdownArrow from "../../img/png/icone-dropdown-arrow.png";
export const Nav = () => {
  const { t } = useTranslation();

  return (
    <div>
      <nav className="menu">
        {/* <!-- menu principal --> */}
        <ul className="menu__list menu__list--principal">
          <li className="menu__item menu__item--principal">
            <Link className="menu__link" to="/catalogue">
              {t("catalog")}
            </Link>
            <ul className="menu__dropdown">
              <li className="menu__item">
                <Link className="menu__link" to="/catalogue">
                  {t("progress")}
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="catalogue-enchere.html">
                  Archive
                </Link>
              </li>
            </ul>
            <img
              className="icone-dropdown-arrow"
              src={dropdownArrow}
              alt="fleche dropwdown"
            />
          </li>
          <li className="menu__item menu__item--principal">
            <Link className="menu__link" to="#">
              {t("Functioning")}
            </Link>
            <ul className="menu__dropdown">
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  {t("Terms_conditions")}
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  {t("Help")}
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  {t("Contact_the_webmaster")}
                </Link>
              </li>
            </ul>
            <img
              className="icone-dropdown-arrow"
              src={dropdownArrow}
              alt="fleche dropwdown"
            />
          </li>
          <li className="menu__item menu__item--principal">
            <Link className="menu__link" to="#">
              {t("propos")}
            </Link>
            <ul className="menu__dropdown">
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  {t("Philately_is_life")}
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  {t("Lords_biography")}
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  {t("Family_history")}
                </Link>
              </li>
            </ul>
            <img
              className="icone-dropdown-arrow"
              src={dropdownArrow}
              alt="fleche dropwdown"
            />
          </li>
          <li className="menu__item menu__item--principal menu__border">
            <Link className="menu__link" to="#">
              {t("Contact_us")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
