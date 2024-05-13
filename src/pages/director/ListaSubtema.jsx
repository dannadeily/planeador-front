import React, { useState, useEffect } from "react";
import conexionAxios from "../../axios/Axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListaSubtema = () => {
    const [subtema, setSubtema] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const getSubtema = async () => {
            try {
                const response = await conexionAxios.get("subtema/");
                console.log(response.data);
                setSubtema(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getSubtema();
    }, []);

    const search = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = subtema.filter((item) =>
            Object.values(item).some(
                (value) =>
                    value && value.toString().toLowerCase().includes(term)
            )
        );

        setFilteredData(filtered);
    };

    return (
        <div>
            <div className="px-10 py-5">
                <div className="">
                    <h1 className="text-2xl ">Lista de Subtemas</h1>
                </div>
            </div>
            <div className="lg:w-4/5 md:w-3/5 sm:w-2/3 mx-auto">
                <div>
                    <Link to="crearsubtema">
                        <button className="border border-black rounded p-2 text-white bg-blue-700 hover:bg-blue-900">
                            Crear Subtema
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
                                           
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nombre
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Descripción
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Editar
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Eliminar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-400">
                                        {filteredData.map((subtemaItem) => (
                                            <tr key={subtemaItem.id}>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {subtemaItem.nombre}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {
                                                            subtemaItem.descripcion
                                                        }
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link
                                                        to={`modificarcategoria/${subtemaItem.codigo}`}
                                                    >
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                            <FaEdit />
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link
                                                        to={`modificarcategoria/${subtemaItem.codigo}`}
                                                    >
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                        <MdDeleteForever />
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
        </div>
    );
};

export default ListaSubtema;
