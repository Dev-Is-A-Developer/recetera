/* HEADER
Descripción: Este archivo jsx contiene el header del sitio web.
Estructura general: Encabezado con version de barra de navegación y versión con menu responsive */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextoUsuario } from "../contexts/ContextoUsuario";
import "../../styles/Header.css";

function Header() {
	const { usuario } = useContext(ContextoUsuario); // Obtiene la información del usuario desde el contexto ContextoUsuario

	const [menuAbierto, setMenuAbierto] = useState(false); // Define un estado para manejar si el menú responsive está abierto o cerrado.

	const toggleMenu = () => {
		setMenuAbierto((estado) => !estado); // Cambia el estado del menú entre abierto y cerrado.
	};

	return (
		<>
			{/* HEADER RESPONSIVE: Este bloque renderiza el header en pantallas pequeñas (responsive). */}
			<nav className={`headerResponsive ${menuAbierto ? "headerResponsive--open" : ""}`} id="navegacion">
				{/* Botón para cerrar el menú */}
				<button type="button" title="Cerrar Cortina" className="headerResponsive__botonCierra" id="botonCierraCortina" onClick={toggleMenu}>
					&times;
				</button>

				{/* Lista de enlaces de navegación en modo responsive */}
				<ul className="headerResponsive__lista">
					{/* Enlace a Inicio */}
					<li className="headerResponsive__elementoLista">
						<Link to={"/"} className="headerResponsive__elementoListaLink" onClick={toggleMenu}>
							Inicio
						</Link>
					</li>

					{/* Enlace a Recetas */}
					<li className="headerResponsive__elementoLista">
						<Link to={"/categorias"} className="headerResponsive__elementoListaLink" onClick={toggleMenu}>
							Recetas
						</Link>
					</li>

					{/* Enlace a "Mis Recetas" si el usuario está autenticado */}
					{usuario !== null ? (
						<li className="headerResponsive__elementoLista">
							<Link to={"/misrecetas"} className="headerResponsive__elementoListaLink" onClick={toggleMenu}>
								Mis Recetas
							</Link>
						</li>
					) : (
						<></>
					)}

					{/* Enlace a "Crear Receta" si el usuario está autenticado */}
					{usuario !== null ? (
						<li className="headerResponsive__elementoLista">
							<Link to={"/crearReceta"} className="headerResponsive__elementoListaLink" onClick={toggleMenu}>
								Crear Receta
							</Link>
						</li>
					) : (
						<></>
					)}

					{/* Enlace para cerrar sesión si el usuario está autenticado */}
					{usuario !== null ? (
						<li className="headerResponsive__elementoLista">
							<Link to={"/logout"} className="headerResponsive__elementoListaLink" onClick={toggleMenu}>
								Cerrar Sesión
							</Link>
						</li>
					) : (
						<></>
					)}

					{/* Enlace a Login si el usuario no está autenticado */}
					{usuario == null ? (
						<li className="headerResponsive__elementoLista">
							<Link to={"/login"} className="headerResponsive__elementoListaLink" onClick={toggleMenu}>
								Login
							</Link>
						</li>
					) : (
						<></>
					)}
				</ul>
			</nav>

			{/* HEADER: Este bloque renderiza el header estándar con barra de navegación para pantallas más grandes. */}
			<header className="header">
				{/* Logo del sitio */}
				<li className="header__logo">
					<Link to={"/"} className="header__logoLink">
						La Recetera
					</Link>
				</li>
				{/* Barra de navegación */}
				<nav className="header__nav">
					<ul className="header__lista">
						{/* Enlace a Inicio */}
						<li className="header__elementoLista">
							<Link to={"/"} className="header__elementoListaLink">
								Inicio
							</Link>
						</li>

						{/* Enlace a Recetas */}
						<li className="header__elementoLista">
							<Link to={"/categorias"} className="header__elementoListaLink">
								Recetas
							</Link>
						</li>

						{/* Enlace a "Mis Recetas" si el usuario está autenticado */}
						{usuario !== null ? (
							<li className="header__elementoLista">
								<Link to={"/misrecetas"} className="header__elementoListaLink">
									Mis Recetas
								</Link>
							</li>
						) : (
							<></>
						)}

						{/* Enlace a "Crear Receta" si el usuario está autenticado */}
						{usuario !== null ? (
							<li className="header__elementoLista">
								<Link to={"/crearReceta"} className="header__elementoListaLink">
									Crear Receta
								</Link>
							</li>
						) : (
							<></>
						)}

						{/* Enlace para cerrar sesión si el usuario está autenticado */}
						{usuario !== null ? (
							<li className="header__elementoLista">
								<Link to={"/logout"} className="header__elementoListaLink">
									Cerrar Sesión
								</Link>
							</li>
						) : (
							<></>
						)}

						{/* Enlace a Login si el usuario no está autenticado */}
						{usuario == null ? (
							<li className="header__elementoLista">
								<Link to={"/login"} className="header__elementoListaLink">
									Login
								</Link>
							</li>
						) : (
							<></>
						)}
					</ul>
				</nav>

				{/* Botón de menú para la versión responsive */}
				<button type="button" title="Abrir Cortina" className="header__responsiveButton" id="botonAbreCortina" onClick={toggleMenu}>
					<i className="fa-solid fa-bars"></i>
				</button>
			</header>
		</>
	);
}

export default Header;
