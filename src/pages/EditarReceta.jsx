/**
 * EditarReceta
 *
 * Descripcion:
 * Este componente permite editar una receta existente. Recupera los datos de la receta seleccionada desde una API,
 * los muestra en un formulario, y permite al usuario modificar los valores.
 *
 * Estructura:
 * - Importaciones
 * - Uso de hooks para manejar referencias, parámetros de URL, estado y efectos.
 * - Validación de entradas del formulario para asegurar que los datos sean válidos.
 * - Uso de axios para realizar operaciones CRUD con la API.
 * - Form con botón de envío que ejecuta la función de modificación de receta
 */

import React from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EditarReceta.css";

function EditarReceta() {
	// Referencias para manejar los campos del formulario directamente
	let refTitulo = useRef();
	let refTipo = useRef();
	let refTiempo = useRef();
	let refDescripcion = useRef();
	let refIngredientes = useRef();
	let refInstrucciones = useRef();

	// Recuperar el ID de la receta desde los parámetros de la URL
	let { id } = useParams();

	// URL base de la API importada desde las variables de entorno
	let { VITE_URL_RECETAS } = import.meta.env;

	// Hook para redirigir al usuario después de completar una acción
	let redirect = useNavigate();

	// Estado para manejar mensajes de error en la validación
	const [mensajeError, setMensajeError] = useState("");

	// Hook useEffect para cargar los datos de la receta
	useEffect(() => {
		axios
			.get(`${VITE_URL_RECETAS}/recetaActual/${id}`)
			.then((response) => {
				// Asignar los valores obtenidos a los campos del formulario mediante referencias
				refTitulo.current.value = response.data.titulo;
				refTipo.current.value = response.data.tipo;
				refTiempo.current.value = response.data.tiempo;
				refDescripcion.current.value = response.data.descripcion;
				refIngredientes.current.value = response.data.ingredientes;
				refInstrucciones.current.value = response.data.instrucciones;
			})
			.catch((error) => {
				console.error("Error en la consulta", error);
			});
	}, []);

	// Función para manejar el envío del formulario y editar la receta
	function mandarParaEditar(e) {
		e.preventDefault(); // Evitar recarga de la página

		// Crear un objeto con los datos de la receta modificada
		let recetaData = {
			id_receta: id, // id para especificar qué receta editar
			titulo: refTitulo.current.value,
			tipo: refTipo.current.value,
			tiempo: refTiempo.current.value,
			descripcion: refDescripcion.current.value,
			ingredientes: refIngredientes.current.value,
			instrucciones: refInstrucciones.current.value,
		};

		// Función para validar los datos del formulario
		function validateInputs(data) {
			if (!data.titulo.trim()) {
				setMensajeError("El título es obligatorio.");
				return false;
			}
			if (!data.tipo.trim()) {
				setMensajeError("El tipo es obligatorio.");
				return false;
			}
			if (!data.tiempo || isNaN(data.tiempo) || data.tiempo <= 0 || data.tiempo > 60) {
				setMensajeError("El tiempo debe ser un número de minutos válido entre 1-60.");
				return false;
			}
			if (!data.descripcion.trim()) {
				setMensajeError("La descripción es obligatoria.");
				return false;
			}
			if (!data.ingredientes.trim()) {
				setMensajeError("Debe proporcionar al menos un ingrediente.");
				return false;
			}
			if (!data.instrucciones.trim()) {
				setMensajeError("Las instrucciones son obligatorias.");
				return false;
			}
			return true;
		}

		// Validación antes de enviar la solicitud
		if (!validateInputs(recetaData)) {
			return; // Si no tiene éxito, para la función
		}

		// Enviar los datos actualizados a la API mediante una solicitud PUT
		axios
			.put(VITE_URL_RECETAS, recetaData)
			.then((response) => {
				if (response.data.mensaje === "Modificado con éxito") {
					redirect("/misrecetas"); // Redireccionar a la lista de MisRecetas
				}
			})
			.catch((error) => {
				console.error("Error en la modificación de la receta:", error);
				alert("Ocurrió un error en la modificación de la receta. Intenta de nuevo.");
			});
	}

	return (
		<div className="editar">
			{/* Encabezado de la sección */}
			<h1 className="editar__header">Editar Receta</h1>

			{/* Nota sobre campos */}
			<p className="editar__notaCampos">
				<i>Todos los campos son obligatorios.</i>
			</p>

			{/* Form con campos de titulo, tipo, tiempo, descripcion, ingredientes, instrucciones */}
			<form action="#" method="post" onSubmit={mandarParaEditar} className="editar__form" encType="multipart/form-data">
				<div className="editar__seccionForm">
					<label htmlFor="tit" className="editar__label">
						Título:{" "}
					</label>
					<textarea name="titulo" id="tit" maxLength="100" placeholder="Máximo 100 carácteres" ref={refTitulo} className="editar__input" />
				</div>

				<div className="editar__seccionForm">
					<label htmlFor="tipo" className="editar__label">
						Tipo:{" "}
					</label>
					<select name="tipo" id="tipo" ref={refTipo} defaultValue="default" className="editar__input selectInput">
						<option value="default" disabled hidden>
							Elegir tipo
						</option>
						<option value="Desayuno">Desayuno</option>
						<option value="Comida">Comida</option>
						<option value="Cena">Cena</option>
						<option value="Tapa">Tapa</option>
						<option value="Postre">Postre</option>
						<option value="Bebida">Bebida</option>
					</select>
				</div>

				<div className="editar__seccionForm">
					<label htmlFor="tiempo" className="editar__label">
						Tiempo de preparación:{" "}
					</label>
					<textarea name="tiempo de preparacion" id="tiempo" placeholder="En minutos, de 1—60" maxLength={2} ref={refTiempo} className="editar__input tiempo" />
				</div>

				<div className="editar__seccionForm">
					<label htmlFor="desc" className="editar__label">
						Descripción:{" "}
					</label>
					<textarea name="descripcion" id="desc" ref={refDescripcion} className="editar__input" />
				</div>

				<div className="editar__seccionForm">
					<label htmlFor="ing" className="editar__label">
						Ingredientes:{" "}
					</label>
					<textarea name="ingredientes" id="ing" placeholder="Ingredientes con cantidades necesitadas" ref={refIngredientes} className="editar__input" />
				</div>

				<div className="editar__seccionForm">
					<label htmlFor="inst" className="editar__label">
						Instrucciones:{" "}
					</label>
					<textarea name="instrucciones" id="inst" ref={refInstrucciones} className="editar__input" />
				</div>

				{/* Botón de envío */}
				<input type="submit" value="Guardar" className="editar__submit" />
			</form>

			{/* Mensaje de error */}
			<p className="editar__mensajeError">{mensajeError}</p>
		</div>
	);
}

export default EditarReceta;
