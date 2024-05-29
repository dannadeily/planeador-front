import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaUnlink } from "react-icons/fa";

const ListaDocente = () => {
  const [docente, setDocente] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set items per page

  useEffect(() => {
    const getDocente = async () => {
      try {
        const response = await conexionAxios.get("user/teachers");
        setDocente(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDocente();
  }, []);

  // Desvincular docente
  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`user/deleteTeacher/${id}`);
      const updatedDocentes = docente.filter((doc) => doc.id !== id);
      setDocente(updatedDocentes);
      setFilteredData(updatedDocentes);
    } catch (error) {
      console.error(error);
    }
  };

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = docente.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after search
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
      <div className="px-10 py-5">
        <div className="">
          <h1 className="text-2xl border-b-4 border-blue-700 text-left font-bold">Docentes</h1>
        </div>
      </div>
      <div className="lg:w-4/5 md:w-3/5 sm:w-2/3 mx-auto">
        <div>
          <Link to="agregardocente">
            <button className="border border-black rounded p-2 text-white bg-red-700 hover:bg-red-900">
              Agregar Docente
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
                      <th scope="col" className="px-6 py-3">Código</th>
                      <th scope="col" className="px-6 py-3">Docente</th>
                      <th scope="col" className="px-6 py-3">Correo Institucional</th>
                      <th scope="col" className="px-6 py-3">Departamento</th>
                      <th scope="col" className="px-6 py-3">Visualizar</th>
                      <th scope="col" className="px-6 py-3">Editar</th>
                      <th scope="col" className="px-6 py-3">Desvincular Docente</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-400">
                    {currentItems.map((docenteItem) => (
                      <tr key={docenteItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {docenteItem.codigo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {docenteItem.nombre}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {docenteItem.correo_institucional}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {docenteItem.departamento}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`visualizardocente/${docenteItem.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              <FaEye />
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`modificardocente/${docenteItem.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              <FaEdit />
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(docenteItem.id)}
                          >
                            <FaUnlink />
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
    </div>
  );
};

export default ListaDocente;
