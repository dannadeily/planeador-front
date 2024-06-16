import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import VisualizarDatosPlaneador from "./VisualizarDatosPlaneador";

const ModificarPlaneador = () => {
  const [filas, setFilas] = useState({
    valor_evaluacion: "",
    estrategia_retroalimentacion: "",
    semana_retroalimentacion: "",
    corte_periodo: "",
    semana_actividad_desarrollada: "",
    planeador_id: "",
    ra_id: "",
    raCursos: [],
    tipoEvidencias: [],
    instrumentos: [],
    unidadesTematicas: [],
  });

  const [planeador, setPlaneador] = useState({});
  const [raCurso, setRaCurso] = useState([]);
  const [tipoEvidencias, setTipoEvidencias] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [unidadesTematicas, setUnidadesTematicas] = useState([]);
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();

  const handleInputChange = (field, value) => {
    setFilas((prevFilas) => ({ ...prevFilas, [field]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planeadorResponse = await conexionAxios.get(`planeador/${id}`);
        setPlaneador(planeadorResponse.data);
        console.log("planeador", planeadorResponse.data);

        const raCursoResponse = await conexionAxios.get("raCurso/");
        setRaCurso(raCursoResponse.data);

        if (raCursoResponse.data.length > 0) {
          const firstRaCursoId = raCursoResponse.data[0].id;
          const tipoEvidenciasResponse = await conexionAxios.get(
            `tipoEvidencia/raCurso/${firstRaCursoId}`
          );
          setTipoEvidencias(tipoEvidenciasResponse.data);
          console.log(tipoEvidenciasResponse.data);
        }

        const instrumentosResponse = await conexionAxios.get("instrumento/");
        setInstrumentos(instrumentosResponse.data);
        console.log(instrumentosResponse.data);

        const unidadesTematicasResponse = await conexionAxios.get("unidad/");
        setUnidadesTematicas(unidadesTematicasResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setAlertaError({
          error: true,
          message: "Error al obtener datos del planeador.",
        });
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await conexionAxios.post("planeador/fila/create", {
        valor_evaluacion: filas.valor_evaluacion,
        estrategia_retroalimentacion: filas.estrategia_retroalimentacion,
        semana_retroalimentacion: filas.semana_retroalimentacion,
        corte_periodo: parseInt(filas.corte_periodo),
        semana_actividad_desarrollada: filas.semana_actividad_desarrollada,
        planeador_id: parseInt(id),
        ra_id: parseInt(filas.ra_id),
        materia_id: parseInt(planeador.Materia.id),
        raCursos: parseInt(filas.raCursos),
        tipoEvidencias: filas.tipoEvidencias,
        instrumentos: filas.instrumentos.map((instrumento) =>
          parseInt(instrumento)
        ),
        unidadesTematicas: filas.unidadesTematicas.map((unidad) =>
          parseInt(unidad)
        ), // Convertir cada elemento a número,
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setFilas({
          valor_evaluacion: "",
          estrategia_retroalimentacion: "",
          semana_retroalimentacion: "",
          corte_periodo: "",
          semana_actividad_desarrollada: "",
          planeador_id: "",
          ra_id: "",
          raCursos: [],
          tipoEvidencias: [],
          instrumentos: [],
          unidadesTematicas: [],
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
        setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
      }
    }
  };

  const handleRaCursoChange = async (value) => {
    const raCursoId = value;
    try {
      const tipoEvidenciasResponse = await conexionAxios.get(
        `tipoEvidencia/raCurso/${raCursoId}`
      );
      setTipoEvidencias(tipoEvidenciasResponse.data);

      setFilas((prevFilas) => ({
        ...prevFilas,
        raCursos: [...prevFilas.raCursos, raCursoId], // Agregar el id al array
      }));
    } catch (error) {
      console.error("Error al obtener tipos de evidencia:", error);
      setAlertaError({
        error: true,
        message: "Error al obtener tipos de evidencia.",
      });
    }
  };

  return (
    <>
      <div>
        <VisualizarDatosPlaneador />
      </div>

      <div className="px-10 py-5">
        <div className="xl:mx-auto lg:mx-auto md:mx-auto sm:mx-20 bg-white shadow rounded-lg p-10">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-left">Crear Fila Planeador</h1>

            {alertaError.error && !alertaExitoso.error && (
              <AlertaError message={alertaError.message} />
            )}
            {alertaExitoso.error && (
              <AlertaExitoso message={alertaExitoso.message} />
            )}

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="estrategia_retroalimentacion"
                  >
                    Estrategia o metodología a emplear para realimentar
                    estudiante:
                  </label>
                  <input
                    id="estrategia_retroalimentacion"
                    type="text"
                    placeholder="Estrategia de retroalimentación"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={filas.estrategia_retroalimentacion}
                    onChange={(e) =>
                      handleInputChange(
                        "estrategia_retroalimentacion",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="corte_periodo"
                  >
                    Corte del periodo:
                  </label>
                  <select
                    id="corte_periodo"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={filas.corte_periodo}
                    onChange={(e) =>
                      handleInputChange("corte_periodo", e.target.value)
                    }
                  >
                    <option value="1">Corte 1</option>
                    <option value="2">Corte 2</option>
                    <option value="3">Corte 3</option>
                    <option value="4">Corte 4</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="raCurso"
                  >
                    Resultado de aprendizaje del curso:
                  </label>
                  {raCurso.length > 0 && (
                    <select
                      id="raCurso"
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      value={filas.raCursos}
                      onChange={(e) => handleRaCursoChange(e.target.value)}
                    >
                      <option value="">Seleccionar RA del curso</option>
                      {raCurso.map((ra) => (
                        <option key={ra.id} value={ra.id}>
                          {ra.nombre}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="semana_retroalimentacion"
                  >
                    Semana de realimentación sobre evaluación:
                  </label>
                  <input
                    id="semana_retroalimentacion"
                    type="text"
                    placeholder="Semana de realimentación"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={filas.semana_retroalimentacion}
                    onChange={(e) =>
                      handleInputChange(
                        "semana_retroalimentacion",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="tipoEvidencias"
                  >
                    Tipo de evidencia de aprendizaje:
                  </label>
                  {tipoEvidencias.length > 0 && (
                    <select
                      id="tipoEvidencias"
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      value={filas.tipoEvidencias}
                      onChange={(e) =>
                        handleInputChange("tipoEvidencias", e.target.value)
                      }
                    >
                      <option value="">Seleccionar tipo de evidencia</option>
                      {tipoEvidencias.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nombre}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="semana_actividad_desarrollada"
                  >
                    En qué semana se realiza la actividad:
                  </label>
                  <input
                    id="semana_actividad_desarrollada"
                    type="text"
                    placeholder="Semana realizada"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={filas.semana_actividad_desarrollada}
                    onChange={(e) =>
                      handleInputChange(
                        "semana_actividad_desarrollada",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="instrumentos"
                  >
                    Instrumentos de evaluación:
                  </label>
                  {instrumentos.length > 0 && (
                    <select
                      id="instrumentos"
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      multiple
                      value={filas.instrumentos} // Debe ser un array
                      onChange={(e) =>
                        handleInputChange(
                          "instrumentos",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          ) // Obtener un array de valores seleccionados
                        )
                      }
                    >
                      <option value="">Seleccionar instrumento</option>
                      {instrumentos.map((instrumento) => (
                        <option key={instrumento.id} value={instrumento.id}>
                          {instrumento.nombre}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="unidadesTematicas"
                  >
                    Unidad Temática:
                  </label>
                  {unidadesTematicas.length > 0 && (
                    <select
                      id="unidadesTematicas"
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      multiple
                      value={filas.unidadesTematicas} // Debe ser un array
                      onChange={(e) =>
                        handleInputChange(
                          "unidadesTematicas",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          ) // Obtener un array de valores seleccionados
                        )
                      }
                    >
                      <option value="">Seleccionar unidad temática</option>
                      {unidadesTematicas.map((unidad) => (
                        <option key={unidad.id} value={unidad.id}>
                          {unidad.nombre}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="my-5 mx-2">
                  <label
                    className="uppercase text-gray-600 block font-bold"
                    htmlFor="valor_evaluacion"
                  >
                    Valor de la evaluación del instrumento:
                  </label>
                  <input
                    id="valor_evaluacion"
                    type="text"
                    placeholder="Valor de la evaluación"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={filas.valor_evaluacion}
                    onChange={(e) =>
                      handleInputChange("valor_evaluacion", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Registrar"
              className="bg-blue-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ModificarPlaneador;
