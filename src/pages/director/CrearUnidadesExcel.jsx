import React from "react";
import conexionAxios from "../../axios/Axios";
const CrearUnidadesExcel = ({ onChange }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validFileTypes.includes(file.type)) {
      alert("Por favor, sube un archivo Excel válido.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", file);

    try {
      const response = await conexionAxios.post(
        "unidad/createUnidades",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Archivo subido exitosamente.");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al subir el archivo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <p className="text-center">
          Si desea registrar varias unidades tematicas, por favor subir excel
          aquí
        </p>
      </div>
      <div>
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-green-800 text-white rounded-md cursor-pointer hover:bg-green-500"
        >
          Subir Excel
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default CrearUnidadesExcel;