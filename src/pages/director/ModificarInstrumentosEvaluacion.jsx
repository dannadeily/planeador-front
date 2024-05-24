import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarInstrumentosEvaluacion = () => {
  const [raCurso, setRaCurso] = useState({});
  const [tipos, setTipos] = useState([]); // Lista de materias para el selector
  const [editing, setEditing] = useState(true); // Establecer como true para que se cargue en modo de edición
  const [alertaError, setAlertaError] = useState({
    error: false,
    message: "",
  });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getRaCurso = async () => {
      try {
        const response = await conexionAxios.get("instrumento/" + id);
        setRaCurso(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getTipos = async () => {
      try {
        const response = await conexionAxios.get("tipoEvidencia/"); // Ruta para obtener las materias
        setTipos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRaCurso();
    getTipos();
  }, [id]);

  // Función para manejar el cambio en los datos del formulario
  // Función para manejar el cambio en los datos del formulario
  const handleTiposChange = (e) => {
    const selectedType = parseInt(e.target.value);
    console.log(tipos); // Verifica el tipo de tipos
    const tiposArray = Array.isArray(tipos) ? tipos : [];
    if (tiposArray.includes(selectedType)) {
      // Si el tipo ya está seleccionado, lo eliminamos
      setTipos(tiposArray.filter((typeId) => typeId !== selectedType));
    } else {
      // Si el tipo no está seleccionado, lo agregamos
      setTipos([...tiposArray, selectedType]);
    }
  };

  const handleChange = (e) => {
    setRaCurso({
      ...raCurso,
      [e.target.name]: e.target.value,
    });
  };


  // Función para enviar los datos actualizados
  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put("/instrumento/update/" + id, raCurso);
      console.log(res);

      if (res.status === 200) {
        navigate("/director/listainstrumentoevaluacion");
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(() => {
          setAlertaExitoso({ error: false, message: "" });
        }, 10000);
        setEditing(false); // Establecer editing como false después de guardar los cambios
      }
    } catch (error) {
      console.error(error);
      setAlertaError({ error: true, message: error.response.data.error });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
          <h1 className="text-2xl border-b-4 border-blue-700 text-left font-bold">
            Datos Intrumentos de Evaluación
          </h1>
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
          <input
            type="text"
            name="nombre"
            value={raCurso.nombre || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Descripción:
          </label>
          <input
            type="text"
            name="descripcion"
            value={raCurso.descripcion || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="uppercase block font-bold" htmlFor="materia_id">
            Tipos de evidencia:
          </label>
          <div className="relative">
              <select
                multiple
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={handleTiposChange}
                value={tipos}
              >
                {tipos.map((t,index) => (
                  <option key={index} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </div>
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
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listaracurso"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarInstrumentosEvaluacion;
