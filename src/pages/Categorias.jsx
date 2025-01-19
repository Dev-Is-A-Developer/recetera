/**
 * Categorias
 *
 * Descripcion:
 * Este componente muestra una página con las categorías de recetas disponibles.
 *
 * Estructura:
 * - Importaciones
 * - Una lista de objetos con información sobre cada categoría
 * - Renderizado
 *    - Encabezado principal con el título "Recetas"
 *    - Lista de tarjetas (cards) que representan cada categoría, generada dinámicamente con un map
 */

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Categorias.css";

// Importación de imágenes para las categorías
import imagenDesayuno from "../assets/desayuno.jpg";
import imagenComida from "../assets/comida.jpg";
import imagenCena from "../assets/cena.jpg";
import imagenTapa from "../assets/tapa.jpg";
import imagenPostre from "../assets/postre.jpg";
import imagenBebida from "../assets/bebida.jpg";

// Datos de las categorías: tipo, descripción y ruta de la imagen
const Categorias = () => {
	const categorias = [
		{ tipo: "Desayuno", texto: "Recetas perfectas para empezar el día.", imagen: imagenDesayuno },
		{ tipo: "Comida", texto: "Maravillas para cualquier ocasión.", imagen: imagenComida },
		{ tipo: "Cena", texto: "Platos deliciosos para cenar en casa.", imagen: imagenCena },
		{ tipo: "Tapa", texto: "Pequeñas delicias para compartir.", imagen: imagenTapa },
		{ tipo: "Postre", texto: "Postres para endulzar tu semana.", imagen: imagenPostre },
		{ tipo: "Bebida", texto: "Bebidas que refrescan con cada trago.", imagen: imagenBebida },
	];

	return (
		<div className="categorias">
			{/* Encabezado de la sección */}
			<h1 className="categorias__header">Recetas</h1>

			{/* Contenedor de las tarjetas de categorías */}
			<div className="categorias__cards">
				{categorias.map((categoria) => (
					<div key={categoria.tipo} className="categoria__card">
						{/* Imagen de la categoría */}
						<img src={categoria.imagen} alt={categoria.tipo} className="categoria__imagen" />
						{/* Nombre y descripción de la categoría */}
						<h2 className="categoria__tipo">{categoria.tipo}s</h2>
						<p className="categoria__texto">{categoria.texto}</p>
						{/* Enlace a las recetas de la categoría */}
						<Link
							to={`/categorias/${categoria.tipo}`}
							className="categoria__link"
							title="Ver Recetas"
							onClick={() => {
								window.scroll(0, 0);
							}}
						>
							Ver Recetas
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categorias;
