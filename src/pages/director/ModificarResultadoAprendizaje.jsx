import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarResultadoAprendizaje = () => {
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState({});
  const [editing, setEditing] = useState(false);
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const [competencias, setCompetencias] = useState([]); // Lista de competencias disponibles
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultadoResp, competenciasResp] = await Promise.all([
          conexionAxios.get(`ra/${id}`),
          conexionAxios.get("competencia/"), // Endpoint para obtener la lista de competencias disponibles
        ]);
        setResultadoAprendizaje(resultadoResp.data);
        setCompetencias(competenciasResp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  // Convertir el valor de competencia_id a entero
  const newValue = name === "competencia_id" ? parseInt(value) : value;
  setResultadoAprendizaje({ ...resultadoAprendizaje, [name]: newValue });
  setEditing(true);
  };

  const handleSubmit = async () => {
    try {
      // Enviar los datos actualizados al servidor
      const res = await conexionAxios.put(
        `ra/update/${id}`,
        resultadoAprendizaje
      );

      // Verificar si la solicitud fue exitosa
      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error si ocurre un error en la solicitud
      setAlertaError({
        error: true,
        message: "Hubo un error al actualizar el resultado de aprendizaje.",
      });
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
        <h1 className="text-2xl  border-b-4 border-blue-700 text-left font-bold">Datos Resultado Aprendizaje</h1>
        </div>
        {alertaError.error && !alertaExitoso.error && (
          <AlertaError message={alertaError.message} />
        )}
        {alertaExitoso.error && (
          <AlertaExitoso message={alertaExitoso.message} />
        )}
      </div>
      <div className="lg:mx- md:mx-40 sm:mx-20 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div>
          <label className="uppercase block font-bold" htmlFor="descripcion">
            Descripción:
          </label>
          {editing ? (
            <input
              type="text"
              name="descripcion"
              value={resultadoAprendizaje.descripcion}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {resultadoAprendizaje.descripcion}
            </span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Estado:
          </label>
          {editing ? (
            <select
              name="estado"
              value={resultadoAprendizaje.estado}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          ) : (
            <span className="block text-gray-600">
              {resultadoAprendizaje.estado ? "Activo" : "Inactivo"}
            </span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="competencia">
            Competencia:
          </label>
          {editing ? (
            <select
              name="competencia_id"
              value={resultadoAprendizaje.competencia_id || ""}
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
            <span className="block text-gray-600">
              {resultadoAprendizaje.Competencia
                ? resultadoAprendizaje.Competencia.nombre
                : ""}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center mb-5">
        {" "}
        {/* Contenedor para centrar el botón de editar */}
        {editing ? (
          <button
            onClick={handleSubmit}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-white font-bold  border border-black rounded-md hover:cursor-pointer transition-colors"
          >
            Editar
          </button>
        )}
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listaresultadoaprendizaje"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarResultadoAprendizaje;
