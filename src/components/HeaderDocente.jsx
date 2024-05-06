import React from "react";

function HeaderDocente() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          className="relative flex w-full h-10 items-center justify-between py-1  bg-red-500  md:flex-wrap md:justify-start"
          data-te-navbar-ref
        >
          <h1 className="text-center text-white uppercase">Director</h1>
        </nav>
      </header>
      <main className="z-50 mt-24">
        <Outlet />
      </main>
    </>
  );
}

export default HeaderDocente;
