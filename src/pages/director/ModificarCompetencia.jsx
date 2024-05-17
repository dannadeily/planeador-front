import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarCompetencia = () => {
  const [competencia, setCompetencia] = useState({});
  const [editing, setEditing] = useState(false); // Establecer como true para que se cargue en modo de edición
  const [alertaError, setAlertaError] = useState({
    error: false,
    message: "",
  });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getCompetencia = async () => {
      try {
        const response = await conexionAxios.get("competencia/" + id);
        setCompetencia(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCompetencia();
  }, [id]);

  // Función para manejar el cambio en los datos del docente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetencia({ ...competencia, [name]: value });
    setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
  };

  // Función para enviar los datos actualizados del docente
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put(
        "competencia/update/" + id,
        competencia
      );
      console.log("actualizar" + res);

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false); // Establecer editing como false después de guardar los cambios
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
        <h1 className="text-2xl  border-b-4 border-blue-700 text-left font-bold">Datos Competencia</h1>
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
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          {editing ? (
            <input
              type="text"
              name="nombre"
              value={competencia.nombre}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">{competencia.nombre}</span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="descripcion">
            Descripción:
          </label>
          {editing ? (
            <input
              type="text"
              name="descripcion"
              value={competencia.descripcion}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          ) : (
            <span className="block text-gray-600">
              {competencia.descripcion}
            </span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="descripcion">
            Resultados de Aprendizaje:
          </label>
          {editing ? (
            <select
              name="resultado_aprendizaje"
              value={competencia.resultado_aprendizaje || ""}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Seleccionar Resultado de Aprendizaje</option>
              {resultadoAprendizaje.map((resultado) => (
                <option key={resultado.id} value={resultado.id}>
                  {resultado.codigo}
                </option>
              ))}
            </select>
          ) : (
            <div>
              {resultadoAprendizaje.map((resultado) => (
                <span key={resultado.id} className="block text-gray-600">
                  {resultado.codigo}
                </span>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Estado:
          </label>
          {editing ? (
            <select
              name="estado"
              value={competencia.estado}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          ) : (
            <span className="block text-gray-600">
              {competencia.estado ? "Activo" : "Inactivo"}
            </span>
          )}
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Categoria:
          </label>
          {editing ? (
            <select
              name="estado"
              value={competencia.categoria_id}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={1}>{competencia.categoria_id}</option>
              <option value={2}>{competencia.categoria_id}</option>
            </select>
          ) : (
            <span className="block text-gray-600">
              {competencia.categoria_id ? 1 : 2}
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
          to="/director/listacompetencia"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarCompetencia;
