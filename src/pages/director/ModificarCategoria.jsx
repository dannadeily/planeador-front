import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import { TiDeleteOutline } from "react-icons/ti";
const ModificarCategoria = () => {
    const [categoria, setCategoria] = useState({});
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
        const getCategoria = async () => {
            try {
                const response = await conexionAxios.get("categoria/" + id);
                setCategoria(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getCategoria();
    }, [id]);

    // Función para manejar el cambio en los datos del docente
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value });
        setEditing(true); // Establecer editing como true al cambiar cualquier campo del formulario
    };

    // Función para enviar los datos actualizados del docente
    const handleSubmit = async () => {
        try {
            const res = await conexionAxios.put(
                "categoria/update/" + id,
                categoria
            );
            console.log(res);

            if (res.status === 200) {
                navigate("/director/listacategoria");
                setAlertaExitoso({ error: true, message: res.data.message });
                setTimeout(
                    () => setAlertaExitoso({ error: false, message: "" }),
                    10000
                );
                setEditing(false); // Establecer editing como false después de guardar los cambios
            }
        } catch (error) {
            console.error(error);
            setAlertaError({ error: true, message: error.response.data.error });
            setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
        }
    };

    const unlinkResultadoCompetencia = async (id) => {
        try {
          const res = await conexionAxios.put(`categoria/unlinkCompetencia/${id}`, {
            competencia_id: id,
          });
          if (res.status === 200) {
            setCompetencia((prev) => ({
              ...prev,
              Competencias: prev.Competencias.filter(
                (resultado) => resultado.id !== id
              ),
            }));
            setAlertaExitoso({ error: true, message: res.data.message });
            setTimeout(
              () => setAlertaExitoso({ error: false, message: "" }),
              10000
            );
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
                <h1 className="text-2xl  border-b-4 border-blue-700 text-left font-bold">Datos Categoría</h1>
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
                    <label
                        className="uppercase block font-bold"
                        htmlFor="nombre"
                    >
                        Nombre:
                    </label>
                    {editing ? (
                        <input
                            type="text"
                            name="nombre"
                            value={categoria.nombre}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <span className="block text-gray-600">
                            {categoria.nombre}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        className="uppercase block font-bold"
                        htmlFor="tipo_vinculacion"
                    >
                        Descripción:
                    </label>
                    {editing ? (
                        <textarea
                            type="text"
                            name="descripcion"
                            value={categoria.descripcion}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        <span className="block text-gray-600">
                            {categoria.descripcion}
                        </span>
                    )}
                </div>
                <div>
          <label
            className="uppercase block font-bold"
            htmlFor="resultadoAprendizaje"
          >
            Competencia:
          </label>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Código</th>
                  <th className="px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoria.Competencias &&
                categoria.Competencias.length > 0 ? (
                    categoria.Competencias.map(
                    (resultado, index) => (
                      <tr key={index} className="text-sm text-gray-900">
                        <td className="px-4 py-2 border-b">
                          {resultado.codigo}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {resultado.nombre}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {editing ? (
                            <>
                              <button
                                onClick={() => {
                                    unlinkResultadoCompetencia(resultado.id);
                                  {
                                    console.log(resultado);
                                  }
                                }}
                                className="text-red-600 hover:cursor-pointer hover:text-red-900 transition-colors"
                              >
                                <TiDeleteOutline />
                              </button>
                            </>
                          ) : (
                            <Link
                              to={`/director/competencia/${id}/resultados`}
                              className="text-blue-600 hover:cursor-pointer hover:text-blue-900 transition-colors"
                            >
                              Agregar
                            </Link>
                          )}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      className="px-4 py-2 border-b text-gray-600"
                      colSpan="2"
                    >
                      Sin resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
                    to="/director/listacategoria"
                    className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
                >
                    Volver
                </Link>
            </div>
        </>
    );
};


export default ModificarCategoria;
