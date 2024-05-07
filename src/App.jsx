import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import IniciarSesion from "./pages/IniciarSesion";
import RecuperarPassword from "./pages/RecuperarPassword";
import RutaPrivadaDirector from "./layout/RutaPrivadaDirector";
import CambiarPassword from "./pages/CambiarPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              index
              element={<IniciarSesion handleLogin={handleLogin} />}
            />
            <Route path="recuperarPassword" element={<RecuperarPassword />} />
            <Route path="cambiarPassword" element={<CambiarPassword />} />
            <Route
              path="cambiarPassword/:user_id/:resetString"
              element={<CambiarPassword />}
            />
          </Route>

          <Route
            path="/director"
            element={<RutaPrivadaDirector isAuthenticated={isAuthenticated} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
