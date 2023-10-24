import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import { routes } from './utils/routes'
import Agenda from './components/Agenda'

function App() {
  const { planner } = routes
  return (
    <>
      <Header/>
      <NavBar/>
      <Routes>
        <Route path={planner} element={<Agenda/>} />
        <Route path='/' element={<div className='bg-black'>HOMEEEEEEEEEE</div>} />
      </Routes>
    </>
  )
}

export default App
