import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import { routes } from './utils/routes'
import Agenda from './views/Agenda'
import Configuration from './views/Configuration'

function App() {
  const { planner, configuration } = routes
  return (
    <>
      <Header/>
      <NavBar/>
      <Routes>
        <Route path={planner} element={<Agenda accountownerid={84} accountid={84}/>} />
        <Route path={configuration} element={<Configuration accountid={84}/>} />
      </Routes>
    </>
  )
}

export default App
