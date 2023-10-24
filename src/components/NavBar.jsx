import { Link } from "react-router-dom"
import { routes } from "../utils/routes"


const NavBar = () => {
  const { planner, cashFlow , client, configuration, dashboard, help } = routes
  return (
    <nav className="shadow-header">
      <ul className="flex items-start justify-between max-w-screen-xl mx-auto py-4">
        <li><Link to={planner}>Agenda</Link></li>
        <li><Link to={client}>Clientes</Link></li>
        <li><Link to={configuration}>Configuración</Link></li>
        <li><Link to={cashFlow}>Mov. de caja</Link></li>
        <li><Link to={dashboard}>Dashboard</Link></li>
        <li><Link to={help}>Ayuda</Link></li>
        <li><Link>Salir</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar