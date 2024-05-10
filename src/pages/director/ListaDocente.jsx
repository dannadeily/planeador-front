import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";

const ListaDocente = () => {
  const [docente, setDocente] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);

  const handleToggleEstado = async (docenteId, status) => {
    try {
      const res = await conexionAxios.put(`/user/enable/${docenteId}`, {
        status: !status,
      });

      if (res.status === 200) {
        setDocente((prevState) =>
          prevState.map((docenteItem) =>
            docenteItem.id === docenteId
              ? { ...docenteItem, isEnabled: !status }
              : docenteItem
          )
        );

        setFilteredData((prevState) =>
          prevState.map((docenteItem) =>
            docenteItem.id === docenteId
              ? { ...docenteItem, isEnabled: !status }
              : docenteItem
          )
        );
      }
    } catch (error) {
      // Manejar el error de la solicitud
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/user/teachers/status");
        setDocente(
          response.data.map((docenteItem) => ({
            ...docenteItem,
            isEnabled: docenteItem.status,
          }))
        );
        setDataTotal(response.data); // Set the total data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
      <div className=" lg:w-3/5 md:h-screen mx-auto ">
        <div>
          <Link to="agregardocente">
            <button className="border border-black rounded p-2 text-white bg-blue-700">
              Agregar Docente
            </button>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="py-2 mt-5 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-400">
                <thead className="text-xs uppercase bg-blue-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Docente
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Correo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-400">
                  {(searchTerm !== "" ? filteredData : docente).map(
                    (docenteItem) => (
                      <tr key={docenteItem.id}>
                        <td className="px-6 py-3">
                          {docenteItem.name} {docenteItem.lastname}
                        </td>
                        <td className="px-6 py-3">{docenteItem.email}</td>
                        <td className="px-6 py-3">
                          <button
                            className={`ml-2 text-white rounded-lg px-3 py-1 text-sm ${
                              docenteItem.isEnabled
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            onClick={() =>
                              handleToggleEstado(
                                docenteItem.id,
                                docenteItem.isEnabled
                              )
                            }
                          >
                            {docenteItem.isEnabled
                              ? "Habilitado"
                              : "Deshabilitado"}
                          </button>
                        </td>
                        <td className="px-6 py-3">
                          <Link
                            to={`/administrador/listadocentes/editarhorarioasesoria/${docenteItem.id}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-blue-600"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
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
