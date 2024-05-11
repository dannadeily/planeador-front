import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaUser,
  FaUserFriends,
  FaListAlt,
  FaFlag,
  FaSearch,
  FaListUl,
  FaFileAlt,
  FaBookmark,
  FaIdCardAlt,
  FaAlignJustify,
} from "react-icons/fa";
import { TbNumber123 } from "react-icons/tb";
import { BiCircleThreeQuarter } from "react-icons/bi";
import { IoStatsChartSharp } from "react-icons/io5";

function HeaderDirector() {
  const [openIcon, setOpenIcon] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu2, setOpenMenu2] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setOpenIcon(true); // Siempre que se abra/cierre la barra lateral, el icono estará visible
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside2 = useCallback(
    (event) => {
      if (!openMenu2) return;
      if (event.target.closest("#dropdownNavbar")) {
        setOpenMenu2(false);
      }
    },
    [openMenu2]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside2);
    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, [handleClickOutside2]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-red-500 p-5 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
        <div
          className={` cursor-pointer w-16 text-white  ${
            !sidebarOpen && "rotate-180"
          }`}
          onClick={toggleSidebar}
        >
          <div className="flex items-center">
            <FaAlignJustify />
          </div>
        </div>
        <h1 className="text-white font-bold">Director</h1>
        <div className="flex items-center">
          {menuOpen && (
            <div className="absolute top-10 right-2 bg-white border border-gray-300 p-2 rounded">
              <Link>
                <button className="block mb-2">Perfil</button>{" "}
              </Link>
              <Link to="modificarperfil">
                <button className="block mb-2">Cambiar Contraseña</button>
              </Link>
              <Link>
                <button className="block mb-2">Cerrar Sesión</button>
              </Link>
            </div>
          )}
          <button onClick={toggleMenu} className="text-white ml-2">
            <FaUser />
          </button>
        </div>
      </header>

      <div className="flex h-screen ">
        {/* Barra lateral */}
        <div
          className={`h-screen ${
            sidebarOpen ? "w-72" : "w-20"
          } fixed top-16 left-0  bg-red-500 overflow-y-scroll z-50`}
        >
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <TbNumber123 />

                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Semestre
                </span>
              </div>
            </button>
          </div >
          <div className="m-4 border-b border-gray-200 p-4">
            <Link to="listadocente">
              <button className="flex w-52 text-white ">
                <div className="flex items-center">
                  <FaUserFriends />
                  <span
                    className={`${
                      !sidebarOpen && "hidden"
                    } origin-left duration-200 ml-2`}
                  >
                    Docente
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaListAlt />

                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Materias
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaFlag />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Competencias
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <BiCircleThreeQuarter />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Categorias
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaSearch />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Resultados Aprendizaje
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaListUl />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Listado RA Curso
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <IoStatsChartSharp />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Instrumentos Evaluacion
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaFileAlt />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Unidades Tematicas
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaBookmark />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Subsistemas
                </span>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-white ">
              <div className="flex items-center">
                <FaIdCardAlt />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Planeadores Docente
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Main */}
        <main
          className={`flex-grow bg-gray-100 ${
            sidebarOpen
              ? "ml-64 md:ml-64 lg:ml-auto"
              : "ml-20 md:ml-20 lg:ml-auto "
          }`}
        >
          <div className="container lg:mx-20 md:mx-10  mt-10 z-40">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default HeaderDirector;
