/**
 * RecetasPorCategoria
 *
 * Descripcion:
 * Este componente muestra una lista de recetas filtradas por categoría. El tipo de categoría se obtiene
 * de la URL y se utiliza para hacer una solicitud a la API. Si no se encuentran recetas, se muestra un mensaje.
 *
 * Estructura:
 * - Importaciones
 * - Estado y efectos
 * - Secciones principales:
 *   - Título de la categoría.
 *   - Lista de recetas con sus detalles.
 *   - Mensaje y enlace de aviso si no hay recetas disponibles.
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/RecetasPorCategoria.css";
import imagenAviso from "../assets/comida-tabla.jpg";

const RecetasPorCategoria = () => {
	// Obtener el tipo de categoría de la URL mediante useParams
	const { tipo } = useParams();

	// Estado para almacenar las recetas de la categoría
	const [recetas, setRecetas] = useState([]);

	// URL base de la API importada desde las variables de entorno
	const { VITE_URL_RECETAS } = import.meta.env;

	// Hook useEffect para hacer la solicitud de recetas al cargar el componente
	useEffect(() => {
		axios
			.get(VITE_URL_RECETAS + "/categorias/" + tipo) // Obtener recetas de la categoría correspondiente
			.then((response) => {
				setRecetas(response.data);
			})
			.catch((error) => {
				console.error("Error fetching recipes:", error);
			});
	}, [tipo]);

	return (
		<div className="recetasCategoria">
			{/* Título de la página con el nombre de la categoría */}
			<h1 className="recetasCategoria__header">{tipo}s</h1>

			{/* Si hay recetas, se muestran con cards */}
			{recetas.length > 0 ? (
				<div className="recetasCategoria__cards">
					{recetas.map((receta) => (
						<div key={receta.id_receta} className="recetasCategoria__card">
							<h2 className="recetasCategoria__titulo">{receta.titulo}</h2>
							<h3 className="recetasCategoria__entrada">Tiempo de preparación: </h3>
							<p className="recetasCategoria__ingredientes">{receta.tiempo} minutos</p>
							<h3 className="recetasCategoria__entrada">Descripción: </h3>
							<p className="recetasCategoria__descripcion">{receta.descripcion}</p>
							<h3 className="recetasCategoria__entrada">Ingredientes: </h3>
							<p className="recetasCategoria__ingredientes">{receta.ingredientes}</p>
							<h3 className="recetasCategoria__entrada">Instrucciones: </h3>
							<p className="recetasCategoria__instrucciones">{receta.instrucciones}</p>
							<h4 className="recetasCategoria__entrada">
								Escrito por: <span className="recetasCategoria__escritor">{receta.escritor}</span>
							</h4>
						</div>
					))}
				</div>
			) : (
				// Mensaje de aviso si no hay recetas de esta categoria
				<div className="recetasCategoria__aviso">
					<h2 className="recetasCategoria__avisoTexto">
						No hay recetas disponibles en esta categoría de momento! Vuelve atrás y{" "}
						<Link
							to={"/categorias"}
							className="recetasCategoria__link linkAviso"
							title="Categorias"
							onClick={() => {
								window.scroll(0, 0);
							}}
						>
							elige otra categoría.
						</Link>
					</h2>
					{/* Imagen para acompañar el mensaje */}
					<img src={imagenAviso} alt="Tabla de comida" className="recetasCategoria__imagen"></img>
				</div>
			)}
			{/* Enlace para volver a la página de categorías */}
			<Link
				to={"/categorias"}
				className="recetasCategoria__link"
				title="Categorias"
				onClick={() => {
					window.scroll(0, 0);
				}}
			>
				Volver a Categorias
			</Link>
		</div>
	);
};

export default RecetasPorCategoria;
