/**
 * EliminarReceta
 *
 * Descripcion:
 * Este componente permite confirmar y ejecutar la eliminación de una receta específica.
 * Presenta un mensaje de confirmación al usuario con opciones para cancelar o proceder con la eliminación.
 *
 * Estructura:
 * - Importaciones
 * - Uso de hooks para manejar parámetros de la URL y redirecciones.
 * - Solicitud DELETE a la API utilizando axios.
 * - Interfaz con dos botones para cancelar y para confirmar.
 */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EliminarReceta.css";

function EliminarReceta() {
	// Obtener el ID de la receta desde los parámetros de la URL
	let { id } = useParams();

	// Hook para redirigir al usuario después de completar una acción
	let redirect = useNavigate();

	// URL base de la API importada desde las variables de entorno
	const { VITE_URL_RECETAS } = import.meta.env;

	// Función para manejar la acción de no eliminar la receta
	function noEliminar() {
		redirect("/misrecetas");
	}

	// Función para manejar la acción de eliminar la receta
	function siEliminar() {
		// Enviar solicitud DELETE para eliminar
		axios
			.delete(`${VITE_URL_RECETAS}/${id}`)
			.then((response) => {
				if (response.data.mensaje === "Receta eliminada con éxito") {
					redirect("/misrecetas");
				} else {
					console.error("Error:", response.data.error);
				}
			})
			.catch((err) => {
				console.error("Error eliminando receta:", err);
			});
	}

	return (
		<div className="eliminar">
			{/* Mensaje de confirmación */}
			<h1 className="eliminar__texto">¿Estás seguro que deseas eliminar esta receta?</h1>

			{/* Contenedor de los botones de acción */}
			<div className="eliminar__containerButtons">
				{/* Botón para cancelar la acción */}
				<button type="button" title="No Eliminar Receta" onClick={noEliminar} className="eliminar__button buttonNo">
					No
				</button>
				{/* Botón para hacer la eliminación */}
				<button type="button" title="Eliminar Receta" onClick={siEliminar} className="eliminar__button buttonSi">
					Sí
				</button>
			</div>
		</div>
	);
}

export default EliminarReceta;
