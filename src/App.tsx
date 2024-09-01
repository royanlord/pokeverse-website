import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './Layouts/MainLayout'
import { DetailPokemon } from './Layouts/DetailPokemon'
import { DetailPokemonProvider } from './context/DetailPokemonContext'
// import Card from './components/Card'

function App() {

  return (
    <DetailPokemonProvider>
      <Routes>
        <Route path='/' element={<MainLayout />} />
        <Route path='/:name/:id' element={<DetailPokemon />} />
      </Routes>
    </DetailPokemonProvider>
  )
}

export default App
