import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarFilaPlaneador = () => {
  const [planeador, setPlaneador] = useState({
    estrategia_retroalimentacion: "",
    corte_periodo: "",
    semana_retroalimentacion: "",
    semana_actividad_desarrollada: "",
    competencia_id: "",
    tipo_evidencia: "",
    instrumento_evaluacion: "",
    Unidades_Tematicas: [],
    valor_evaluacion: "",
  });
  const [editing, setEditing] = useState(false);
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaneador = async () => {
      try {
        const response = await conexionAxios.get("planeador/fila/" + id);
        setPlaneador(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPlaneador();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaneador({ ...planeador, [name]: value });
    setEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put(
        `planeador/fila/update/${id}`,
        planeador
      );

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false);
      }
    } catch (error) {
      if (error.response) {
        setAlertaError({ error: true, message: error.response.data.error });
        setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
      }
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="mb-4">
          <h1 className="text-2xl border-b-4 border-gray-300 text-left font-bold">
            Planeador
          </h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-2/3 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="estrategia_retroalimentacion"
            >
              Estrategia o metodología a emplear para realimentar estudiante:
            </label>
            {editing ? (
              <input
                type="text"
                name="estrategia_retroalimentacion"
                value={planeador.estrategia_retroalimentacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeador.estrategia_retroalimentacion}
              </span>
            )}
          </div>
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="corte_periodo"
            >
              Corte del periodo:
            </label>
            {editing ? (
              <input
                type="text"
                name="corte_periodo"
                value={planeador.corte_periodo || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeador.corte_periodo}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="semana_retroalimentacion"
            >
              Semana de realimentación sobre evaluación:
            </label>
            {editing ? (
              <input
                type="text"
                name="semana_retroalimentacion"
                value={planeador.semana_retroalimentacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeador.semana_retroalimentacion}
              </span>
            )}
          </div>

          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="semana_actividad_desarrollada"
            >
              En qué semana se realiza la actividad:
            </label>
            {editing ? (
              <input
                type="text"
                name="semana_actividad_desarrollada"
                value={planeador.semana_actividad_desarrollada || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeador.semana_actividad_desarrollada}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="competencia_id"
            >
              Resultado de aprendizaje del curso:
            </label>
            {editing ? (
              <select
                name="competencia_id"
                value={planeador.competencia_id || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Seleccionar Competencia</option>
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>
                    {competencia.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <span className="block text-gray-600"></span>
            )}
          </div>
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="tipo_evidencia"
            >
              Tipo de evidencia de aprendizaje:
            </label>
            {editing ? (
              <select
                name="tipo_evidencia"
                value={planeador.tipo_evidencia || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Seleccionar Evidencia</option>
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>
                    {competencia.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeador.tipo_evidencia}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="instrumento_evaluacion"
            >
              Instrumentos de evaluación:
            </label>
            {editing ? (
              <select
                name="instrumento_evaluacion"
                value={planeador.instrumento_evaluacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Seleccionar Instrumento</option>
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>
                    {competencia.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeador.instrumento_evaluacion}
              </span>
            )}
          </div>
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="unidad_tematica"
            >
              Unidad Temática:
            </label>
            {editing ? (
              <select
                name="unidad_tematica"
                value={planeador.unidad_tematica || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Seleccionar Unidad</option>
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>
                    {competencia.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <span className="block text-gray-600">
                {planeador.Unidades_Tematicas &&
                  planeador.Unidades_Tematicas.map((resultado) => (
                    <li key={resultado.nombre}>{resultado.nombre}</li>
                  ))}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <label
              className="uppercase block font-bold"
              htmlFor="valor_evaluacion"
            >
              Valor de la evaluación del instrumento:
            </label>
            {editing ? (
              <input
                type="text"
                name="valor_evaluacion"
                value={planeador.valor_evaluacion || ""}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ) : (
              <span className="block text-gray-600">
                {planeador.valor_evaluacion}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        {editing ? (
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
      </div>
    </>
  );
};

export default ModificarFilaPlaneador;
