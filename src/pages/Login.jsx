/**
 * Login
 *
 * Descripcion:
 * Este componente maneja la autenticación de usuarios en la aplicación. Permite al usuario ingresar su nombre de usuario
 * y contraseña para iniciar sesión. Si las credenciales son válidas, el usuario es redirigido a la página principal.
 * Si las credenciales no son válidas, se muestra un mensaje de error.
 *
 * Estructura:
 * - Importaciones
 * - Estado y efectos
 * - Secciones principales:
 *     - Formulario para ingresar las credenciales.
 *     - Mensaje de error si el inicio de sesión es incorrecto.
 */

import React from "react";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextoUsuario } from "../contexts/ContextoUsuario";
import "../styles/Login.css";

function Login() {
	// Hook para redirigir al usuario después de completar una acción
	const redirect = useNavigate();

	// Obtener el objeto login del ContextoUsuario
	const { login } = useContext(ContextoUsuario);

	// Estado para almacenar el mensaje de error en caso de credenciales incorrectas
	const [mensajeError, setMensajeError] = useState("");

	// Referencias para los campos de entrada del formulario
	const refUsuario = useRef();
	const refContrasena = useRef();

	// Función para verificar las credenciales del usuario al enviar el formulario
	function encontrarUsuario(e) {
		e.preventDefault(); // Evitar recarga de la página

		// Crear un objeto con los datos del usuario a verificar
		let objetoParaEncontrar = {
			usuario: refUsuario.current.value,
			contrasena: refContrasena.current.value,
		};

		// Hacer una solicitud POST para verificar las credenciales
		axios.post("https://recetera-server.vercel.app/usuarios", objetoParaEncontrar).then((response) => {
			if (response.data.mensajeError == "Usuario no encontrado") {
				setMensajeError("Este usuario no existe y/o la contraseña es inválida."); // Mensaje de error
			} else {
				login(response.data.nombre); // Si las credenciales son válidas, se llama a la función 'login' con el nombre del usuario
				redirect("/"); // Redirigir al usuario a la página principal después de un inicio de sesión exitoso
			}
		});
	}

	return (
		<div className="login">
			{/* Título principal de la página de login */}
			<h1 className="login__header">La Recetera</h1>

			{/* Formulario de inicio de sesión */}
			<form action="#" method="post" onSubmit={encontrarUsuario} className="login__form" encType="multipart/form-data">
				<div className="login__seccionForm">
					<label htmlFor="user" className="login__label">
						Nombre de usuario:{" "}
					</label>
					<input type="text" name="usuario" id="user" ref={refUsuario} className="login__input" />
				</div>

				<div className="login__seccionForm">
					<label htmlFor="cont" className="login__label">
						Contraseña:{" "}
					</label>
					<input type="password" name="contrasena" id="cont" ref={refContrasena} className="login__input" />
				</div>

				<input type="submit" value="Iniciar Sesión" className="login__submit" />
			</form>

			{/* Mensaje de error si las credenciales son incorrectas */}
			<p className="login__mensajeError">{mensajeError}</p>
		</div>
	);
}

export default Login;
