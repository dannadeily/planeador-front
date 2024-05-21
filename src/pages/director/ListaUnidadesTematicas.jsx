import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPaste } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListaUnidadesTematicas = () => {
  const [unidad, setUnidad] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getUnidad = async () => {
      try {
        const response = await conexionAxios.get("unidad/");
        console.log(response.data);
        setUnidad(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUnidad();
  }, []);

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = unidad.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`unidad/delete/${id}`);
      // Actualizar la lista después de eliminar
      const updatedUnidad = unidad.filter(
        (doc) => doc.id !== id
      );
      setUnidad(updatedUnidad);
      setFilteredData(updatedUnidad);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="px-10 py-5">
        <div className="">
          <h1 className="text-2xl  border-b-4 border-blue-700 text-left font-bold">
            Unidades Tematicas
          </h1>
        </div>
      </div>
      <div className="lg:w-4/5 md:w-3/5 sm:w-2/3 mx-auto">
        <div>
          <Link to="crearunidadestematicas">
            <button className="border border-black rounded p-2 text-white bg-red-700 hover:bg-red-900 mx-2">
              Agregar Unidad Tematica
            </button>
          </Link>
          <Link to="crearsubtema">
            <button className="border border-black rounded p-2 text-white bg-red-700 hover:bg-red-900">
              Agregar Subtema
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
                        Codigo de la materia
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nombre de la materia
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nombre de la unidad
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subtema
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
                    {filteredData.map(
                      (unidadItem) => (
                        console.log(unidadItem.Materia),
                        (
                          <tr key={unidadItem.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unidadItem.Materia.codigo}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unidadItem.Materia.nombre}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unidadItem.nombre}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unidadItem.descripcion}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`listasubtema/${unidadItem.id}`}
                              >
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                <FaPaste />
                                </button>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`modificarunidadestematicas/${unidadItem.id}`}
                              >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                  <FaEdit />
                                </button>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(unidadItem.id)}>
                                  <MdDeleteForever />
                                </button>
                              
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-5">
                <Link
                    to="/director"
                    className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
                >
                    Volver
                </Link>
            </div>
      </div>
    </div>
  );
};

export default ListaUnidadesTematicas;
