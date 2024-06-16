import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const VisualizarPlaneador = () => {
  const [planeador, setPlaneador] = useState(null); // Inicializar como null
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set items per page

  useEffect(() => {
    const getUnidad = async () => {
      try {
        const response = await conexionAxios.get(
          `planeador/filasPlaneador/${id}`
        );
        console.log("planeador",response.data);
        setPlaneador(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUnidad();
  }, [id]);

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = planeador.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`planeador/fila/delete/${id}`);
      // Actualizar la lista después de eliminar
      const updatedPlaneador = planeador.filter((doc) => doc.id !== id);
      setPlaneador(updatedPlaneador);
      setFilteredData(updatedPlaneador);
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
    <>
      {planeador && ( // Mostrar solo cuando planeador tiene datos
        <div>
          <div className="lg:w-auto md:w-3/5 sm:w-2/3 mx-auto">
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
                      <thead className="uppercase bg-red-700">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Valor de evaluación
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Estrategia de Retroalimentación
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Semana de Retroalimentación
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Corte del Periodo
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Semana Actividad desarrollada
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Racurso
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
                        {currentItems.map((planeadorItem) => (
                          <tr key={planeadorItem.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {planeadorItem.valor_evaluacion}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-normal">
                              <div className="text-sm text-gray-900">
                                {planeadorItem.estrategia_retroalimentacion}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-normal">
                              <div className="text-sm text-gray-900">
                                {planeadorItem.semana_retroalimentacion}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-normal">
                              <div className="text-sm text-gray-900">
                                {planeadorItem.corte_periodo}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-normal">
                              <div className="text-sm text-gray-900">
                                {planeadorItem.semana_actividad_desarrollada}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-normal">
                              <div className="text-sm text-gray-900">
                                {planeadorItem.RaCurso &&
                                  planeadorItem.RaCurso.map((raCurso) => (
                                    <div key={raCurso.id}>
                                      <div>
                                        {raCurso.id} - {raCurso.nombre}
                                      </div>
                                      {raCurso.TipoEvidencia &&
                                        raCurso.TipoEvidencia.map(
                                          (tipoEvidencia) => (
                                            <div key={tipoEvidencia.id}>
                                              <div>
                                                {tipoEvidencia.id} -{" "}
                                                {tipoEvidencia.nombre}
                                              </div>
                                              {tipoEvidencia.Instrumento &&
                                                tipoEvidencia.Instrumento.map(
                                                  (instrumento) => (
                                                    <div key={instrumento.id}>
                                                      <div>
                                                        {instrumento.id} -{" "}
                                                        {instrumento.codigo} -{" "}
                                                        {instrumento.nombre}
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          )
                                        )}
                                    </div>
                                  ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`modificarfilaplaneador/${planeadorItem.id}`}
                              >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                  <FaEdit />
                                </button>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDelete(planeadorItem.id)}
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
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
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
      )}
    </>
  );
};

export default VisualizarPlaneador;
