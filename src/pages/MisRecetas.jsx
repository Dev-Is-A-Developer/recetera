/**
 * MisRecetas
 *
 * Descripcion:
 * Este componente muestra las recetas creadas por un usuario específico. Permite al usuario ver, crear, editar o eliminar recetas.
 * Además, muestra un mensaje y una imagen cuando el usuario no tiene recetas guardadas.
 *
 * Estructura:
 * - Importaciones
 * - Estado y contexto:
 * - Uso de hooks para manejar effect
 * - Interfaz con encabezados con el nombre del usuario, cards para cada receta, botones para crear/editar/eliminar
 */

import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextoUsuario } from "../contexts/ContextoUsuario";
import "../styles/MisRecetas.css";
import imagenCrear from "../assets/comida-tabla.jpg";

function MisRecetas() {
	// Estado para almacenar las recetas del usuario
	const [recetas, setRecetas] = useState([]);

	// Obtener el nombre del usuario desde el contexto global
	const { usuario } = useContext(ContextoUsuario);

	// URL base de la API importada desde las variables de entorno
	const { VITE_URL_RECETAS } = import.meta.env;

	// Cargar las recetas del usuario
	useEffect(() => {
		// Solicitud GET para obtener recetas del usuario
		axios
			.get(VITE_URL_RECETAS + "/" + usuario)
			.then((response) => {
				setRecetas(response.data);
			})
			.catch((error) => {
				console.error("Error en la consulta:", error);
			});
	}, []);

	return (
		<div className="misRecetas">
			{/* Encabezado principal */}
			<h1 className="misRecetas__header">Las recetas de {usuario}</h1>

			{/* Introducción y enlace para crear una nueva receta */}
			<div className="misRecetas__intro">
				<h2 className="misRecetas__headerCTA">Nos encanta tu gusto! Tienes algúna receta para compartir?</h2>

				<Link
					to={"/crearReceta"}
					className="misRecetas__link linkCrear"
					title="Crear Receta"
					onClick={() => {
						window.scroll(0, 0);
					}}
				>
					Crear Receta
				</Link>
			</div>

			{/* Lista de recetas o mensaje si no hay recetas */}
			{recetas.length > 0 ? (
				recetas.map((receta) => {
					return (
						<div className="misRecetas__cards">
							<div key={receta.id_receta} className="misRecetas__card">
								<h2 className="misRecetas__titulo">{receta.titulo}</h2>
								<h3 className="misRecetas__tipo">{receta.tipo}</h3>
								<h3 className="misRecetas__entrada">Tiempo de preparación: </h3>
								<p className="misRecetas__ingredientes">{receta.tiempo} minutos</p>
								<h3 className="misRecetas__entrada">Descripción: </h3>
								<p className="misRecetas__descripcion">{receta.descripcion}</p>
								<h3 className="misRecetas__entrada">Ingredientes: </h3>
								<p className="misRecetas__ingredientes">{receta.ingredientes}</p>
								<h3 className="misRecetas__entrada">Instrucciones: </h3>
								<p className="misRecetas__instrucciones">{receta.instrucciones}</p>

								<div className="misRecetas__containerLinks">
									<Link
										to={"/editarReceta/" + receta.id_receta}
										className="misRecetas__link linkEditar"
										title="Editar Receta"
										onClick={() => {
											window.scroll(0, 0);
										}}
									>
										Editar
									</Link>
									<Link
										to={"/eliminarReceta/" + receta.id_receta}
										className="misRecetas__link linkEliminar"
										title="Eliminar Receta"
										onClick={() => {
											window.scroll(0, 0);
										}}
									>
										Eliminar
									</Link>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="misRecetas__aviso">
					<h2 className="misRecetas__avisoTexto">Todavía no tienes recetas</h2>

					<img src={imagenCrear} alt="Tabla de comida" className="misRecetas__imagen"></img>
				</div>
			)}

			{/* Enlace adicional para crear una receta */}
			<h3 className="misRecetas__textoAbajo">Más ideas para compartir?</h3>
			<Link
				to={"/crearReceta"}
				className="misRecetas__link linkCrear"
				title="Crear Receta"
				onClick={() => {
					window.scroll(0, 0);
				}}
			>
				Crear Receta
			</Link>
		</div>
	);
}

export default MisRecetas;
