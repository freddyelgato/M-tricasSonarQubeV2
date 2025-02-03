"use client";
import React, { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarUser = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Cambiar estado para abrir/cerrar el menú
    };

    const handleLogout = () => {
        // Lógica para manejar el logout (por ejemplo, eliminar las cookies y redirigir)
        window.location.href = '/login'; // Redirigir a la página de login
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand text-white fw-bold" href="#">
                    <span className="bg-white text-primary px-2 py-1 rounded">B</span>
                </a>
                <Link href="/user" className="navbar-brand">
                    Space of Sport
                </Link>

                {/* Botón de menú responsivo */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenido del navbar */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/user" className="nav-link active">
                                Home
                            </Link>
                        </li>
                        {/* Opción ProductsAdmin */}
                        <li className="nav-item">
                        <Link href="/Products" className="nav-link">
                            Products Admin
                        </Link>
                        </li>
                    </ul>

                    

                    {/* Mostrar solo el círculo de la foto de perfil */}
                    <ul className="nav navbar-nav ml-md-auto">
                        <li className="dropdown">
                            {/* Botón de activación */}
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen ? "true" : "false"}

                            >
                                Welcome, User <b className="caret"></b>
                            </a>

                            {/* Menú desplegable */}
                            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
                                
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
