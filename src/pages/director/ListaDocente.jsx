import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaUnlink } from "react-icons/fa";

const ListaDocente = () => {
  const [docente, setDocente] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  //desvincular docente

  const handleDelete = async (id) => {
    try {
      await conexionAxios.delete(`user/deleteTeacher/${id}`);
      // Actualizar la lista después de eliminar
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
  };

  return (
    <div>
      <div className="px-10 py-5">
        <div className="">
          <h1 className="text-2xl ">Lista de Docentes</h1>
        </div>
      </div>
      <div className="lg:w-4/5 md:w-3/5 sm:w-2/3 mx-auto">
        <div>
          <Link to="agregardocente">
            <button className="border border-black rounded p-2 text-white bg-blue-700 hover:bg-blue-900">
              Agregar Docente
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
                        Código
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Docente
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Correo Institucional
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Departamento
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Visualizar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Editar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Desvincular Docente
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-400">
                    {filteredData.map((docenteItem) => (
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaDocente;
