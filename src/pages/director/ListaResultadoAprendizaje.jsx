import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link ,useParams} from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListaResultadoAprendizaje = () => {
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const getResultadoAprendizaje = async () => {
      try {
        const response = await conexionAxios.get("ra/");
        console.log(response.data);
        setResultadoAprendizaje(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getResultadoAprendizaje();
  }, []);

  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`ra/deleteRa/${id}`);
      // Actualizar la lista después de eliminar
      const updatedResultadoAprendizaje = resultadoAprendizaje.filter(
        (doc) => doc.id !== id
      );
      setResultadoAprendizaje(updatedResultadoAprendizaje);
      setFilteredData(updatedResultadoAprendizaje);
    } catch (error) {
      console.error(error);
    }
  };

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = resultadoAprendizaje.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="px-10 py-5">
        <div className="">
          <h1 className="text-2xl ">Lista de Resultados de Aprendizaje</h1>
        </div>
      </div>
      <div className="lg:w-4/5 md:w-3/5 sm:w-2/3 mx-auto">
        <div>
          <Link to="crearresultadoaprendizaje">
            <button className="border border-black rounded p-2 text-white bg-blue-700 hover:bg-blue-900">
              Crear Resultado de Aprendizaje
            </button>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="py-2 mt-5 align-middle inline-block min-w-full">
            <div className="shadow overflow-x-auto sm:overflow-x-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-400">
                  <thead className="text-xs uppercase bg-blue-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Codigo
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Competencia
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Editar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-400">
                    {filteredData.map((resultadoAprendizajeItem) => (
                      <tr key={resultadoAprendizajeItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resultadoAprendizajeItem.codigo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resultadoAprendizajeItem.descripcion}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resultadoAprendizajeItem.Competencia.nombre}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resultadoAprendizajeItem.estado
                              ? "Activo"
                              : "Inactivo"}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`modificarresultadoaprendizaje/${resultadoAprendizajeItem.id}`}
                          >
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              <FaEdit />
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(resultadoAprendizajeItem.id)}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaResultadoAprendizaje;
