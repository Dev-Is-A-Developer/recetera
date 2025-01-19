/* FOOTER
Descripción: El footer está dividido en dos secciones:
1. Sección superior: enlaces de navegación similares al header.
2. Sección inferior: información legal, redes sociales y copyright.
*/

import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextoUsuario } from "../contexts/ContextoUsuario";
import "../../styles/Footer.css";

function Footer() {
	const { usuario } = useContext(ContextoUsuario); // Obtiene la información del usuario desde el contexto ContextoUsuario

	return (
		<div>
			<footer className="footer">
				{/* Sección superior */}
				<div className="footer__seccionArriba">
					<ul className="footer__lista">
						{/* Enlace a Inicio */}
						<li className="footer__elementoLista">
							<Link
								to={"/"}
								className="footer__elementoListaLink"
								onClick={() => {
									window.scroll(0, 0);
								}}
							>
								Inicio
							</Link>
						</li>

						{/* Enlace a Recetas */}
						<li className="footer__elementoLista">
							<Link
								to={"/categorias"}
								className="footer__elementoListaLink"
								onClick={() => {
									window.scroll(0, 0);
								}}
							>
								Recetas
							</Link>
						</li>

						{/* Enlace a "Mis Recetas" si el usuario está autenticado */}
						{usuario !== null ? (
							<li className="footer__elementoLista">
								<Link
									to={"/misrecetas"}
									className="footer__elementoListaLink"
									onClick={() => {
										window.scroll(0, 0);
									}}
								>
									Mis Recetas
								</Link>
							</li>
						) : (
							<></>
						)}

						{/* Enlace a "Crear Receta" si el usuario está autenticado */}
						{usuario !== null ? (
							<li className="footer__elementoLista">
								<Link
									to={"/crearReceta"}
									className="footer__elementoListaLink"
									onClick={() => {
										window.scroll(0, 0);
									}}
								>
									Crear Receta
								</Link>
							</li>
						) : (
							<></>
						)}

						{/* Enlace para cerrar sesión si el usuario está autenticado */}
						{usuario !== null ? (
							<li className="footer__elementoLista">
								<Link
									to={"/logout"}
									className="footer__elementoListaLink"
									onClick={() => {
										window.scroll(0, 0);
									}}
								>
									Cerrar Sesión
								</Link>
							</li>
						) : (
							<></>
						)}

						{/* Enlace a Login si el usuario no está autenticado */}
						{usuario == null ? (
							<li className="footer__elementoLista">
								<Link
									to={"/login"}
									className="footer__elementoListaLink"
									onClick={() => {
										window.scroll(0, 0);
									}}
								>
									Login
								</Link>
							</li>
						) : (
							<></>
						)}
					</ul>
				</div>

				{/* Sección inferior */}
				<div className="footer__linea"></div>

				<div className="footer__seccionAbajo">
					{/* Lista de términos legales */}
					<ul className="footer__listaAbajo">
						<li className="footer__elementoListaAbajo">Términos y Condiciones</li>
						<li className="footer__elementoListaAbajo">Política de Privacidad </li>
						<li className="footer__elementoListaAbajo">Condiciones de Compra</li>
					</ul>

					{/* Lista de redes sociales */}
					<ul className="footer__listaAbajo">
						<li className="footer__elementoListaAbajo">
							<i className="fa fa-brands fa-instagram"></i> Instagram
						</li>
						<li className="footer__elementoListaAbajo">
							<i className="fa fa-brands fa-tiktok"></i> Tiktok
						</li>
						<li className="footer__elementoListaAbajo">
							<i className="fa fa-brands fa-facebook"></i> Facebook
						</li>
					</ul>

					{/* Información de copyright */}
					<p className="footer__copyright">
						<i className="fa-regular fa-copyright"></i> 2025 La Receta.
					</p>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
