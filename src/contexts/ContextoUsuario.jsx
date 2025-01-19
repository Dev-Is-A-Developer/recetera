/* CONTEXTOUSUARIO 
Descripcion: Un contexto global para compartir información sobre el usuario en toda la aplicación. */

import { useState, createContext } from "react";

const ContextoUsuario = createContext(); // Crea contexto global

// Componente proveedor para envolver los componentes que necesitan acceso al contexto del usuario
const ProviderUsuario = ({ children }) => {
	const [usuario, setUsuario] = useState(localStorage.getItem("usuario")); // Estado del usuario inicializado con el valor almacenado en localStorage (si existe)

	// Función para iniciar sesión.
	const login = (usuarioData) => {
		localStorage.setItem("usuario", usuarioData); // Guarda la información del usuario en localStorage
		setUsuario(usuarioData); // Actualiza el estado del usuario con los datos proporcionados
	};

	// Función para cerrar sesión.
	const logout = () => {
		localStorage.removeItem("usuario"); // Elimina la información del usuario de localStorage
		setUsuario(null); // Actualiza el estado del usuario a null para reflejar que no hay un usuario autenticado
	};

	// Proveedor del contexto que pasa el estado "usuario" "y las funciones de login y logout a los componentes children
	return <ContextoUsuario.Provider value={{ usuario, login, logout }}>{children}</ContextoUsuario.Provider>; // Renderiza los componentes children que usan el contexto
};

export { ContextoUsuario, ProviderUsuario };
