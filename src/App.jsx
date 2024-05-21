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
import AgregarDocente from "./pages/director/AgregarDocente";
import AgregarDocentes from "./pages/director/AgregarDocentes";
import VisualizarDatosDocente from "./pages/director/VisualizarDatosDocente";
import ModificarDocente from "./pages/director/ModificarDocente";
import ListaMateria from "./pages/director/ListaMateria";
import CrearMateria from "./pages/director/CrearMateria";
import ModificarMateria from "./pages/director/ModificarMateria";
import ListaCompetencia from "./pages/director/ListaCompetencia";
import CrearCompetencia from "./pages/director/CrearCompetencia";
import ModificarCompetencia from "./pages/director/ModificarCompetencia";
import ListaCategoria from "./pages/director/ListaCategoria";
import CrearCategoria from "./pages/director/CrearCategoria";
import ModificarCategoria from "./pages/director/ModificarCategoria";
import ListaResultadoAprendizaje from "./pages/director/ListaResultadoAprendizaje";
import CrearResultadoAprendizaje from "./pages/director/CrearResultadoAprendizaje";
import ModificarResultadoAprendizaje from "./pages/director/ModificarResultadoAprendizaje";
import ListaRACurso from "./pages/director/ListaRACurso";
import CrearRACurso from "./pages/director/CrearRACurso";
import ModificarRACurso from "./pages/director/ModificarRACurso";
import ListaInstrumentosEvaluacion from "./pages/director/ListaInstrumentosEvaluacion";
import ModificarInstrumentosEvaluacion from "./pages/director/ModificarInstrumentosEvaluacion";
import CrearInstrumentosEvaluacion from "./pages/director/CrearInstrumentosEvaluacion";
import ListaUnidadesTematicas from "./pages/director/ListaUnidadesTematicas";
import CrearUnidadesTematicas from "./pages/director/CrearUnidadesTematicas";
import ModificarUnidadesTematicas from "./pages/director/ModificarUnidadesTematicas";
import ListaSubtema from "./pages/director/ListaSubtema";
import CrearSubtema from "./pages/director/CrearSubtema";
import ModificarSubtema from "./pages/director/ModificarSubtema";

//Rutas Docente
import HeaderDocente from "./components/HeaderDocente";
import PerfilDocente from "./pages/Docente/PerfilDocente";
import ModificarDirector from "./pages/director/ModificarDirector";

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
                            element={
                                <IniciarSesion handleLogin={handleLogin} />
                            }
                        />
                        <Route
                            path="recuperarPassword"
                            element={<RecuperarPassword />}
                        />
                        <Route
                            path="cambiarPassword"
                            element={<CambiarPassword />}
                        />
                        <Route
                            path="cambiarPassword/:user_id/:resetString"
                            element={<CambiarPassword />}
                        />
                    </Route>

                    <Route
                        path="/director"
                        element={
                            <RutaPrivadaDirector
                                isAuthenticated={isAuthenticated}
                            />
                        } >
                       
                        <Route
                        index
                            path="modificardirector/:id"
                            element={<ModificarDirector />}
                        />
                    
                        <Route
                            path="modificardirector/:id/modificarperfil"
                            element={<ModificarPerfil />}
                        />
                        
                       
                        
                        <Route path="listadocente" element={<ListaDocente />} />
                        <Route
                            path="listadocente/agregardocente"
                            element={<AgregarDocente />}
                        />
                        <Route
                            path="agregardocentes"
                            element={<AgregarDocentes />}
                        />
                        <Route
                            path="listadocente/visualizardocente/:id"
                            element={<VisualizarDatosDocente />}
                        />
                        <Route
                            path="listadocente/modificardocente/:id"
                            element={<ModificarDocente />}
                        />
                        <Route index element={<ListaMateria />} />
                        <Route
                            path="crearmateria"
                            element={<CrearMateria />}
                        />
                        <Route
                            path="modificarmateria/:id"
                            element={<ModificarMateria />}
                        />
                        <Route
                            path="listacompetencia"
                            element={<ListaCompetencia />}
                        />
                        <Route
                            path="listacompetencia/crearcompetencia"
                            element={<CrearCompetencia />}
                        />
                        <Route
                            path="listacompetencia/modificarcompetencia/:id"
                            element={<ModificarCompetencia />}
                        />
                        <Route
                            path="listacategoria"
                            element={<ListaCategoria />}
                        />
                        <Route
                            path="listacategoria/crearcategoria"
                            element={<CrearCategoria />}
                        />
                        <Route
                            path="listacategoria/modificarcategoria/:id"
                            element={<ModificarCategoria />}
                        />
                        <Route
                            path="listaresultadoaprendizaje"
                            element={<ListaResultadoAprendizaje />}
                        />
                        <Route
                            path="listaresultadoaprendizaje/crearresultadoaprendizaje"
                            element={<CrearResultadoAprendizaje />}
                        />
                        <Route
                            path="listaresultadoaprendizaje/modificarresultadoaprendizaje/:id"
                            element={<ModificarResultadoAprendizaje />}
                        />
                        <Route path="listaracurso" element={<ListaRACurso />} />
                        <Route
                            path="listaracurso/crearracurso"
                            element={<CrearRACurso />}
                        />
                        <Route
                            path="listaracurso/modificarracurso/:id"
                            element={<ModificarRACurso />}
                        />
                        <Route
                            path="listainstrumentoevaluacion"
                            element={<ListaInstrumentosEvaluacion />}
                        />
                        <Route
                            path="listainstrumentoevaluacion/crearinstrumentoevaluacion"
                            element={<CrearInstrumentosEvaluacion />}
                        />
                        <Route
                            path="listainstrumentoevaluacion/modificarinstrumentoevaluacion/:id"
                            element={<ModificarInstrumentosEvaluacion />}
                        />
                        <Route
                            path="listaunidadestematicas/:id"
                            element={<ListaUnidadesTematicas />}
                        />
                        <Route
                            path="crearunidadestematicas"
                            element={<CrearUnidadesTematicas />}
                        />
                        <Route
                            path="listaunidadestematicas/:id/crearunidadestematicas"
                            element={<CrearUnidadesTematicas />}
                        />
                        <Route
                            path="listaunidadestematicas/:id/modificarunidadestematicas/:id"
                            element={<ModificarUnidadesTematicas />}
                        />
                        <Route path="listaunidadestematicas/:id/listasubtema/:id" element={<ListaSubtema />} />
                        <Route
                            path="listaunidadestematicas/:id/crearsubtema"
                            element={<CrearSubtema />}
                        />
                        <Route
                            path="listaunidadestematicas/:id/listasubtema/:id/crearsubtema"
                            element={<CrearSubtema />}
                        />
                        <Route
                            path="listaunidadestematicas/:id/listasubtema/:id/modificarsubtema/:id"
                            element={<ModificarSubtema />}
                        />
                    </Route>
                    <Route path="/docente" element={<HeaderDocente />}>
                        <Route
                            path="perfildocente"
                            element={<PerfilDocente />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
