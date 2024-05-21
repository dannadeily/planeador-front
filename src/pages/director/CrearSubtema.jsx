import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";

const CrearSubtema = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [unidad_tematica, setUnidad_tematica ]= useState([]);
    const [unidad_tematica_id, setUnidad_tematica_id] = useState("");
    const [alertaError, setAlertaError] = useState({
        error: false,
        message: "",
    });
    const [alertaExitoso, setAlertaExitoso] = useState({
        error: false,
        message: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await conexionAxios.get("unidad/");
                setUnidad_tematica(response.data);
                setUnidad_tematica_id(response.data[0].id);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (unidad_tematica_id) => {
        setUnidad_tematica_id(unidad_tematica_id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (descripcion.trim() === "") {
            setAlertaError({
                error: true,
                message: "Todos los campos son obligatorios",
            });
            setTimeout(
                () => setAlertaError({ error: false, message: "" }),
                5000
            );
            return;
        }

        try {
            const res = await conexionAxios.post("subtema/create", {
                nombre,
                descripcion,
                unidad_tematica_id:parseInt(unidad_tematica_id),
            });
            console.log(res);

            if (res.status === 200) {
                setAlertaExitoso({
                    error: true,
                    message: res.data.message,
                });
                setTimeout(
                    () => setAlertaExitoso({ error: false, message: "" }),
                    5000
                );
                setNombre("");
                setDescripcion("");
                setUnidad_tematica_id("");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setAlertaError({
                    error: true,
                    message: error.response.data.error,
                });
            }
            setTimeout(
                () => setAlertaError({ error: false, message: "" }),
                5000
            );
        }
    };

    return (
        <div>
            <div className="px-10 py-5"></div>
            <div className="xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20 bg-white shadow rounded-lg p-10">
                <form onSubmit={handleSubmit}>
                    <h1 className="font-bold text-2xl text-center text-gray-900 dark:text-red-600">
                        Crear Subtema
                    </h1>

                    {alertaError.error && !alertaExitoso.error && (
                        <AlertaError message={alertaError.message} />
                    )}
                    {alertaExitoso.error && (
                        <AlertaExitoso message={alertaExitoso.message} />
                    )}

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block font-bold"
                            htmlFor="nombre"
                            name="nombre"
                            type="text"
                        >
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            placeholder="Nombre"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block font-bold"
                            htmlFor="descripcion"
                        >
                            Descripcion
                        </label>

                        <textarea
                            id="descripcion"
                            placeholder="Descripcion de la categoria"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block font-bold"
                            htmlFor="categoriaId"
                        >
                            Unidad Tematica
                        </label>

                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                onChange={(e) => handleChange(e.target.value)}
                                value={unidad_tematica_id}
                            >
                                {unidad_tematica.map((unidad) => (
                                    <option key={unidad.id} value={unidad.id}>
                                        {unidad.nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 8l4 4 4-4H6z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Crear"
                        className="bg-blue-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                </form>
            </div>
            <div className="flex justify-center mb-5">
                <Link
                    to="/director/listaunidadestematicas/:id"
                    className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
                >
                    Volver
                </Link>
            </div>
        </div>
    );
};

export default CrearSubtema;
