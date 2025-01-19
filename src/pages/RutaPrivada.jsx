/**
 * RutaPrivada
 *
 * Descripcion:
 * Este componente se utiliza para proteger rutas en las que el acceso debe ser restringido solo a usuarios autenticados.
 * Si el usuario no está autenticado, será redirigido a la página de inicio de sesión.
 * Si el usuario está autenticado, se renderiza el componente que se pasa como prop.
 *
 * Estructura:
 * - Importaciones
 * - UseContext hook
 * - Redireccionar al login o pasar un componente que se debe renderizar si el usuario está autenticado.
 */

import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextoUsuario } from "../contexts/ContextoUsuario";

function RutaPrivada({ ComponenteParaRenderizar }) {
	// Obtener el valor de "usuario" desde el contexto ContextoUsuario
	const { usuario } = useContext(ContextoUsuario);

	// Si el usuario no está autenticado, redirigir a la página de login. Si autenticado, renderiza el componente protegido
	return <>{usuario == null ? <Navigate to={"/login"} /> : ComponenteParaRenderizar}</>;
}

export default RutaPrivada;
