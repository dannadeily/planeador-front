import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListaSubtema = () => {
  const [subtema, setSubtema] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { id, unidadId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set items per page

  useEffect(() => {
    const getSubtema = async () => {
      try {
        const response = await conexionAxios.get(`subtema/unidad/${id}`);
        console.log(response.data);
        setSubtema(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSubtema();
    const getUnidad = async () => {
      try {
        const response = await conexionAxios.get(`unidad/materia/${unidadId}`);
        console.log(response.data);
        setUnidad(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUnidad();
  }, [id, unidadId]);

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = subtema.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`subtema/delete/${id}`);
      // Actualizar la lista después de eliminar
      const updatedSubtema = subtema.filter((doc) => doc.id !== id);
      setSubtema(updatedSubtema);
      setFilteredData(updatedSubtema);
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="py-5">
        <div className="">
          <h1 className="text-2xl border-b-4 border-blue-700 text-left font-bold">
            Subtemas
          </h1>
        </div>
      </div>
      <div className="lg:w-auto md:w-3/5 sm:w-2/3 mx-auto">
        <div>
          <Link to="crearsubtema">
            <button className="border border-black rounded p-2 text-white bg-red-700 hover:bg-red-900">
              Agregar Subtema
            </button>
          </Link>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={search}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="py-2 mt-5 align-middle inline-block min-w-full">
            <div className="shadow overflow-x-auto sm:overflow-x-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-400">
                <thead className=" uppercase bg-red-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descripción
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
                    {currentItems.map((subtemaItem) => (
                      <tr key={subtemaItem.id}>
                        <td className="px-6 py-4 whitespace-normal">
                          <div className="text-sm text-gray-900">
                            {subtemaItem.nombre}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-normal">
                          <div className="text-sm text-gray-900">
                            {subtemaItem.descripcion}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`modificarsubtema/${subtemaItem.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              <FaEdit />
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(subtemaItem.id)}
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
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to={`/director`} // Utilizar el ID de la unidad en el enlace de "Volver"
          className="mb-5 py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block"
        >
          Volver
        </Link>
      </div>
    </div>
  );
};

export default ListaSubtema;
