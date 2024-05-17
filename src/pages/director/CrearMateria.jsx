import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import CrearMaterias from "./CrearMaterias";

const CrearMateria = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState(true); // Modificado para almacenar como booleano
  const [creditos, setCreditos] = useState("");
  const [semestre, setSemestre] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const [competencia_id, setCompetencia_Id] = useState([]);
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    const getCompetencias = async () => {
      try {
        const response = await conexionAxios.get("competencia/");
        setCompetencias(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCompetencias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipo") {
      const tipoValue = value === "1" ? true : false;
      setTipo(tipoValue);
    } else if (name === "competencia_id") {
      const values = Array.from(e.target.selectedOptions, (option) =>
        parseInt(option.value)
      );
      setCompetencia_Id(values);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tipoMateria = tipo; // Ahora tipo es un booleano directamente

    try {
      const res = await conexionAxios.post("materia/create", {
        codigo,
        nombre,
        tipo: tipoMateria,
        creditos,
        semestre,
        competencias: competencia_id.map(Number),
      });

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(() => setAlertaExitoso({ error: false, message: "" }), 10000);
        setCodigo("");
        setNombre("");
        setCreditos("");
        setSemestre("");
        setCompetencia_Id([]);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertaError({ error: true, message: error.response.data.error });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <div>
      <div className=" px-10 py-5 "></div>
      <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20  bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900 dark:text-red-600 ">
            Crear Materia
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
              placeholder="nombre de la materia"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 uppercase"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex">
            <div className="w-1/2">
              <div className="my-5  mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="codigo"
                  name="codigo"
                  type="text"
                >
                  Código
                </label>

                <input
                  id="codigo"
                  type="number"
                  placeholder="Código"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="my-5 mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="tipo"
                  name="tipo"
                  type="text"
                >
                  Tipo
                </label>

                <select
                  name="tipo"
                  value={tipo ? "1" : "0"}
                  onChange={handleChange}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                >
                  <option value="1">Obligatoria</option>
                  <option value="0">Electiva</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 ">
              <div className="my-5  mx-2 ">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="creditos"
                  name="creditos"
                  type="text"
                >
                  Créditos
                </label>

                <input
                  id="creditos"
                  type="number"
                  placeholder="Créditos"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={creditos}
                  onChange={(e) => setCreditos(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="my-5  mx-2">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="semestre"
                  name="semestre"
                  type="text"
                >
                  Semestre
                </label>

                <input
                  id="semestre"
                  type="number"
                  placeholder="Semestre"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="categoriaId"
            >
              Competencia
            </label>

            <div className="relative">
              <select
                multiple
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleChange(e)}
                value={competencia_id}
                name="competencia_id"
              >
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>
                    {competencia.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="registrar"
            className="bg-blue-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
        <div className="border-t border-gray-600 p-2">
          <CrearMaterias />
        </div>
      </div>
    </div>
  );
};

export default CrearMateria;
