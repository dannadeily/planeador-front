import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, } from "react-icons/fa";

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
      <div className="lg:w-3/5 md:h-screen mx-auto">
        <div>
          <Link to="agregardocente">
            <button className="border border-black rounded p-2 text-white bg-blue-700">
              Agregar Docente
            </button>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="py-2 mt-5 align-middle inline-block min-w-full">
            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg" style={{ maxHeight: "70vh" }}>
              <table className="min-w-full divide-y divide-gray-400">
                <thead className="text-xs uppercase bg-blue-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Codigo
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-400">
                  {docente.map((docenteItem) => (
                    <tr key={docenteItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{docenteItem.codigo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{docenteItem.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{docenteItem.correo_institucional}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{docenteItem.departamento}</div>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaDocente;
