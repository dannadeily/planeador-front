import React, { useState, useEffect } from "react";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";

const CrearCompetencia = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoria_id, setCategoria_id] = useState("");
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
                const response = await conexionAxios.get("categoria/");
                setCategorias(response.data);
                setCategoria_id(response.data[0].id);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (categoria_id) => {
        setCategoria_id(categoria_id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || descripcion.trim() === ""
      ) {
            setAlertaError({
                error: true,
                message: "Todos los campos son obligatorios",
            });
            setTimeout(
                () => setAlertaError({ error: false, message: "" }),
                7000
            ); // limpiar la alerta después de 5 segundos
        }
        const categoriaIdNumero = parseInt(categoria_id, 10);

        try {
            const res = await conexionAxios.post("competencia/create", {
                nombre,
                descripcion,
                categoria_id: categoriaIdNumero,
            });

            console.log(res);
            console.log(res.data);
            console.log(res.status);

            if (res.status === 200) {
                setAlertaExitoso({ error: true, message: res.data.message });
                setTimeout(
                    () => setAlertaExitoso({ error: false, message: "" }),
                    10000
                );
                // Reiniciar los valores de los campos
                setNombre("");
                setDescripcion("");
                setCategoria_id("");
            }
        } catch (error) {
            // Manejar el error de la solicitud
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
                10000
            );
        }
    };

    return (
        <div>
            <div className=" px-10 py-5 "></div>
            <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20  bg-white shadow rounded-lg p-10">
                <form onSubmit={handleSubmit}>
                    <h1 className=" font-bold text-2xl text-center text-gray-900 dark:text-red-600 ">
                        Crear Competencia
                    </h1>

                    {alertaError.error && !alertaExitoso.error && (
                        <AlertaError message={alertaError.message} />
                    )}
                    {alertaExitoso.error && (
                        <AlertaExitoso message={alertaExitoso.message} />
                    )}

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block  font-bold"
                            htmlFor="nombre"
                            name="nombre"
                            type="text"
                        >
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="nombre de la categoria"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 uppercase"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block  font-bold"
                            htmlFor="descripcion"
                            name="descripcion"
                            type="text"
                        >
                            Descripcion
                        </label>

                        <textarea
                            id="descripcion"
                            type="textarea"
                            placeholder="descripcion de la categoria"
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
                            Categoria
                        </label>

                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                onChange={(e) => handleChange(e.target.value)}
                                value={categoria_id}
                            >
                                {categorias.map((categoria) => (
                                    <option
                                        key={categoria.id}
                                        value={categoria.id}
                                    >
                                        {categoria.nombre}
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
        </div>
    );
};

export default CrearCompetencia;
