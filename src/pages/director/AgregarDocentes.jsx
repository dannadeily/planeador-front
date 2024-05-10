import React from "react";

const AgregarDocentes = ({ onChange }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <p className="text-center">
          Si desea registrar varios docentes, por favor subir excel aquí
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
          className="hidden"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AgregarDocentes;
