import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import conexionAxios from "../../axios/Axios";

const VisualizarDirector = () => {
  const [director, setDirector] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getDirector = async () => {
      try {
        const response = await conexionAxios.get("user/admin/" + id);
        setDirector(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDirector();
  }, [id]);

  return (
    <>
      <div className="px-4 md:px-10 py-5">
        <div className="mb-4">
          <h1 className="text-2xl">Datos del director</h1>
        </div>
      </div>
      <div className=" lg:mx- md:mx-40 sm:mx-20 my-2 bg-white shadow rounded-lg p-6 grid lg:grid-cols-2 gap-4">
        <div>
          <label className="uppercase block font-bold" htmlFor="nombre">
            Nombre:
          </label>
          <label className="block text-gray-600">{director.nombre}</label>
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="tipo_vinculacion"
          >
            Tipo Vinculacion:
          </label>
          <label className="block text-gray-600">
            {director.tipo_vinculacion}
          </label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="departamento">
            Departamento:
          </label>
          <label className="block text-gray-600">{director.departamento}</label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="area_formacion">
            Área de Formación:
          </label>
          <label className="block text-gray-600">
            {director.area_formacion}
          </label>
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="correo_personal"
          >
            Correo Personal:
          </label>
          <label className="block text-gray-600">
            {director.correo_personal}
          </label>
        </div>
        <div>
          <label
            className="uppercase block font-bold"
            htmlFor="correo_institucional"
          >
            Correo Institucional:
          </label>
          <label className="block text-gray-600">
            {director.correo_institucional}
          </label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="celular">
            Celular:
          </label>
          <label className="block text-gray-600">{director.celular}</label>
        </div>
        <div>
          <label className="uppercase block font-bold" htmlFor="estado">
            Estado:
          </label>
          <label className="block text-gray-600">
            {director.estado ? "Activo" : "Inactivo"}
          </label>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/director/listadirector"
          className="mb-5 w- py-2 text-blue-600 text-center hover:cursor-pointer hover:text-blue-900 transition-colors block "
        >
          Volver
        </Link>
      </div>
    </>
  );
}

export default VisualizarDirector