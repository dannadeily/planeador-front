import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaAlignJustify,
} from "react-icons/fa";

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
    <>
      {/* Header */}
      <header className={`bg-red-500 p-5 fixed top-0 left-0 w-full z-50 flex justify-between items-center ${sidebarOpen ? 'translate-x-72' : ''}`}>
        <h1 className="text-black">ADMINISTRADOR</h1>
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

      {/* Barra lateral */}
      <div className="h-screen fixed left-0 top-0 z-50 bg-white">
        <div
          className={`${
            sidebarOpen ? "w-72" : "w-20"
          } h-screen pt-8 relative duration-300  left-0 top-0 z-50`}
        >
          <div
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
              !sidebarOpen && "rotate-180"
            }`}
            onClick={toggleSidebar}
          >
            <FaAlignJustify />
          </div>

          <div className="m-4 border-b border-gray-200 p-4">
            <button
              onClick={() => handleClick2("menu1")}
              className="flex w-52 text-black items-center"
            >
              <div className="flex items-center">
                <FaUser />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Semestre
                  <span className="ml-auto">
                    {openMenu2 === "menu1" ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronUp />
                    )}
                  </span>
                </span>
              </div>
            </button>
            {openMenu2 === "menu1" && (
              <div>
                <ul>
                  <li className="block p-2 text-black hover:bg-red-300 ">
                    <Link to="registrarpasante" onClick={handleMobileMenuClose}>
                      Registrar Pasante
                    </Link>
                  </li>
                  {/* Resto de tus elementos de menú */}
                </ul>
              </div>
            )}
          </div>
          {/* Resto de los elementos de menú */}
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`ml-20 flex-1 z-40 ${sidebarOpen ? 'translate-x-72' : ''}`}>
        <main className="container lg:mx-20 md:mx-10 mx-5 my-24 z-40">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default HeaderDirector;
