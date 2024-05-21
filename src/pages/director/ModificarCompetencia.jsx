import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";

const ModificarCompetencia = () => {
  const [competencia, setCompetencia] = useState({
    nombre: "",
    descripcion: "",
    estado: true,
    categoria_id: "",
  });
  const [editing, setEditing] = useState(true); // Establecer como true para que se cargue en modo de edición
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
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [categoria_id, setCategoria_id] = useState("");

  useEffect(() => {
    const getCompetencia = async () => {
      try {
        const response = await conexionAxios.get(`competencia/${id}`);
        setCompetencia(response.data);
      } catch (error) {
        console.error(error);
        setAlertaError({
          error: true,
          message: "Error al cargar la competencia",
        });
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await conexionAxios.get("categoria/");
        setCategorias(response.data);
        if (response.data.length > 0) {
          setCompetencia((prev) => ({
            ...prev,
            categoria_id: response.data[0].id,
          }));
        }
      } catch (error) {
        console.error(error);
        setAlertaError({
          error: true,
          message: "Error al cargar las categorías",
        });
      }
    };

    getCompetencia();
    fetchCategorias();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetencia((prev) => ({ ...prev, [name]: value }));
    setEditing(true);
  };

  const handleChangeCategoria = (e) => {
    setCompetencia((prev) => ({
      ...prev,
      categoria_id: parseInt(e.target.value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await conexionAxios.put(
        `competencia/update/${id}`,
        competencia
      );
      if (res.status === 200) {
        navigate("/director/listacompetencia");
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        setEditing(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({
          error: true,
          message: error.response.data.error,
        });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 5000);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
          <h1 className="text-2xl border-b-4 border-blue-700 text-left font-bold">
            Datos Competencia
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
            <textarea
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
          <label className="uppercase block font-bold" htmlFor="categoria_id">
            Categoría:
          </label>
          {editing ? (
            <select
              name="categoria_id"
              value={competencia.categoria_id}
              onChange={handleChangeCategoria}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          ) : (
            <span className="block text-gray-600">
              {
                categorias.find((cat) => cat.id === competencia.categoria_id)
                  ?.nombre
              }
            </span>
          )}
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
          to="/director/listacompetencia"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block"
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default ModificarCompetencia;
