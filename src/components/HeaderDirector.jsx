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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setOpenIcon(true); // Siempre que se abra/cierre la barra lateral, el icono estará visible
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick2 = (menuName) => {
    setOpenMenu2(openMenu2 === menuName ? "" : menuName);
  };

  // Close mobile menu when a navigation link is clicked
  const handleMobileMenuClose = () => {
    setMenuOpen(false);
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
          className={` cursor-pointer w-16   ${!sidebarOpen && "rotate-180"}`}
          onClick={toggleSidebar}
        >
          <FaAlignJustify />
        </div>
        <h1 className="text-black">Director</h1>
        <div className="flex items-center">
          {menuOpen && (
            <div className="absolute top-10 right-2 bg-white border border-gray-300 p-2 rounded">
              {/* Contenido del menú */}
            </div>
          )}
          <button onClick={toggleMenu} className="text-white ml-2">
            <FaUser />
          </button>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Barra lateral */}
        <sidebar
          className={`h-screen ${
            sidebarOpen ? "w-72" : "w-20"
          } fixed top-16 left-0  bg-white transition-all duration-300`}
        >
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
                <TbNumber123 />

                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Semestre
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
                <FaUserFriends />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Docente
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
                <FaListAlt />

                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Materias
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
                <FaFlag />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Competencias
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
                <BiCircleThreeQuarter />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Categorias
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
              <FaSearch />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Resulatdos de Aprendizaje
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
              <FaListUl />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Listado RA Curso
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
              <IoStatsChartSharp />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Instrumentos de Evaluacion
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
              <FaFileAlt />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Unidades Tematicas
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
              <FaBookmark />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Subsistemas
                </buttom>
              </div>
            </button>
          </div>
          <div className="m-4 border-b border-gray-200 p-4">
            <button className="flex w-52 text-black items-center">
              <div className="flex items-center">
              <FaIdCardAlt />
                <buttom
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Planeadores Docente
                </buttom>
              </div>
            </button>
          </div>
        </sidebar>

        {/* Main */}
        <main className="container lg:mx-20 md:mx-10 mx-5 my-24 z-40">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HeaderDirector;
