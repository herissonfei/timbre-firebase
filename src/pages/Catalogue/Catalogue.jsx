import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { Nav } from "../../components/Nav/Nav";
import { Footer } from "../../components/Footer/Footer";
import { Pagination } from "../../components/Pagination";
// img
import gallery1 from "../../img/png/icone-gallery-1.png";
import gallery2 from "../../img/png/icone-gallery-2.png";
import roundArrow from "../../img/png/icone-round-arrow-orange.png";

import coeur from "../../img/png/icone-coup-de-coeur.png";

import { db } from "../../firebase";

import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Catalogue.css";

export const Catalogue = () => {
  const [bidsData, setBidsData] = useState([]);

  const [bids, setBids] = useState([]);
  const [bidsCount, setBidsCount] = useState([]);
  // console.log(bidsData);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const itemsPerPage = 10;
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newData = bidsData.slice(startIndex, endIndex);
    setBids(newData);
  };

  const totalPages = Math.ceil(bidsCount / 10);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bids"), (snapshot) => {
      const bidsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // const bidDataArray = [];
      // snapshot.forEach((doc) => {
      //   bidDataArray.push(doc.data());
      // });
      // console.log(bidDataArray);
      setBids(bidsList.slice(0, 10));
      setBidsData(bidsList);
      setBidsCount(bidsList.length);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // 注意这里依赖项数组是空的，因为 onSnapshot 自身会处理更新
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
      try {
        let queryConstraints = [
          where("conditions", "in", selectedCategoriesConditions),
          // where("reserveprice", "<=", maxPrix),
          // where("reserveprice", ">=", minPrix),
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
        const docIds1 = querySnapshot1.docs.map((doc) => doc.id);
        console.log(docIds1);

        console.log(selectedCategoriesTypes);

        let query2 = query(
          collection(db, "bids"),
          where("type", "in", selectedCategoriesTypes),
          where("bidstampid", "in", docIds1) // Filter by document IDs from the first query
        );

        // Execute the second query
        const querySnapshot2 = await getDocs(query2);
        const results = querySnapshot2.docs.map((doc) => doc.data());
        console.log(results);

        // setBids(results);
        setBids(results.slice(0, 10));
        setBidsData(results);
        setBidsCount(results.length);
      } catch (err) {
        // setErr(true);
      }
    };

    if (chercher) {
      getChercher();
      setChercher(false);
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
      setBids(bidDataArray.slice(0, 10));
      setBidsData(bidDataArray);
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
      const Bidsdecroissant = [...bidsData].sort((a, b) => {
        return b.reserveprice - a.reserveprice;
      });

      setBidsData(Bidsdecroissant);
      setBids(Bidsdecroissant.slice(0, 10));
    } else if (event.target.value === "croissant") {
      const Bidscroissant = [...bidsData].sort((a, b) => {
        return a.reserveprice - b.reserveprice;
      });
      setBidsData(Bidscroissant);
      setBids(Bidscroissant.slice(0, 10));
    } else if (event.target.value === "tous") {
      const getBids = async () => {
        const bidsquerySnapshot = await getDocs(collection(db, "bids"));

        const bidDataArray = [];

        bidsquerySnapshot.forEach((doc) => {
          bidDataArray.push(doc.data());
        });
        setBids(bidDataArray.slice(0, 10));
        setBidsData(bidDataArray);
        setBidsCount(bidDataArray.length);
      };

      getBids();
    }
  };

  return (
    <div>
      <Header />
      <Nav />
      <main>
        {/* <!-- HERO --> */}
        <div className="hero hero--page-interieure">
          <div className="wrapper">
            <h1 className="hero__text">Parcourez nos enchères</h1>
            <h2 className="hero__text--sous-titre">Trouvez la perle rare</h2>
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
                  En cours
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
              <option value="tous">Tous</option>
              <option value="decroissant">Prix décroissant</option>
              <option value="croissant">Prix croissant</option>
              <option value="popularite">Par popularité</option>
              {/* 这里的css得改动一下 */}
              <option value="nouvellement-liste">Nouvellement listée</option>
              <option value="termine-bientot">Se terminant bientôt</option>
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
            aria-label="burger"
            data-js-search
          >
            Recherche Avancée
            <img
              width="5"
              src="assets/img/png/icone-link-arrow.png"
              alt="fleche dropwdown"
            />
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
              <h2>Recherche Avancée</h2>
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
                    <label htmlFor="parfaite">Parfaite</label>
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
                    <label htmlFor="excellente">Excellente</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="bonne"
                      checked={selectedCategoriesConditions.includes("Bonne")}
                      onChange={() => handleCategoryChange("Bonne")}
                    />
                    <label htmlFor="bonne">Bonne</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="moyenne"
                      checked={selectedCategoriesConditions.includes("Moyenne")}
                      onChange={() => handleCategoryChange("Moyenne")}
                    />
                    <label htmlFor="moyenne">Moyenne</label>
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
                    <label htmlFor="endommage">Endommagé</label>
                  </div>
                </section>
                <section>
                  <h3>Pays d'origine</h3>
                  <select
                    aria-label="select-country"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="tous">Tous les pays</option>
                    <option value="Royaume-uni">Royaume-Uni</option>
                    <option value="Etats-unis">États-unis</option>
                    <option value="Canada">Canada</option>
                    <option value="Australie">Australie</option>
                    <option value="Chine">Chine</option>
                    <option value="France">France</option>
                    <option value="Espagne">Espagne</option>
                  </select>
                </section>
                <section>
                  <h3>Prix</h3>
                  <div className="wrapper--header">
                    <div className="wrapper--header">
                      <input
                        type="number"
                        placeholder="00.00"
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
                <section>
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
                </section>
                <section>
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
                </section>
                <section>
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
                </section>
                <div className="wrapper--header">
                  <div>
                    <Link
                      className="btn btn--text-icone default"
                      to="#"
                      onClick={handleParDefault}
                    >
                      Par défaut
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
                      Chercher
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            {/* <!-- ASIDE MOBILE RECHERCHE AVANCÉE --> */}
            <aside
              className="menu__mobile menu--close menu__mobile--white"
              aria-label="aside-search-close"
              data-js-search-bar
            >
              {/* <!-- Bouton close --> */}
              <div className="menu__close--wrapper" data-js-close-search-bar>
                <button
                  className="menu__close"
                  aria-label="aside-search-close-btn"
                ></button>
              </div>

              <div className="search-bar search-bar--mobile">
                <form method="GET">
                  <section>
                    <h3>Condition</h3>
                    <select aria-label="select-condition">
                      <option value="tous">Tous</option>
                      <option value="parfaite">Parfaite</option>
                      <option value="excellente">excellente</option>
                      <option value="bonne">Bonne</option>
                      <option value="moyenne">Moyenne</option>
                      <option value="endommage">Endommagé</option>
                    </select>
                  </section>
                  <section>
                    <h3>Pays d'origine</h3>
                    <select aria-label="mobile-select-country">
                      <option value="tous">Tous les pays</option>
                      <option value="royaume-uni">Royaume-Uni</option>
                      <option value="etats-unis">États-unis</option>
                      <option value="canada">Canada</option>
                      <option value="australie">Australie</option>
                      <option value="chine">Chine</option>
                      <option value="france">France</option>
                      <option value="espagne">Espagne</option>
                    </select>
                  </section>
                  <section>
                    <h3>Prix</h3>
                    <div className="wrapper--header">
                      <div className="wrapper--header">
                        <input type="number" name="prix" placeholder="00.00" />
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
                  <section>
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
                  </section>
                  <section>
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
                  </section>
                  <section>
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
                  </section>
                  <div className="wrapper--header-mobile">
                    <div>
                      <Link className="btn btn--text-icone">
                        Par défaut
                        <img
                          src="assets/img/png/icone-round-arrow-orange.png"
                          alt="icone fleche par defaut"
                        />
                      </Link>
                      <Link className="btn btn--text-icone" to="#">
                        Chercher
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
                {bids.length} enchères trouvées | {(currentPage - 1) * 10} -{" "}
                {currentPage * 10 > bidsCount ? bidsCount : currentPage * 10} de{" "}
                {bidsCount}
              </p>
              <div className="grid grid--5-var">
                {/* --------------------------------------------------------------------------------------- */}
                {bids.map((bid) => (
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
                      <p>{bid.conditions}</p>
                      <p>{bid.type}</p>
                      <p>{bid.country}</p>

                      <p className="tile__text">
                        Mise courante |{" "}
                        <span>{bid.auctioncount}&nbsp;offre</span>
                      </p>
                      <span>{bid.reserveprice}$</span>
                      <p className="tile__text-small">
                        <small>
                          {/* 回过头看 */}
                          dernière offre par user2024
                        </small>
                      </p>
                      <Link className="btn tile__btn" to={`/enchere/${bid.id}`}>
                        Miser
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
              {bidsCount} enchères trouvées | 0 - 20 de {bidsCount}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
