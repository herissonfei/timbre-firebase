import React, { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";

import { db, auth } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";

// img
import logo from "../img/png/logo.png";
import linkArrow from "../img/png/icone-link-arrow.png";
import dropdown from "../img/png/icone-dropdown-arrow-blue.png";
import linkArrowBlue from "../img/png/icone-link-arrow-blue.png";
import coeur from "../img/png/icone-coup-de-coeur.png";
import heroEnchere from "../img/jpg/hero-enchere.jpg";
import tinbre2 from "../img/jpg/encheres/timbre-2.jpg";
import tinbre3 from "../img/jpg/encheres/timbre-3.jpg";
import tinbre4 from "../img/jpg/encheres/timbre-4.jpg";
import timbre from "../img/png/icone-timbre.png";
import tinbre5 from "../img/jpg/encheres/timbre-5.jpg";
import article1 from "../img/jpg/actualites/article-1.jpg";
import article2 from "../img/jpg/actualites/article-2.jpg";
import enchere from "../img/png/icone-enchere.png";
import bridge from "../img/png/icone-bridge.png";
import lordStampee from "../img/jpg/lord-stampee.jpg";

export const Home = () => {
  const { t } = useTranslation();
  const { isMenuOpen } = useContext(MenuContext);
  const { toggleMenu } = useContext(MenuContext);

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

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
      <Header />
      <Nav />
      {/* {t("welcome")} */}
      <div>
        {/* <LanguageSwitcher /> */}
        {/* <h1>{t("welcome")}</h1>
        <p>{t("description")}</p> */}
      </div>
      <main>
        {/* Barre de recherche mobile */}
        <div
          className="input-bar input-bar--mobile"
          role="search"
          aria-label="search-bar-input"
        >
          <div className="input-bar__text">
            <p>{t("Advanced")}</p>
            <img
              className="icone-dropdown-arrow icone-dropdown-arrow--input-bar"
              src={dropdown}
              alt="fleche dropwdown"
            />
          </div>
          <input
            className="input-bar__input"
            type="text"
            id="input-bar-mobile"
            name="input-bar"
            placeholder="Trouvez une enchère"
          />
        </div>
        <aside
          className={
            isMenuOpen ? "menu__mobile menu--open" : "menu__mobile menu--close"
          }
          data-js-menu
        >
          <div className="menu__close--wrapper" data-js-close>
            <button
              className="menu__close"
              onClick={toggleMenu}
              aria-label="menu-close"
            ></button>
          </div>

          <ul className="menu__list menu__list--mobile">
            <li className="menu__item menu__item--principal">
              <a className="menu__link" href="/catalogue">
                {t("catalog")}
              </a>
              <ul className="menu__dropdown">
                <li className="menu__item">
                  <a className="menu__link" href="catalogue-enchere.html">
                    {t("progress")}
                  </a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="catalogue-enchere.html">
                    Archive
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu__item menu__item--principal">
              <a className="menu__link" href="#">
                Fonctionnement
              </a>
              <ul className="menu__dropdown">
                <li className="menu__item">
                  <a className="menu__link" href="#">
                    Termes et conditions
                  </a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">
                    Aide
                  </a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">
                    Contactez le webmestre
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu__item menu__item--principal">
              <a className="menu__link" href="">
                À propos de Lord Réginald Stampee III
              </a>
              <ul className="menu__dropdown">
                <li className="menu__item">
                  <a className="menu__link" href="#">
                    La philatélie, c'est la vie.
                  </a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">
                    Biographie du Lord
                  </a>
                </li>
                <li className="menu__item">
                  <a className="menu__link" href="#">
                    Historique familial
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu__item menu__item--principal">
              <a className="menu__link" href="#">
                contactez-nous
              </a>
            </li>
          </ul>
          <a href="home">
            <img className="footer__logo" src={logo} alt="logo Stampee" />
          </a>
          {/* <ul className="wrapper--header menu__sous-menu menu__sous-menu--mobile">
            <li className="menu__item">
              <a href="{{ route('login') }}">Se connecter</a>
            </li>
            <li className="menu__item">
              <a href="{{ route('register') }}">Devenir membre</a>
            </li>
          </ul> */}
          {currentUser ? (
            <ul className="wrapper--header menu__sous-menu menu__sous-menu--mobile">
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
                  <Link
                    className="navEntete-link"
                    to="/listePrive"
                    onClick={toggleMenu}
                  >
                    mes enchères
                  </Link>
                </li>
              </div>
            </ul>
          ) : (
            <ul className="wrapper--header menu__sous-menu mobile--login">
              <li className="menu__item">
                <Link to="/login">Se connecter</Link>
              </li>
              <li className="menu__item">
                <Link to="/register">Devenir membre</Link>
              </li>
            </ul>
          )}
          {/* <ul className="wrapper--header menu__sous-menu menu__sous-menu--mobile">
            <li className="menu__item">
              <a href="{{ route('login') }}">Se connecter</a>
            </li>
            <li className="menu__item">
              <a href="{{ route('register') }}">Devenir membre</a>
            </li>
          </ul> */}
        </aside>

        {/* -----------------------------------------------mobile end */}
        {/* <!-- HERO --> */}
        <div className="hero hero--accueil">
          <div className="wrapper wrapper--hero">
            <h1 className="hero__text">{t("Welcome_to_Stampee")}</h1>
            <h2 className="hero__text--sous-titre">
              {t("An_exceptional_auction_platform")}
            </h2>
            <p className="hero__text hero__text--text-courant">
              {t("Participating")}
              ! <br />
              {t("Discover")}
            </p>
            <Link className="btn" to="/catalogue">
              {t("See")}
            </Link>
          </div>
          <div className="grid grid--hero">
            <div className="bg bg--blue">
              <h2 className="bg--blue-title">{t("How_does_it_work")}</h2>
              <p className="hero__text">
                {t("Acquire_stamps_in_a_few_steps")}{" "}
              </p>
              <ul>
                <li>
                  <strong>1.</strong> {t("Log_in_or_sign_up")}
                </li>
                <li>
                  <strong>2.</strong>{" "}
                  {t("Use_advanced_search_to_find_the_rare_gem")}
                </li>
                <li className="hero__text--text-courant-var">
                  <strong>3.</strong>{" "}
                  {t("Bid_and_enjoy_your_favorite_auctions_easily")}
                </li>
              </ul>
              <Link className="link--border" to="#">
                {t("Learn_more")}
              </Link>
              <img
                className="icone-link-arrow"
                src={linkArrow}
                alt="icone fleche link"
              />
            </div>
            <div className="bg bg--grey">
              <h2>{t("Discover_the_Lords_favorites")}</h2>
              <p className="hero__text--text-courant-var">
                {t("Look_for_the")}{" "}
                <img
                  className="icone-coup-coeur"
                  src={coeur}
                  alt="icone coup de coeur lord"
                />{" "}
                {t("icon_to_find_our_experts_favorite_auctions")}
              </p>
              <Link className="link--border-blue" to="#">
                {t("favorites")}
              </Link>
              <img
                className="icone-link-arrow"
                src={linkArrowBlue}
                alt="icone fleche link"
              />
            </div>
            <div className="bg bg--white">
              <h2> {t("Not_yet_registered")}</h2>
              <p className="hero__text--text-courant">
                {t("Bid_and_enjoy_Stampee_fully_as_a_registered_member")}
              </p>
              <div className="btn__container">
                <Link className="btn btn--orange" to="/register">
                  {t("Become_a_member")}
                </Link>
                <Link className="btn" to="/login">
                  {t("Log_in")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          {/* <!-- section OFFRES EN VEDETTE : présentation des offres en vedette --> */}
          <section>
            <h2> {t("Featured_offers")}</h2>
            <div className="grid grid--5">
              <div className="tile bg--tile">
                <div className="tile__container">
                  <div>
                    <p className="tile__lot">
                      Lot #<strong>23</strong>
                    </p>
                    <p className="tile__lot tile__lot--red">
                      <strong>14d-8h-56m-2s</strong>
                    </p>
                  </div>
                  <img
                    className="icone-coup-coeur"
                    src={coeur}
                    alt="icone coup de coeur lord"
                  />
                </div>
                <div className="tile__wrapper">
                  <div className="tile__img-wrapper">
                    <Link to="enchere.html">
                      <img className="tile__img" src={heroEnchere} alt="" />
                    </Link>
                  </div>
                  <h3>CYPRUS 95 LH</h3>
                  <p className="tile__text">
                    {t("Current")} | <span>1&nbsp;{t("offer")}</span>
                  </p>
                  <span>10.50$</span>
                  <p className="tile__text-small">
                    <small>{t("Last_offer_by_user2024")}</small>
                  </p>
                  <Link className="btn tile__btn" to="enchere.html">
                    {t("Bet")}
                  </Link>
                </div>
              </div>
              <div className="tile bg--tile">
                <div className="tile__container">
                  <div>
                    <p className="tile__lot">
                      Lot #<strong>102</strong>
                    </p>
                    <p className="tile__lot tile__lot--red">
                      <strong>1d-7h-06m-28s</strong>
                    </p>
                  </div>
                </div>
                <div className="tile__wrapper">
                  <div className="tile__img-wrapper">
                    <img className="tile__img" src={tinbre2} alt="" />
                  </div>
                  <h3>US California Scott #1</h3>
                  <p className="tile__text">
                    {t("Current")} | <span>5&nbsp;{t("offers")}</span>
                  </p>
                  <span>259.00$</span>
                  <p className="tile__text-small">
                    <small>{t("Last_offer_by_user2024")}</small>
                  </p>
                  <Link className="btn tile__btn" to="enchere.html">
                    {t("Bet")}
                  </Link>
                </div>
              </div>
              <div className="tile bg--tile">
                <div className="tile__container">
                  <div>
                    <p className="tile__lot">
                      Lot #<strong>45</strong>
                    </p>
                    <p className="tile__lot tile__lot--red">
                      <strong>9d-1h-40m-24s</strong>
                    </p>
                  </div>
                </div>
                <div className="tile__wrapper">
                  <div className="tile__img-wrapper">
                    <img className="tile__img" src={tinbre4} alt="" />
                  </div>
                  <h3>USA 1857 Scott #36 Used. Deep color</h3>
                  <p className="tile__text">
                    {t("Current")} | <span>10&nbsp;{t("offers")}</span>
                  </p>
                  <span>79.00$</span>
                  <p className="tile__text-small">
                    <small>{t("Last_offer_by_user2024")}</small>
                  </p>
                  <Link className="btn tile__btn" to="enchere.html">
                    {t("Bet")}
                  </Link>
                </div>
              </div>
              <div className="tile bg--tile">
                <div className="tile__container">
                  <div>
                    <p className="tile__lot">
                      Lot #<strong>121</strong>
                    </p>
                    <p className="tile__lot tile__lot--red">
                      <strong>10h-50m-05s</strong>
                    </p>
                  </div>
                  <img
                    className="icone-coup-coeur"
                    src={coeur}
                    alt="icone coup de coeur lord"
                  />
                </div>
                <div className="tile__wrapper">
                  <div className="tile__img-wrapper">
                    <img className="tile__img" src={tinbre3} alt="" />
                  </div>
                  <h3>AFFORDABLE GENUINE SCOTT USED SET</h3>
                  <p className="tile__text">
                    {t("Current")} | <span>2&nbsp;{t("offers")}</span>
                  </p>
                  <span>150.00$</span>
                  <p className="tile__text-small">
                    <small>{t("Last_offer_by_user2024")}</small>
                  </p>
                  <Link className="btn tile__btn" to="enchere.html">
                    {t("Bet")}
                  </Link>
                </div>
              </div>
              <div className="tile bg--tile">
                <div className="tile__container">
                  <div>
                    <p className="tile__lot">
                      Lot #<strong>67</strong>
                    </p>
                    <p className="tile__lot tile__lot--red">
                      <strong>21d-11h-12m-11s</strong>
                    </p>
                  </div>
                </div>
                <div className="tile__wrapper">
                  <div className="tile__img-wrapper">
                    <img className="tile__img" src={tinbre5} alt="" />
                  </div>
                  <h3>Used 50¢ XF Well Centered GEM With PFC Graded</h3>
                  <p className="tile__text">
                    {t("Current")} |{" "}
                    <span>
                      {t("None")}&nbsp;{t("offer")}
                    </span>
                  </p>
                  <span>10.00$</span>
                  <p className="tile__text-small">
                    <small>{t("Last_offer_by_user2024")}</small>
                  </p>
                  <Link className="btn tile__btn" to="enchere.html">
                    {t("Bet")}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- section CATEGORIES : présentation des catégories --> */}
          <section>
            <h2>{t("Categories")}</h2>
            <div className="grid grid--3">
              <div className="tile tile--center bg--tile">
                <div className="tile__img-container tile__img-container--first">
                  <h3>{t("Most_popular")}</h3>
                </div>
                <Link className="btn" to="#">
                  {t("See_all")}
                </Link>
              </div>
              <div className="tile tile--center bg--tile">
                <div className="tile__img-container tile__img-container--second">
                  <h3>{t("Ending_soon")}</h3>
                </div>
                <Link className="btn" to="#">
                  {t("See_all")}
                </Link>
              </div>
              <div className="tile tile--center bg--tile">
                <div className="tile__img-container tile__img-container--third">
                  <h3>{t("New_offers")}</h3>
                </div>
                <Link className="btn" to="#">
                  {t("See_all")}
                </Link>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- section ACTUALITÉS : présentation des actualités récentes --> */}
        <section className="bg--blue">
          <div className="wrapper">
            <h2 className="bg--blue-title">{t("News")}</h2>
            <h3 className="bg--blue-title">{t("Recently_published")}</h3>
            <div className="grid grid--3-var">
              <div className="tile bg--tile-white">
                <small>{t("Published")} 06/04/2024</small>
                <div className="tile__container">
                  <img src={article1} alt="" />
                  <Link className="btn" to="#">
                    {t("Read_the_article")}
                  </Link>
                </div>
                <h4>{t("How_I_learned_to_look_at_stamps")}</h4>
                <small>{t("Reginald")}</small>
                <p>
                  Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.
                  Sit amet cursus sit amet. Leo vel orci porta non pulvinar
                  neque laoreet. Risus sed vulputate...
                </p>
              </div>
              <div className="tile bg--tile-white">
                <small>{t("Published")} 05/04/2024</small>
                <div className="tile__container">
                  <img src={article2} alt="" />
                  <Link className="btn" to="#">
                    {t("Read_the_article")}
                  </Link>
                </div>
                <h4> {t("Auction_paradise_An_hour_in_London")}</h4>
                <small>{t("Reginald")}</small>
                <p>
                  Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.
                  Sit amet cursus sit amet. Leo vel orci porta non pulvinar
                  neque laoreet. Risus sed vulputate...
                </p>
              </div>
              <div className="tile tile--no-bg">
                <Link to="#">
                  <div className="tile__container bg--no-bg">
                    <img width="75" src={timbre} alt="Icone d'un timbre" />
                    <p className="link--border">{t("Stamps")}</p>
                    <img
                      className="icone-link-arrow"
                      src={linkArrow}
                      alt="icone fleche link"
                    />
                  </div>
                </Link>
                <Link to="#">
                  <div className="tile__container bg--no-bg">
                    <img width="75" src={enchere} alt="Icone d'un marteau" />
                    <p className="link--border">{t("Auction")}</p>
                    <img
                      className="icone-link-arrow"
                      src={linkArrow}
                      alt="icone fleche link"
                    />
                  </div>
                </Link>
                <Link to="#">
                  <div className="tile__container bg--no-bg bg--no-bg-border">
                    <img
                      width="75"
                      src={bridge}
                      alt="Icone d'un jeu de carte"
                    />
                    <p className="link--border">Bridge</p>
                    <img
                      className="icone-link-arrow"
                      src={linkArrow}
                      alt="icone fleche link"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="wrapper">
          {/* <!-- section NOTRE MISSION : présentation du lord --> */}
          <section>
            <h2>{t("Our_mission")}</h2>
            <div className="grid grid--2">
              <div className="tile bg--tile">
                <div className="tile__container-text-img">
                  <img
                    className="tile__img tile__img-container tile__img--border"
                    src={lordStampee}
                    alt=""
                  />
                  <div className="tile__container-text">
                    <h3> {t("A_platform_for_enthusiasts")}</h3>
                    <p>{t("Lord_Reginald_Stampee")}</p>
                    <Link className="btn" to="#">
                      {t("more")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tile tile--center bg--tile">
                <div className="tile__img-container bg--blue">
                  <p className="tile--center-text">{t("Our_team")}</p>
                </div>
                <Link className="btn" to="#">
                  {t("Contact_us")}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
