import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";

import coeur from "../img/png/icone-coup-de-coeur.png";
import paiement from "../img/png/icone-payment.png";
import tinbre2 from "../img/jpg/encheres/timbre-2.jpg";
import tinbre3 from "../img/jpg/encheres/timbre-3.jpg";
import tinbre4 from "../img/jpg/encheres/timbre-4.jpg";
import tinbre5 from "../img/jpg/encheres/timbre-5.jpg";
import arrowBlueLeft from "../img/png/icone-link-arrow-blue-left.png";
// import arrowBlueUp from "../img/png/icone-link-arrow-blue-up.png";
import linkArrowBlue from "../img/png/icone-link-arrow-blue.png";

// import thumbnail from "../img/jpg/encheres/thumbnail-enchere-3.jpg";
import Détails from "../img/png/icone-eye.png";
import Historique from "../img/png/icone-round-arrow.png";
import Vendeur from "../img/png/icone-profil.png";

import { db } from "../firebase";
import { collection, doc, query, where, getDocs } from "firebase/firestore";

export const Enchere = () => {
  const { id } = useParams();
  // console.log(id);
  const { t } = useTranslation();

  const [bid, setBid] = useState([]);
  const [user, setUser] = useState(null);
  const [reserveprice, setreservePrice] = useState("");
  const [minPrice, setminPrice] = useState("");

  const [newPrice, setnewPrice] = useState("");
  // console.log(bid);
  useEffect(() => {
    const getBids = async () => {
      const q = query(collection(db, "bids"), where("bidstampid", "==", id));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setBid(doc.data());
      });
    };

    getBids(); // 这里调用函数仅在组件挂载时运行一次
  }, [id]);

  function handleMin(e) {
    e.preventDefault();
  }
  // 创建一个新的Date对象，该对象会表示当前的日期和时间
  const now = new Date();

  // 获取年、月、日、时、分、秒
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始的，所以要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 使用模板字符串和padStart()方法来格式化日期和时间
  const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // console.log(formattedDate);

  // console.log(new Date(formattedDate).getTime());
  // console.log(new Date(bid.enddate).getTime());

  const fermeDans =
    new Date(bid.enddate).getTime() > new Date(formattedDate).getTime()
      ? dateDifference(bid.enddate, formattedDate)
      : "Fermé";
  // console.log(fermeDans);
  function dateDifference(date1, date2) {
    // 将两个日期转换为毫秒值
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();

    // 计算差值（毫秒）
    let difference = Math.abs(timestamp2 - timestamp1);

    // 计算天数、小时、分钟和秒数
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * 1000 * 60;

    const seconds = Math.floor(difference / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
  function handleMiser(e) {
    e.preventDefault();
  }

  const handleInputChange = (event) => {
    // setnewPrice(parseFloat(event.target.value));
    console.log("1");
  };

  return (
    <main>
      <Header />
      <Nav />

      {/* <!-- HERO --> */}
      <div className="hero hero--enchere">
        <div className="wrapper">
          <h2>
            Lot # {bid.stampName} | <span>{bid.status}</span>
            <img
              className="icone-coup-coeur"
              src={coeur}
              alt="icone coup de coeur lord"
            />
          </h2>
          <h1>{bid.name}</h1>
        </div>
      </div>
      {/* <!-- DETAIL ENCHERE --> */}
      <section className="bg--grey-var">
        <div className="wrapper">
          <div className="link wrapper--header ">
            <img
              className="icone-link-arrow"
              src={arrowBlueLeft}
              alt="icone fleche link"
            />
            <Link className="link--border-blue" to="/catalogue">
              {t("Back_catalog")}
            </Link>
          </div>
          <div className="pannels">
            {/* <!-- Galerie image de l'enchère --> */}
            <div className="gallery__container">
              <div className="tile__img-wrapper tile__img-wrapper--enchere">
                <img className="tile__img" src={bid.imageurl} alt="" />
              </div>
              <div className="gallery__nav">
                {/* <div>
                                    <Link>
                                        <img
                                            width="25"
                                            src={arrowBlueUp}
                                            alt="flèche navigation galerie"
                                        />
                                    </Link>
                                </div> */}
                {/* <div>
                                    <Link>
                                        <img
                                            width="100"
                                            src={thumbnail}
                                            alt=" de l'enchère"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link>
                                        <img
                                            width="100"
                                            src="/img/jpg/encheres/thumbnail-enchere-1.jpg"
                                            alt=" de l'enchère"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link>
                                        <img
                                            width="100"
                                            src="/img/jpg/encheres/thumbnail-enchere-2.jpg"
                                            alt=" de l'enchère"
                                        />
                   
                   
                                    </Link>
                                </div> */}
                {/* <div>
                                    <Link>
                                        <img
                                            width="25"
                                            src="/img/png/icone-dropdown-arrow-blue.png"
                                            alt="flèche navigation galerie"
                                        />
                                    </Link>
                                </div> */}
              </div>
            </div>
            <div className="pannels--container">
              <div className="pannel__detail wrapper--header">
                {/* <!-- Navigation panneau --> */}
                <div className="pannel__nav">
                  <div>
                    <img width="25" src={Détails} alt="icone détail" />
                    <p>{t("Details")}</p>
                  </div>
                  <div>
                    <img width="25" src={Historique} alt="icone historique" />
                    <p>{t("history")}</p>
                  </div>
                  <div>
                    <img width="25" src={Vendeur} alt="icone vendeur" />
                    <p>{t("Seller")}</p>
                  </div>
                </div>
                {/* <!-- Description panneau --> */}
                <div className="pannel__text" data-js-pannel>
                  <p className="tile__text">
                    {t("Current")} |{" "}
                    <strong>
                      {bid.auctioncount} {t("offer")}
                    </strong>
                  </p>
                  <h2>{bid.reserveprice}$</h2>
                  <p className="tile__text-small">
                    <small>
                      {/* 之后再补 */}
                      {/*                   {t("Last_offer_by_user2024")}
                       */}
                    </small>
                  </p>
                  <p>
                    <strong>Description</strong> : {bid.description}
                  </p>
                  <p>
                    <strong>Type</strong> : {bid.type}
                  </p>
                  <p>
                    <strong>Condition</strong> : {bid.conditions}
                  </p>
                  <p>
                    <strong>Format</strong> : {bid.dimensions}
                  </p>
                  <p>
                    <strong>{t("Year_issue")}</strong> : {bid.creationdate}
                  </p>
                  <p>
                    <strong>{t("country")}</strong> : {bid.country}
                  </p>
                </div>
                <div className="pannel__text pannel__hidden" data-js-pannel>
                  <p>{t("history")}</p>
                </div>
                <div className="pannel__text pannel__hidden" data-js-pannel>
                  <p>{t("Seller")}</p>
                </div>
              </div>
              {/* <!-- Form miser enchère panneau --> */}
              <div className="pannel__form grid">
                <div>
                  <p>{t("Close")}</p>
                  <p className="tile__lot tile__lot--red">
                    <strong>
                      {/* {new Date(bid.enddate)} */}
                      {fermeDans === "Fermé"
                        ? "Fermé"
                        : `${fermeDans.days}d-${fermeDans.hours}
                                            h-${fermeDans.minutes}m-
                                            ${fermeDans.seconds}s`}
                    </strong>
                  </p>
                  <small>
                    {t("Beginning")}: {bid.startdate} | 00H00
                  </small>
                  <br />

                  <small>
                    {t("Seller")}
                    {t("END")}: {bid.enddate} | 00H00
                  </small>
                </div>
                {/* <span>1</span> */}
                <div className="grid grid--3-btn">
                  <input
                    type="number"
                    // value={reserveprice}
                    onChange={handleInputChange}
                    placeholder={bid.reserveprice}
                  />
                  <Link
                    className="btn"
                    onClick={handleMiser}
                    style={{
                      pointerEvents:
                        newPrice >= parseFloat(bid.reserveprice) + 0.5
                          ? "auto"
                          : "none",
                    }}
                  >
                    {t("Bet")}
                  </Link>
                  <Link className="btn" onClick={handleMin}>
                    Min
                  </Link>
                </div>
                <ul>
                  <li>
                    {t("Sending_country")} : {t("United_Kingdom")}
                  </li>
                  <li>{t("Free_international_delivery")}</li>
                  <li>{t("Certification_guaranteed")}</li>
                </ul>
                <img width="150" src={paiement} alt="icone options paiement" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ENCHÈRES SIMILAIRES --> */}
      <div className="wrapper">
        <section>
          <div className="link wrapper--header ">
            <h2>{t("same_category")}</h2>
            <Link className="link--border-blue" to="#">
              {t("Allt")}&nbsp;{t("display")}
            </Link>
            <img
              className="icone-link-arrow"
              src={linkArrowBlue}
              alt="icone fleche link"
            />
          </div>
          <div className="grid grid--5-second-var">
            <div className="tile bg--tile">
              <div className="tile__container">
                <div>
                  <p className="tile__lot">
                    Lot #<strong>01</strong>
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
                  <img className="tile__img" src={tinbre5} alt="" />
                </div>
                <h3>Gold Coast 115-27-LH</h3>
                <p className="tile__text">
                  {t("Current")} | <span>1 {t("offer")}</span>
                </p>
                <span>350.00$</span>
                <p className="tile__text-small">
                  <small> {t("Last_offer_by_user2024")}</small>
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
                  {t("Current")} | <span>5 {t("offers")}</span>
                </p>
                <span>259.00$</span>
                <p className="tile__text-small">
                  <small> {t("Last_offer_by_user2024")}</small>
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
                  <img className="tile__img" src={tinbre3} alt="" />
                </div>
                <h3>USA 1857 Scott #36 Used. Deep color</h3>
                <p className="tile__text">
                  {t("Current")} | <span>10 {t("offers")}</span>
                </p>
                <span>79.00$</span>
                <p className="tile__text-small">
                  <small> {t("Last_offer_by_user2024")}</small>
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
                  <img className="tile__img" src={tinbre4} alt="" />
                </div>
                <h3>AFFORDABLE GENUINE SCOTT USED SET</h3>
                <p className="tile__text">
                  {t("Current")} | <span>2 {t("offers")}</span>
                </p>
                <span>150.00$</span>
                <p className="tile__text-small">
                  <small> {t("Last_offer_by_user2024")}</small>
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
                  {t("Current")} | <span>Aucune offre</span>
                </p>
                <span>10.00$</span>
                <p className="tile__text-small">
                  <small> {t("Last_offer_by_user2024")}</small>
                </p>
                <Link className="btn tile__btn" to="enchere.html">
                  {t("Bet")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};
