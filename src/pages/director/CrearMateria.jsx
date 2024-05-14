import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import CrearMaterias from "./CrearMaterias";

const CrearMateria = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [creditos, setCreditos] = useState(true);
  const [semestre, setSemestre] = useState("");
  const [competencias, setCompetencias] = useState([]);
  const [competencia_id, setCompetencia_id] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("competencia/");
        setCompetencias(response.data);
        setCompetencia_id(response.data[0].id);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (competencia_id) => {
    setCompetencia_id(competencia_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      codigo.trim() === "" ||
      tipo.trim() === "" ||
      semestre.trim() === "" ||
      isNaN(Number(competencia_id))
    ) {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }
    let tipoMateria = false;
    if (tipo === "1") {
      tipoMateria = true;
    }
    try {
      const res = await conexionAxios.post("materia/create", {
        codigo,
        nombre,
        tipo: tipoMateria,
        creditos,
        semestre,
        competencia_id: Number(competencia_id),
      });

      console.log(res);

      if (res.status === 200) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        // Reiniciar los valores de los campos
        setCodigo("");
        setNombre("");
        setTipo("");
        setCreditos("");
        setSemestre("");
      }
    } catch (error) {
      // Manejar el error de la solicitud
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
            {/* Primera columna */}
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

            {/* Segunda columna */}
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
                  name="estado"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value === "true" ? 1 : 0)}
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                >
                  <option value={true}>Obligatoria</option>
                  <option value={false}>Electiva</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Primera columna */}
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

            {/* Segunda columna */}
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
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleChange(e.target.value)}
                value={competencia_id}
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
