import React, { useEffect } from "react";
import FeedEmpresas from "./Empresas.js";
import FeedDeclaracao from "./Declaracao.js";
import FeedSuasDeclara from "./SuasDeclaracao.js";
import Usuarios from "./Usuarios.js";
import Tipos from "./Tipo.js";
import FeedIndex from "./inicio.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<FeedIndex />} />
          <Route path="/empresas" element={<FeedEmpresas />} />
          <Route path="/declaracao" element={<FeedDeclaracao />} />
          <Route path="/suasDeclaracao" element={<FeedSuasDeclara />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/tipoDeclara" element={<Tipos />} />
        </Routes>
      </Router>
  );
}

export default App;
