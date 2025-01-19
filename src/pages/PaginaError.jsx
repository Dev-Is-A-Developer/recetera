/**
 * PaginaError
 *
 * Descripcion:
 * Este componente se muestra cuando el usuario navega a una URL que no existe, mostrando una
 * página de error 404. La página incluye un mensaje de error y un enlace para volver a la página de inicio.
 *
 * Estructura del código:
 * - Importaciones
 * - Un mensaje de error 404 indicando que la página no fue encontrada con enlace para redirigir al usuario a la página principal
 */

import { Link } from "react-router-dom";
import "../styles/PaginaError.css";

function PaginaError() {
	return (
		<div className="paginaError">
			{/* Título que indica que la página no fue encontrada (Error 404) */}
			<h1>404 Not Found</h1>
			{/* Enlace que permite al usuario volver a la página de inicio */}
			<Link to="/" className="paginaError__link" title="Volver al Inicio">
				Volver al inicio
			</Link>
		</div>
	);
}

export default PaginaError;
