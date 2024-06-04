import React from "react";
import "./Nav.css";
import dropdownArrow from "../../img/png/icone-dropdown-arrow.png";
import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <div>
      <nav className="menu">
        {/* <!-- menu principal --> */}
        <ul className="menu__list menu__list--principal">
          <li className="menu__item menu__item--principal">
            <Link className="menu__link" to="/catalogue">
              Catalogue d'enchères
            </Link>
            <ul className="menu__dropdown">
              <li className="menu__item">
                <Link className="menu__link" to="/catalogue">
                  En cours
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
              Fonctionnement
            </Link>
            <ul className="menu__dropdown">
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  Termes et conditions
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  Aide
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  Contactez le webmestre
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
              À propos de Lord Réginald Stampee III
            </Link>
            <ul className="menu__dropdown">
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  La philatélie, c'est la vie.
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  Biographie du Lord
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="#">
                  Historique familial
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
              contactez-nous
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
