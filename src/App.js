import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { Home } from "./pages/Home";
import { Register } from "./pages//Register/Register";
import { Login } from "./pages/Login/Login";
import { Catalogue } from "./pages/Catalogue/Catalogue";
import { Enchere } from "./pages/Enchere";
import { Publish } from "./pages/Publish/Publish";
import { ListePrive } from "./pages/ListePrive/ListePrive";

function App() {
  // 之后有用
  // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  // const { t } = useTranslation();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="enchere/:id" element={<Enchere />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="publish" element={<Publish />} />
          <Route path="listePrive" element={<ListePrive />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
