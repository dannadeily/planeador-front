import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlertaError from "../../components/AlertaError";
import AlertaExitoso from "../../components/AlertaExitoso";
import conexionAxios from "../../axios/Axios";
import AgregarDocentes from "./AgregarDocentes";

const AgregarDocente = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailInstitucional, setEmailInstitucional] = useState("");
  const [tipoVinculacion, setTipoVinculacion] = useState("");
  const [departamento,setDepartamento] = useState("")
  const [celular,setCelular] =useState("")
  const [code, setCode] = useState("");
  const [alertaError, setAlertaError] = useState({ error: false, message: "" });
  const [alertaExitoso, setAlertaExitoso] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      emailInstitucional.trim() === "" ||
      tipoVinculacion.trim() === ""
    ) {
      setAlertaError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }

    // Verificar que la contraseña tenga al menos 8 caracteres
    else if (password.length < 8) {
      setAlertaError({
        error: true,
        message: "La contraseña debe tener al menos 8 caracteres",
      });
      setTimeout(() => setAlertaError({ error: false, message: "" }), 7000); // limpiar la alerta después de 5 segundos
    }

    try {
      const res = await conexionAxios.post("/user/registerTeacher", {
        name,
        email,
        emailInstitucional,
        tipoVinculacion,
        code,
      });

      if (res.status === 201) {
        setAlertaExitoso({ error: true, message: res.data.message });
        setTimeout(
          () => setAlertaExitoso({ error: false, message: "" }),
          10000
        );
        // Reiniciar los valores de los campos
        setCode("");
        setName("");

        setEmail("");
      }
    } catch (error) {
      // Manejar el error de la solicitud
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertaError({ error: true, message: error.response.data.message });
      }
      setTimeout(() => setAlertaError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <div>
      <div className=" px-10 py-5 ">
        
      </div>
      <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20  bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900 dark:text-red-600 ">
            Registrar Docente
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
              placeholder="nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="email"
              name="email"
              type="email"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="email"
              name="email"
              type="email"
            >
              Email Institucional
            </label>

            <input
              id="emailInstitucional"
              type="email"
              placeholder="email Institucional"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={emailInstitucional}
              onChange={(e) => setEmailInstitucional(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="tipoVinculacion"
              name="tipoVinculacion"
              type="text"
            >
              Tipo Vinculacion
            </label>

            <input
              id="tipoVinculacion"
              type="text"
              placeholder="tipo Vinculacion"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={tipoVinculacion}
              onChange={(e) => setTipoVinculacion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="departamento"
              name="departamento"
              type="text"
            >
              Departamento
            </label>

            <input
              id="departamento"
              type="text"
              placeholder="Departamento"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </div>
          <div className="flex">
            {/* Primera columna */}
            <div className="w-1/2">
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="celular"
                  name="celular"
                  type="text"
                >
                  Celular
                </label>

                <input
                  id="celular"
                  type="number"
                  placeholder="Celular"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </div>
            </div>

            {/* Segunda columna */}
            <div className="w-1/2">
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="codigo"
                  name="codigo"
                  type="text"
                >
                  Codigo
                </label>

                <input
                  id="codigo"
                  type="number"
                  placeholder="codigo"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="registrar"
            className="bg-red-500 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
        <div className="border-t border-gray-600 p-2">
          <AgregarDocentes />
        </div>
      </div>
    </div>
  );
};

export default AgregarDocente;
