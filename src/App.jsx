import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
//Prinipales
import Header from "./components/Header";
import IniciarSesion from "./pages/IniciarSesion";
import RecuperarPassword from "./pages/RecuperarPassword";
import RutaPrivadaDirector from "./layout/RutaPrivadaDirector";
import CambiarPassword from "./pages/CambiarPassword";
//Rutas Director
import ModificarPerfil from "./pages/ModificarPerfil";
import ListaDocente from "./pages/director/ListaDocente";
import AgregarDocente from "./pages/director/AgregarDocente"
import AgregarDocentes from "./pages/director/AgregarDocentes"
import VisualizarDatosDocente from "./pages/director/VisualizarDatosDocente"
import ModificarDocente from "./pages/director/ModificarDocente"

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
          >
            <Route path="modificarperfil" element={<ModificarPerfil />} />
            <Route path="listadocente" element={<ListaDocente />} />
            <Route path="listadocente/agregardocente" element={<AgregarDocente />} />
            <Route path="agregardocentes" element={<AgregarDocentes />} />
            <Route path="listadocente/visualizardocente/:id" element={<VisualizarDatosDocente/>} />
            <Route path="listadocente/modificardocente/:id" element={<ModificarDocente />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
