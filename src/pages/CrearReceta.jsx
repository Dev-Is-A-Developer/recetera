/**
 * CrearReceta
 *
 * Descripcion:
 * Este componente permite a los usuarios crear una nueva receta mediante un formulario interactivo.
 *
 * Estructura del componente:
 * - Importaciones
 * - Uso de hooks para manejar estados y referencias
 * - Validación de entradas del formulario para asegurar que los datos sean válidos.
 * - Uso de axios para realizar operaciones CRUD con la API.
 * - Form con botón de envío que ejecuta la función de creación de receta
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import { ContextoUsuario } from "../contexts/ContextoUsuario";
import "../styles/CrearReceta.css";

function CrearReceta() {
	// Referencias para los campos del formulario
	let refTitulo = useRef();
	let refTipo = useRef();
	let refTiempo = useRef();
	let refDescripcion = useRef();
	let refIngredientes = useRef();
	let refInstrucciones = useRef();

	// Contexto para obtener el usuario actual
	const { usuario } = useContext(ContextoUsuario);

	// URL de la API desde variables de entorno
	const { VITE_URL_RECETAS } = import.meta.env;

	// Hook para redirigir al usuario después de completar una acción
	const redirect = useNavigate();

	// Estado para mensajes de error
	const [mensajeError, setMensajeError] = useState("");

	// Función para manejar el envío del formulario
	function mandarParaCrear(e) {
		e.preventDefault(); // Evitar recarga de la página

		// Datos recopilados del formulario
		let recetaData = {
			titulo: refTitulo.current.value,
			tipo: refTipo.current.value,
			tiempo: refTiempo.current.value,
			descripcion: refDescripcion.current.value,
			ingredientes: refIngredientes.current.value,
			instrucciones: refInstrucciones.current.value,
			escritor: usuario,
		};

		// Función para validar los datos del formulario
		function validateInputs(data) {
			if (!data.titulo.trim()) {
				setMensajeError("El título es obligatorio.");
				return false;
			}
			if (!data.tipo.trim() || data.tipo.trim() === "default") {
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

		// Solicitud POST a la API
		axios.post(VITE_URL_RECETAS, recetaData).then((response) => {
			if (response.data.mensaje === "Inserción con éxito") {
				redirect("/misrecetas"); // Redirigir a la página de "Mis Recetas"
			}
		});
	}

	return (
		<div className="crear">
			{/* Encabezado de la sección */}
			<h1 className="crear__header">Crear Receta</h1>

			{/* Nota sobre campos */}
			<p className="crear__notaCampos">
				<i>Todos los campos son obligatorios.</i>
			</p>

			{/* Form con campos de titulo, tipo, tiempo, descripcion, ingredientes, instrucciones */}
			<form action="#" method="post" onSubmit={mandarParaCrear} className="crear__form" encType="multipart/form-data">
				<div className="crear__seccionForm">
					<label htmlFor="tit" className="crear__label">
						Título:{" "}
					</label>
					<textarea name="titulo" id="tit" maxLength="100" placeholder="Máximo 100 carácteres" ref={refTitulo} className="crear__input" />
				</div>

				<div className="crear__seccionForm">
					<label htmlFor="tipo" className="crear__label">
						Tipo:{" "}
					</label>
					<select name="tipo" id="tipo" ref={refTipo} defaultValue="default" className="crear__input selectInput">
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

				<div className="crear__seccionForm">
					<label htmlFor="tiempo" className="crear__label">
						Tiempo de preparación:{" "}
					</label>
					<textarea name="tiempo de preparacion" id="tiempo" placeholder="En minutos, de 1—60" maxLength={2} ref={refTiempo} className="crear__input tiempo" />
				</div>

				<div className="crear__seccionForm">
					<label htmlFor="desc" className="crear__label">
						Descripción:{" "}
					</label>
					<textarea name="descripcion" id="desc" ref={refDescripcion} className="crear__input" />
				</div>

				<div className="crear__seccionForm">
					<label htmlFor="ing" className="crear__label">
						Ingredientes:{" "}
					</label>
					<textarea name="ingredientes" id="ing" placeholder="Ingredientes con cantidades necesitadas" ref={refIngredientes} className="crear__input" />
				</div>

				<div className="crear__seccionForm">
					<label htmlFor="inst" className="crear__label">
						Instrucciones:{" "}
					</label>
					<textarea name="instrucciones" id="inst" ref={refInstrucciones} className="crear__input" />
				</div>

				{/* Botón de envío */}
				<input type="submit" value="Crear" className="crear__submit" />
			</form>

			{/* Mensaje de error */}
			<p className="crear__mensajeError">{mensajeError}</p>
		</div>
	);
}

export default CrearReceta;
