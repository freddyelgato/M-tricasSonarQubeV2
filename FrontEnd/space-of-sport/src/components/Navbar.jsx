"use client";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand text-white fw-bold" href="#">
          <span className="bg-white text-primary px-2 py-1 rounded">B</span>
        </a>
        <Link href="/" className="navbar-brand">
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
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
          </ul>

          {/* Botón de Login alineado a la derecha */}
          <div className="ms-auto">
            <a href="/login" className="btn btn-outline-light">Login</a>
            <a href="/register" className="btn btn-outline-light">Register</a>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;