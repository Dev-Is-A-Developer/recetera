/**
 * Main (componente principal)
 *
 * Este componente es el punto de entrada de la aplicación React, donde se gestionan las rutas y la estructura general.
 * Se utiliza React Router para la navegación y Suspense para la carga diferida (lazy loading) de componentes.
 * El componente `ProviderUsuario` gestiona el estado global relacionado con el usuario autenticado.
 */

// Importaciones
import "./styles/App.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { ProviderUsuario } from "./contexts/ContextoUsuario";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RutaPrivada from "./pages/RutaPrivada";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Inicio from "./pages/Inicio";
import MisRecetas from "./pages/MisRecetas";
import CrearReceta from "./pages/CrearReceta";
import EditarReceta from "./pages/EditarReceta";
import EliminarReceta from "./pages/EliminarReceta";
import PaginaError from "./pages/PaginaError";
import Categorias from "./pages/Categorias";
import RecetasPorCategoria from "./pages/RecetasPorCategoria";

// Renderizar los componentes
createRoot(document.getElementById("root")).render(
	<>
		{/* Router gestiona la navegación entre las páginas */}
		<Router>
			{/* UserProvider para gestionar el estado global del usuario */}
			<ProviderUsuario>
				{/* Componente Header que contiene la barra de navegación/menu */}
				<Header />
				{/* Suspense para cargar los componentes de forma diferida mientras se muestra un fallback */}
				<Suspense fallback={<p>Cargando...</p>}>
					{/* Definición de las rutas de la aplicación */}
					<Routes>
						{/* Ruta principal */}
						<Route path="/" element={<Inicio />} />

						{/* Ruta para mostrar todas las categorías de recetas */}
						<Route path="/categorias" element={<Categorias />} />

						{/* Ruta para ver recetas por categoría */}
						<Route path="/categorias/:tipo" element={<RecetasPorCategoria />} />

						{/* Ruta para la página de login */}
						<Route path="/login" element={<Login />} />

						{/* Ruta para cerrar sesión (privada) */}
						<Route path="/logout" element={<RutaPrivada ComponenteParaRenderizar={<Logout />} />} />

						{/* Ruta para ver las recetas del usuario autenticado (privada) */}
						<Route path="/misrecetas" element={<RutaPrivada ComponenteParaRenderizar={<MisRecetas />} />} />

						{/* Ruta para crear una receta (privada) */}
						<Route path="/crearReceta" element={<RutaPrivada ComponenteParaRenderizar={<CrearReceta />} />} />

						{/* Ruta para editar una receta específica (privada) */}
						<Route path="/editarReceta/:id" element={<RutaPrivada ComponenteParaRenderizar={<EditarReceta />} />} />

						{/* Ruta para eliminar una receta específica (privada) */}
						<Route path="/eliminarReceta/:id" element={<RutaPrivada ComponenteParaRenderizar={<EliminarReceta />} />} />

						{/* Ruta para manejar errores 404 - página no encontrada */}
						<Route path="*" element={<PaginaError />} />
					</Routes>
				</Suspense>
				{/* Componente Footer que contiene el pie de página */}
				<Footer />
			</ProviderUsuario>
		</Router>
	</>
);
