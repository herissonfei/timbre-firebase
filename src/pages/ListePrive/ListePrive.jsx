import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ListePrive.css";
import { Pagination } from "../../components/Pagination";
import { Header } from "../../components/Header/Header";
import { Nav } from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { MenuContext } from "../../context/MenuContext";
import { useTranslation } from "react-i18next";

import { RechercheContext } from "../../context/RechercheContext";
import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import LanguageSwitcher from "../../LanguageSwitcher";

import {
  doc,
  onSnapshot,
  where,
  collection,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";

import coeur from "../../img/png/icone-coup-de-coeur.png";
import roundArrow from "../../img/png/icone-round-arrow-orange.png";
import gallery1 from "../../img/png/icone-gallery-1.png";
import gallery2 from "../../img/png/icone-gallery-2.png";
import linkArrow from "../../img/png/icone-link-arrow.png";
import dropdown from "../../img/png/icone-dropdown-arrow-blue.png";
import logo from "../../img/png/logo.png";

export const ListePrive = () => {
  const { t } = useTranslation();

  const { currentUser } = useContext(AuthContext);
  // const [user, setUser] = useState([]);

  const [bidsPriveData, setBidsPriveData] = useState([]);
  const [bidsPrive, setBidsPrive] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bidsCount, setBidsCount] = useState([]);
  const [refresh, setRefresh] = useState(false);
  if (currentUser) {
  }
  const { isMenuOpen } = useContext(MenuContext);
  const { toggleMenu } = useContext(MenuContext);
  const { isRechercheOpen } = useContext(RechercheContext);
  const { toggleRecherche } = useContext(RechercheContext);

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
  useEffect(() => {
    const getBidsPrive = async () => {
      if (currentUser && currentUser.uid) {
        try {
          const bidsQuery = query(
            collection(db, "bids"),
            where("bidderid", "==", currentUser.uid)
          );

          const unsubscribe = onSnapshot(bidsQuery, (snapshot) => {
            const bidsList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setBidsPrive(bidsList.slice(0, 10));
            setBidsPriveData(bidsList);
            setBidsCount(bidsList.length);
          });

          // 组件卸载时清理订阅
          return () => unsubscribe();
        } catch (error) {
          console.error("获取出价信息时出错: ", error);
        }
      }
    };

    getBidsPrive();
  }, [currentUser, refresh]);

  // 注意一下别无线调用了
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const itemsPerPage = 10;
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newData = bidsPriveData.slice(startIndex, endIndex);
    setBidsPrive(newData);
  };

  const totalPages = Math.ceil(bidsCount / 10);

  // ---------------Recherche---------------------筛选
  // checkbox CONDITION
  const [selectedCategoriesConditions, setselectedCategoriesConditions] =
    useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategoriesConditions.includes(category)) {
      setselectedCategoriesConditions(
        selectedCategoriesConditions.filter((cat) => cat !== category)
      );
    } else {
      setselectedCategoriesConditions([
        ...selectedCategoriesConditions,
        category,
      ]);
    }
  };

  // checkbox TYPE
  const [selectedCategoriesTypes, setSelectedCategoriesTypes] = useState([]);
  // ----------------------------------------------------------------------------------never used
  const handleCheckboxchangeTypes = (category) => {
    if (selectedCategoriesTypes.includes(category)) {
      setSelectedCategoriesTypes(
        selectedCategoriesTypes.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategoriesTypes([...selectedCategoriesTypes, category]);
    }
  };

  // Prix
  const [minPrix, setMinPrix] = useState(0);
  const [maxPrix, setMaxPrix] = useState(0);

  const handleMinPrixChange = (event) => {
    setMinPrix(parseInt(event.target.value));
    // setMinPrix(event.target.value);
  };

  const handleMaxPrixChange = (event) => {
    setMaxPrix(parseInt(event.target.value));
    // setMaxPrix(event.target.value);
  };

  // ANNÉE D'ÉMISSION
  const [minAnnee, setMinAnnee] = useState(1900);
  const [maxAnnee, setMaxAnnee] = useState(2024);

  const [selectedOption, setSelectedOption] = useState("");
  const [chercher, setChercher] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMinAnneeChange = (event) => {
    if (
      isNaN(parseInt(event.target.value))
      // ||
      // parseInt(event.target.value) < 1900
    ) {
      setMinAnnee(1900);
    } else {
      setMinAnnee(parseInt(event.target.value));
    }
  };

  const handleMaxAnneeChange = (event) => {
    setMaxAnnee(parseInt(event.target.value));
  };
  useEffect(() => {
    const getChercher = async () => {
      if (!currentUser || !currentUser.uid) {
        return; // 如果 currentUser 或 currentUser.uid 为空，直接返回
      }

      try {
        let queryConstraints = [
          where("conditions", "in", selectedCategoriesConditions),
          where("bidderid", "==", currentUser.uid),
        ];
        if (selectedOption && selectedOption !== "tous") {
          queryConstraints.push(where("country", "==", selectedOption));
        }
        if (maxPrix !== 0 && minPrix !== 0) {
          if (maxPrix <= 0) {
            queryConstraints.push(where("reserveprice", ">=", minPrix));
          } else {
            queryConstraints.push(where("reserveprice", ">=", minPrix));
            queryConstraints.push(where("reserveprice", "<=", maxPrix));
          }
        }

        const q1 = query(collection(db, "bids"), ...queryConstraints);

        const querySnapshot1 = await getDocs(q1);

        const results = querySnapshot1.docs.map((doc) => doc.data());

        // setBidsPrive(results);
        setBidsPrive(results.slice(0, 10));
        setBidsPriveData(results);
        setBidsCount(results.length);
      } catch (err) {
        // setErr(true);
      }
    };

    if (chercher) {
      getChercher();
      setChercher(false);
      toggleRecherche();
    } else {
      // console.log(2);
    }
  }, [
    selectedCategoriesConditions,
    selectedCategoriesTypes,
    chercher,
    minPrix,
    maxPrix,
    selectedOption,
    // currentUser.uid,
    currentUser,
    toggleRecherche,
  ]);
  const handleParDefault = (event) => {
    event.preventDefault();
    setselectedCategoriesConditions([]);
    setSelectedCategoriesTypes([]);
    const unsubscribe = onSnapshot(collection(db, "bids"), (snapshot) => {
      const bidDataArray = [];
      snapshot.forEach((doc) => {
        bidDataArray.push(doc.data());
      });
      // console.log(bidDataArray);
      setBidsPrive(bidDataArray.slice(0, 10));
      setBidsPriveData(bidDataArray);
      setBidsCount(bidDataArray.length);
      setSelectedOption("Tous les pays");
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  };
  const handleChercher = (event) => {
    event.preventDefault();

    if (selectedCategoriesConditions.length === 0) {
      setselectedCategoriesConditions([
        "Parfaite",
        "Excellente",
        "Bonne",
        "Moyenne",
        "Endommagé",
      ]);
    }
    // console.log(selectedCategoriesConditions);

    if (selectedCategoriesTypes.length === 0) {
      setSelectedCategoriesTypes([
        "Général",
        "Courrier Aérien",
        "Livret",
        "Port dû",
        "Carte postale",
        "Semi postal",
        "Entier postal",
      ]);
    }
    if (!chercher) {
      setChercher(true);
    }
  };

  // ----------------------------------------------筛选结束

  // -----------------------------------Tri 排序

  const handleSortChange = (event) => {
    if (event.target.value === "decroissant") {
      const Bidsdecroissant = [...bidsPriveData].sort((a, b) => {
        return b.reserveprice - a.reserveprice;
      });

      setBidsPriveData(Bidsdecroissant);
      setBidsPrive(Bidsdecroissant.slice(0, 10));
    } else if (event.target.value === "croissant") {
      const Bidscroissant = [...bidsPriveData].sort((a, b) => {
        return a.reserveprice - b.reserveprice;
      });
      setBidsPriveData(Bidscroissant);
      setBidsPrive(Bidscroissant.slice(0, 10));
    } else if (event.target.value === "tous") {
      const getBids = async () => {
        const bidsquerySnapshot = await getDocs(collection(db, "bids"));

        const bidDataArray = [];

        bidsquerySnapshot.forEach((doc) => {
          bidDataArray.push(doc.data());
        });
        setBidsPrive(bidDataArray.slice(0, 10));
        setBidsPriveData(bidDataArray);
        setBidsCount(bidDataArray.length);
      };

      getBids();
    }
  };

  const delData = async (bid) => {
    // console.log(bid.bidstampid);
    await deleteDoc(doc(db, "bids", bid.bidstampid));
    setRefresh((prev) => !prev); // 通过翻转 refresh 状态来触发 useEffect
  };
  return (
    <div>
      <Header />
      <Nav />
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
              <Link className="menu__link" to="/catalogue">
                {t("catalog")}
              </Link>
              <ul className="menu__dropdown">
                <li className="menu__item">
                  <Link className="menu__link" to="catalogue-enchere.html">
                    {t("progress")}
                  </Link>
                </li>
                <li className="menu__item">
                  <Link className="menu__link" to="catalogue-enchere.html">
                    Archive
                  </Link>
                </li>
              </ul>
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
            </li>
            <li className="menu__item menu__item--principal">
              <Link className="menu__link" to="">
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
            </li>
            <li className="menu__item menu__item--principal">
              <Link className="menu__link" to="#">
                {t("Contact_us")}
              </Link>
            </li>
          </ul>
          <Link to="/home">
            <img className="footer__logo" src={logo} alt="logo Stampee" />
          </Link>
          <LanguageSwitcher />

          {/* <ul className="wrapper--header menu__sous-menu menu__sous-menu--mobile ">
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
            <ul className="wrapper--header menu__sous-menu menu__sous-menu--mobile mobile--login">
              <li className="menu__item">
                <Link to="/login">{t("Log_in")}</Link>
              </li>
              <li className="menu__item">
                <Link to="/register">{t("Become_a_member")}</Link>
              </li>
            </ul>
          )}
        </aside>
        {/* <!-- HERO --> */}
        <div className="hero hero--page-interieure">
          <div className="wrapper">
            <h1 className="hero__text">{t("BROWSE")}</h1>
            <h2 className="hero__text--sous-titre">{t("PEARL")}</h2>
            <Link className="btn" to="#">
              Fonctionnement
            </Link>
            <Link className="btn" to="#">
              Certification
            </Link>
          </div>
        </div>

        {/* <!-- menu secondaire BARRE RECHERCHE --> */}
        <div className="menu-secondaire">
          <div className="wrapper wrapper--menu-secondaire">
            <ul className="menu-secondaire__container">
              <li className="menu__item menu__item--principal">
                <Link className="menu__link" to="#">
                  {t("progress")}
                </Link>
              </li>
              <li className="menu__item menu__item--principal">
                <Link className="menu__link" to="#">
                  Archive
                </Link>
              </li>
            </ul>
            <select
              className="menu-secondaire__select"
              aria-label="select-sort-order"
              defaultValue="Trier"
              onChange={handleSortChange}
            >
              {/* <option disabled>Trier</option> */}
              <option value="tous">{t("All")}</option>
              <option value="decroissant">
                {t("Descending_price")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </option>
              <option value="croissant">{t("Ascending_price")}</option>
              {/* <option value="popularite">Par popularité</option> */}
              {/* 这里的css得改动一下 */}
              {/* <option value="nouvellement-liste">Nouvellement listée</option> */}
              {/* <option value="termine-bientot">Se terminant bientôt</option> */}
            </select>
            <div className="wrapper--header menu-secondaire__icone">
              <div className="btn">
                <img src={gallery1} alt="gallerie vertical" />
              </div>
              <div className="btn">
                <img src={gallery2} alt="gallerie horizontal" />
              </div>
            </div>
          </div>
          <button
            className="burger burger-search btn"
            onClick={toggleRecherche}
            aria-label="burger"
            data-js-search
          >
            {t("Advanced_search")}
            <img width="5" src={linkArrow} alt="fleche dropwdown" />
          </button>
        </div>
        {/* <div className="menu__nav-page menu__nav-page-wrapper"> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          changeClass="true"
        />
        {/* </div> */}

        {/* <!-- GALLERIE ENCHÈRES --> */}
        <div className="wrapper gallery">
          <div className="wrapper--header">
            {/* <!-- RECHERCHE AVANCÉE --> */}
            <div className="search-bar search-bar--desktop">
              <h2>{t("Advanced_search")}</h2>
              <form method="GET">
                <section>
                  <h3>Condition</h3>
                  <div>
                    <input
                      type="checkbox"
                      id="parfaite"
                      checked={selectedCategoriesConditions.includes(
                        "Parfaite"
                      )}
                      onChange={() => handleCategoryChange("Parfaite")}
                    />
                    <label htmlFor="parfaite">{t("Perfect")}</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="excellente"
                      checked={selectedCategoriesConditions.includes(
                        "Excellente"
                      )}
                      onChange={() => handleCategoryChange("Excellente")}
                    />
                    <label htmlFor="excellente">{t("Excellent")}</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="bonne"
                      checked={selectedCategoriesConditions.includes("Bonne")}
                      onChange={() => handleCategoryChange("Bonne")}
                    />
                    <label htmlFor="bonne">{t("Good")}</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="moyenne"
                      checked={selectedCategoriesConditions.includes("Moyenne")}
                      onChange={() => handleCategoryChange("Moyenne")}
                    />
                    <label htmlFor="moyenne">{t("Average")}</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="endommage"
                      checked={selectedCategoriesConditions.includes(
                        "Endommagé"
                      )}
                      onChange={() => handleCategoryChange("Endommagé")}
                    />
                    <label htmlFor="endommage">{t("Damaged")}</label>
                  </div>
                </section>
                <section>
                  <h3>{t("country")}</h3>
                  <select
                    aria-label="select-country"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="tous">{t("All_countries")}</option>
                    <option value="Royaume-uni">{t("United_Kingdom")}</option>
                    <option value="Etats-unis">{t("UNITED_STATES")}</option>
                    <option value="Canada">Canada</option>
                    <option value="Australie">{t("Australia")}</option>
                    <option value="Chine">{t("China")}</option>
                    <option value="France">France</option>
                    <option value="Espagne">{t("Spain")}</option>
                  </select>
                </section>
                <section>
                  <h3>{t("Price")}</h3>
                  <div className="wrapper--header">
                    <div className="wrapper--header">
                      <input
                        type="number"
                        // placeholder="00.00"
                        value={minPrix}
                        onChange={handleMinPrixChange}
                      />
                      <span>$&nbsp;-</span>
                    </div>
                    <div className="wrapper--header">
                      <input
                        type="number"
                        aria-label="input-price"
                        value={maxPrix}
                        onChange={handleMaxPrixChange}
                      />
                      <span>$</span>
                    </div>
                  </div>
                </section>
                {/* <section>
                  <h3>Type</h3>
                  <div>
                    <input
                      type="checkbox"
                      id="general"
                      checked={selectedCategoriesTypes.includes("Général")}
                      onChange={() => handleCheckboxchangeTypes("Général")}
                    />
                    <label htmlFor="general">Général</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="aerien"
                      checked={selectedCategoriesTypes.includes(
                        "Courrier Aérien"
                      )}
                      onChange={() =>
                        handleCheckboxchangeTypes("Courrier Aérien")
                      }
                    />
                    <label htmlFor="aerien">Courrier Aérien</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="livret"
                      checked={selectedCategoriesTypes.includes("Livret")}
                      onChange={() => handleCheckboxchangeTypes("Livret")}
                    />
                    <label htmlFor="livret">Livret</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="port-du"
                      checked={selectedCategoriesTypes.includes("Port dû")}
                      onChange={() => handleCheckboxchangeTypes("Port dû")}
                    />
                    <label htmlFor="port-du">Port dû</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="carte-postale"
                      checked={selectedCategoriesTypes.includes(
                        "Carte postale"
                      )}
                      onChange={() =>
                        handleCheckboxchangeTypes("Carte postale")
                      }
                    />
                    <label htmlFor="carte-postale">Carte postale</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="semi-postal"
                      checked={selectedCategoriesTypes.includes("Semi postal")}
                      onChange={() => handleCheckboxchangeTypes("Semi postal")}
                    />
                    <label htmlFor="semi-postal">Semi postal</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="entier-postal"
                      checked={selectedCategoriesTypes.includes(
                        "Entier postal"
                      )}
                      onChange={() =>
                        handleCheckboxchangeTypes("Entier postal")
                      }
                    />
                    <label htmlFor="entier-postal">Entier postal</label>
                  </div>
                </section> */}
                {/* <section>
                  <h3>Année d'émission</h3>
                  <div className="wrapper--header">
                    <div className="wrapper--header">
                      <input
                        type="number"
                        aria-label="input-year-min"
                        value={minAnnee}
                        onChange={handleMinAnneeChange}
                      />
                      <span>-</span>
                    </div>
                    <input
                      type="number"
                      aria-label="input-year-max"
                      value={maxAnnee}
                      onChange={handleMaxAnneeChange}
                    />
                  </div>
                </section> */}
                {/* <section>
                  <h3>Dimensions (pouces)</h3>
                  <div className="wrapper--header">
                    <div className="wrapper--header">
                      <input
                        type="number"
                        name="dimension"
                        placeholder="00.00"
                        aria-label="input-dimension-height"
                      />
                      <span>-</span>
                    </div>
                    <input
                      type="number"
                      name="dimension"
                      aria-label="input-dimension-width"
                    />
                  </div>
                </section> */}
                <div className="wrapper--header">
                  <div>
                    <Link
                      className="btn btn--text-icone default"
                      to="#"
                      onClick={handleParDefault}
                    >
                      {t("default")}
                      <img
                        width="15"
                        src={roundArrow}
                        alt="icone fleche par defaut"
                      />
                    </Link>
                    <Link
                      className="btn btn--text-icone"
                      to="#"
                      onClick={handleChercher}
                    >
                      {t("search")}
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            {/* <!-- ASIDE MOBILE RECHERCHE AVANCÉE --> */}
            <aside
              className={
                isRechercheOpen
                  ? "menu__mobile menu__mobile--white menu--open"
                  : "menu__mobile menu__mobile--white menu--close"
              }
              aria-label="aside-search-close"
              data-js-search-bar
            >
              {/* <!-- Bouton close --> */}
              <div className="menu__close--wrapper" data-js-close-search-bar>
                <button
                  className="menu__close"
                  aria-label="aside-search-close-btn"
                  onClick={toggleRecherche}
                ></button>
              </div>

              <div className="search-bar search-bar--mobile">
                <form method="GET">
                  {/* <section>
                    <h3>Condition</h3>
                    <select aria-label="select-condition">
                      <option value="tous">Tous</option>
                      <option value="parfaite">Parfaite</option>
                      <option value="excellente">excellente</option>
                      <option value="bonne">Bonne</option>
                      <option value="moyenne">Moyenne</option>
                      <option value="endommage">Endommagé</option>
                    </select>
                  </section> */}
                  <section>
                    <h3>Condition</h3>
                    <div>
                      <input
                        type="checkbox"
                        id="parfaite"
                        checked={selectedCategoriesConditions.includes(
                          "Parfaite"
                        )}
                        onChange={() => handleCategoryChange("Parfaite")}
                      />
                      <label htmlFor="parfaite">{t("Perfect")}</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="excellente"
                        checked={selectedCategoriesConditions.includes(
                          "Excellente"
                        )}
                        onChange={() => handleCategoryChange("Excellente")}
                      />
                      <label htmlFor="excellente">{t("Excellent")}</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="bonne"
                        checked={selectedCategoriesConditions.includes("Bonne")}
                        onChange={() => handleCategoryChange("Bonne")}
                      />
                      <label htmlFor="bonne">{t("Good")}</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="moyenne"
                        checked={selectedCategoriesConditions.includes(
                          "Moyenne"
                        )}
                        onChange={() => handleCategoryChange("Moyenne")}
                      />
                      <label htmlFor="moyenne">{t("Average")}</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="endommage"
                        checked={selectedCategoriesConditions.includes(
                          "Endommagé"
                        )}
                        onChange={() => handleCategoryChange("Endommagé")}
                      />
                      <label htmlFor="endommage">{t("Damaged")}</label>
                    </div>
                  </section>
                  <section>
                    <h3>{t("country")}</h3>
                    <select aria-label="mobile-select-country">
                      <option value="tous">{t("All_countries")}</option>
                      <option value="royaume-uni">{t("United_Kingdom")}</option>
                      <option value="etats-unis">{t("UNITED_STATES")}</option>
                      <option value="canada">Canada</option>
                      <option value="australie">{t("Australia")}</option>
                      <option value="chine">{t("China")}</option>
                      <option value="france">France</option>
                      <option value="espagne">{t("Spain")}</option>
                    </select>
                  </section>
                  <section>
                    <h3>{t("Price")}</h3>
                    <div className="wrapper--header">
                      <div className="wrapper--header">
                        <input type="number" name="prix" />
                        <span>$&nbsp;-</span>
                      </div>
                      <div className="wrapper--header">
                        <input
                          type="number"
                          name="prix"
                          aria-label="mobile-input-price"
                        />
                        <span>$</span>
                      </div>
                    </div>
                  </section>
                  {/* <section>
                    <h3>Type</h3>
                    <select aria-label="select-type">
                      <option value="tous">Tous</option>
                      <option value="general">Général</option>
                      <option value="courier">Courier</option>
                      <option value="livret">Livret</option>
                      <option value="port-du">Port dû</option>
                      <option value="carte-postale">Carte postale</option>
                      <option value="semi-postal">Semi postal</option>
                      <option value="entier-postal">Entier postal</option>
                    </select>
                  </section> */}
                  {/* <section>
                    <h3>Année d'émission</h3>
                    <div className="wrapper--header">
                      <div className="wrapper--header">
                        <input
                          type="number"
                          name="annee"
                          aria-label="mobile-input-year-min"
                        />
                        <span>-</span>
                      </div>
                      <input
                        type="number"
                        name="annee"
                        aria-label="mobile-input-year-max"
                      />
                    </div>
                  </section> */}
                  {/* <section>
                    <h3>Dimensions (pouces)</h3>
                    <div className="wrapper--header">
                      <div className="wrapper--header">
                        <input
                          ype="number"
                          name="dimension"
                          placeholder="00.00"
                          aria-label="mobile-input-dimension-height"
                        />
                        <span>-</span>
                      </div>
                      <input
                        type="number"
                        name="dimension"
                        aria-label="mobile-input-dimension-width"
                      />
                    </div>
                  </section> */}
                  <div className="wrapper--header-mobile">
                    <div>
                      <Link className="btn btn--text-icone default">
                        {t("default")}
                        <img src={roundArrow} alt="icone fleche par defaut" />
                      </Link>
                      <Link
                        className="btn btn--text-icone"
                        to="#"
                        onClick={handleChercher}
                      >
                        {t("search")}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </aside>
            {/* 
          <!-- CATALOGUE ENCHÈRES --> */}
            <div className="wrapper--gallery">
              <p className="gallery__text">
                {bidsPrive.length} {t("auctions_found")} |{" "}
                {(currentPage - 1) * 10} -{" "}
                {currentPage * 10 > bidsCount ? bidsCount : currentPage * 10}{" "}
                {t("of")} {bidsCount}
              </p>
              <div className="grid grid--5-var">
                {/* --------------------------------------------------------------------------------------- */}
                {bidsPrive.map((bid) => (
                  <div className="tile bg--tile" key={bid.id}>
                    <div className="tile__container">
                      <div>
                        <p className="tile__lot">
                          Lot #<strong>23</strong>
                          {/* Lot #<strong>{bid.id}</strong> */}
                        </p>
                        <p className="tile__lot tile__lot--red">
                          {/* 这里之后要补上 */}
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
                        <Link to={`/enchere/${bid.id}`}>
                          <img
                            className="tile__img"
                            src={bid.imageurl}
                            alt=""
                          />
                        </Link>
                      </div>
                      <h3>{bid.stampName}</h3>
                      {/* <p>{bid.conditions}</p>
                      <p>{bid.type}</p>
                      <p>{bid.country}</p> */}

                      <p className="tile__text">
                        {t("Current")} |{" "}
                        <span>
                          {bid.auctioncount}&nbsp;{t("offer")}
                        </span>
                      </p>
                      <span>{bid.reserveprice}$</span>
                      <p className="tile__text-small">
                        <small>
                          {/* 回过头看 */}
                          {t("Last_offer_by_user2024")}
                        </small>
                      </p>
                      <Link
                        className="btn tile__btn"
                        to="#"
                        onClick={() => delData(bid)}
                      >
                        {t("DELETE")}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="wrapper--header-page">
            {/* <div className="menu__nav-page menu__nav-page--var">
              <div>
                <Link>
                  <img width="10" src={linkArrowBlueLeft} alt="" />
                </Link>
              </div>
              <div>
                <Link>
                  <span>1</span>
                </Link>
              </div>
              <div>
                <Link>
                  <span>2</span>
                </Link>
              </div>
              <div>
                <Link>
                  <span>3</span>
                </Link>
              </div>
              <div>
                <Link>
                  <span>4</span>
                </Link>
              </div>
              <div>
                <Link>
                  <span>5</span>
                </Link>
              </div>
              <div>
                <Link>
                  <span>...</span>
                </Link>
              </div>
              <div>
                <Link>
                  <span>8</span>
                </Link>
              </div>
              <div>
                <Link>
                  <img width="10" src={linkArrowBlue} alt="" />
                </Link>
              </div>
            </div> */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              changeClass="false"
            />
            <p className="gallery__text gallery__text--right">
              {/* {bidsCount} enchères trouvées | 0 - 20 de {bidsCount} */}
              {bidsPrive.length} {t("auctions_found")} |{" "}
              {(currentPage - 1) * 10} -{" "}
              {currentPage * 10 > bidsCount ? bidsCount : currentPage * 10}{" "}
              {t("of")} {bidsCount}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
