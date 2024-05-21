import React, { useState } from "react";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";

const CrearInstrumentosEvaluacion = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipos, setTipos] = useState([]); // Lista de tipos de instrumentos de evaluación
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || descripcion.trim() === "") {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }
    
    try {
      const res = await conexionAxios.post("instrumento/create", {
        nombre,
        descripcion,
        tipos,
      });

      console.log(res);
 
      
      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        // Reiniciar los valores de los campos
        setNombre("");
        setDescripcion("");
        setTipos([]);
      }
    } catch (error) {
      // Manejar el error de la solicitud
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <div>
      <div className=" px-10 py-5 "></div>
      <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20  bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900 dark:text-red-600 ">
            Crear Instrumentos de Evaluación
          </h1>

          {alertaError.error && !alertaExitoso.error && (
            <AlertaError message={alertaError.message} />
          )}
          {alertaExitoso.error && (
            <AlertaExitoso message={alertaExitoso.message} />
          )}

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="nombre"
              name="nombre"
              type="text"
            >
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 uppercase"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="descripcion"
              name="descripcion"
              type="text"
            >
              Descripcion
            </label>

            <textarea
              id="descripcion"
              type="textarea"
              placeholder="descripcion"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="tipos"
              name="tipos"
              type="text"
            >
              Tipos
            </label>

            <select
              id="tipos"
              type="text"
              placeholder="tipos"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={tipos}
              onChange={(e) => setTipos(e.target.value)}
            >
              <option value="1">Parcial</option>
              <option value="2">Final</option>
            </select>
          </div>

          <input
            type="submit"
            value="Crear"
            className="bg-blue-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
       
      </div>
    </div>
  );
}

export default CrearInstrumentosEvaluacion