/**
 * Logout
 *
 * Descripcion:
 * Este componente muestra una pantalla de confirmación cuando el usuario intenta cerrar sesión.
 * Permite al usuario decidir si desea cerrar la sesión o cancelar la acción.
 *
 * Estructura:
 * - Importaciones
 * - Estado y efectos
 * - Funciones para cerrar sesion o no cerrar sesion, redirigiendo al usuario a otra pagina
 * - Interfaz con dos botones para confirmar o cancelar el cierre de sesión
 */

import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextoUsuario } from "../contexts/ContextoUsuario";
import "../styles/Logout.css";

function Logout() {
	// Obtener el objeto logout del ContextoUsuario
	const { logout } = useContext(ContextoUsuario);

	// Hook para redirigir al usuario después de completar una acción
	const redirect = useNavigate();

	// Funcion para no cerrar sesion y volver al inicio
	function noCerrarSesion() {
		redirect("/");
	}

	// Funcion para cerrar sesion y volver al login
	function cerrarSesion() {
		logout();
		redirect("/login");
	}

	return (
		<div className="logout">
			{/* Título de la pantalla de confirmación */}
			<h1 className="logout__texto">¿Estás seguro de que quieres cerrar la sesión?</h1>

			{/* Contenedor con los botones para confirmar o cancelar el cierre de sesión */}
			<div className="logout__containerButtons">
				{/* Botón para no cerrar sesión */}
				<button type="button" title="No Cerrar Sesión" onClick={noCerrarSesion} className="logout__button buttonNo">
					No
				</button>
				{/* Botón para confirmar el cierre de sesión */}
				<button type="button" title="Cerrar Sesión" onClick={cerrarSesion} className="logout__button buttonSi">
					Sí
				</button>
			</div>
		</div>
	);
}

export default Logout;
