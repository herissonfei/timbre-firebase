import React, { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/AuthContext";
import "./Publish.css";
import logo from "../../img/png/logo.png";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // const [user, setUser] = useState([]);
  const stampId = uuid();
  const [startingprice, setStartingPrice] = useState(10);
  const [reserveprice, setreservePrice] = useState(10);
  const [bidtime, setBidTime] = useState("2023-06-10");
  const [auctioncount, setAuctionCount] = useState(0);
  const [bidderid, setBidderId] = useState("");
  const [country, setCountry] = useState("Canada");
  const [startdate, setStartDate] = useState("2023-06-10");
  const [enddate, setEndDate] = useState("2023-06-17");
  const [favorites, setFavorites] = useState("oui");
  const [stampName, setStampName] = useState("stampName");
  const [creationdate, setCreationDate] = useState("2003-06-17");
  const [dimensions, setDimensions] = useState("2cm x 3cm");
  const [conditions, setConditions] = useState("Excellente");
  const [status, setStatus] = useState("Available");
  const [certified, setCertified] = useState("Yes");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
  );
  const [type, setType] = useState("Général");
  const imageurl = "";
  // const [imageurl, setImageURL] = useState("");

  // console.log(stampId);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const getUser = () => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setBidderId(doc.data().id);
          // console.log(doc.data());
          // console.log(doc.data().id);
        });

        return () => {
          unsub();
        };
      };

      getUser();
    }
  }, [currentUser]);

  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(selectedFile.name);
  // 上传图片
  // console.log(selectedFile);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // setImageURL(`\\img\\jpg\\encheres\\${event.target.files[0].name}`);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      country,
      startingprice,
      reserveprice,
      bidtime,
      auctioncount,
      bidderid,
      startdate,
      enddate,
      favorites,
      stampName,
      creationdate,
      dimensions,
      conditions,
      status,
      certified,
      description,
      imageurl,
      type,
    };
    // console.log(selectedFile);
    // console.log(selectedFile.name);
    const storageRef = ref(storage, selectedFile.name);

    // uploadBytes(storageRef, selectedFile).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });

    uploadBytes(storageRef, selectedFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setDoc(doc(db, "bids", stampId), {
          id: stampId,
          stampName: data.stampName,
          startingprice: data.startingprice,
          reserveprice: data.reserveprice,
          creationdate: data.creationdate,
          dimensions: data.dimensions,
          country: data.country,
          conditions: data.conditions,
          status: data.status,
          certified: data.certified,
          description: data.description,
          type: data.type,
          bidstampid: stampId,
          bidderid: data.bidderid,
          bidtime: data.bidtime,
          startdate: data.startdate,
          enddate: data.enddate,
          favorites: data.favorites,
          auctioncount: data.auctioncount,
          stampid: stampId,
          imageurl: downloadURL,
        });
      });
    });

    navigate(-1);
    // navigate('/catalogue');
  };
  return (
    <div className="container">
      {/* <h1 className="black">邮票竞拍表单</h1> */}
      <div>
        <div className="returnLogo">
          <a href="/home">
            <img
              width="200"
              className="returnImg"
              src={logo}
              alt="logo Stampee"
            />
          </a>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="formContainer">
            <div className="box-container">
              <div className="formContainer--div">
                {/* <div className="form-group">
                        <label className="labelForm" htmlFor="bidderid">
                            当前登录的用户的ID:
                        </label> */}

                <input
                  type="hidden"
                  id="bidderid"
                  value={bidderid}
                  onChange={(event) => setBidderId(event.target.value)}
                />

                {/* </div> */}

                <div className="form-group">
                  <label className="labelForm" htmlFor="startdate">
                    startdate:
                  </label>
                  <input
                    type="date"
                    id="startdate"
                    value={startdate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="enddate">
                    enddate:
                  </label>
                  <input
                    type="date"
                    id="enddate"
                    value={enddate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="labelForm" htmlFor="favorites">
                    favorites:
                  </label>
                  <input
                    type="text"
                    id="favorites"
                    value={favorites}
                    onChange={(event) => setFavorites(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="stampName">
                    name:
                  </label>
                  <input
                    type="text"
                    id="stampName"
                    value={stampName}
                    onChange={(event) => setStampName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="creationdate">
                    creationdate:
                  </label>
                  <input
                    type="date"
                    id="creationdate"
                    value={creationdate}
                    onChange={(event) => setCreationDate(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="labelForm" htmlFor="bidtime">
                    bidtime:
                  </label>
                  <input
                    type="date"
                    id="bidtime"
                    value={bidtime}
                    onChange={(event) => setBidTime(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="labelForm" htmlFor="startingprice">
                    startingprice:
                  </label>
                  <input
                    type="number"
                    id="startingprice"
                    value={startingprice}
                    onChange={(event) => setStartingPrice(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="labelForm" htmlFor="reserveprice">
                    reserveprice:
                  </label>
                  <input
                    type="number"
                    id="reserveprice"
                    value={reserveprice}
                    onChange={(event) =>
                      setreservePrice(parseInt(event.target.value))
                    }
                  />
                </div>
                <div className="form-group">
                  <input type="file" onChange={handleFileChange} />
                </div>
                {/* ---- */}
              </div>
              <div className="formContainer--div">
                <div className="form-group">
                  <label className="labelForm" htmlFor="dimensions">
                    dimensions:
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    value={dimensions}
                    onChange={(event) => setDimensions(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="conditions">
                    conditions:
                  </label>
                  <input
                    type="text"
                    id="conditions"
                    value={conditions}
                    onChange={(event) => setConditions(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="status">
                    status:
                  </label>
                  <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="certified">
                    certified:
                  </label>
                  <input
                    type="text"
                    id="certified"
                    value={certified}
                    onChange={(event) => setCertified(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="type">
                    type:
                  </label>
                  <input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="auctioncount">
                    auctioncount:
                  </label>
                  <input
                    type="number"
                    id="auctioncount"
                    value={auctioncount}
                    onChange={(event) => setAuctionCount(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="country">
                    pays:
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="labelForm" htmlFor="description">
                    description:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <button className="blue">Publier</button>
          </div>
        </form>
      </div>
    </div>
  );
};
