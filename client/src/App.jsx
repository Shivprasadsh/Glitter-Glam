
import './App.css'
import Navbar from '../src/compents/navbar'
import { Outlet } from 'react-router-dom'
import Footer from './compents/Footer'





function App() {


  return (
    <>
      <Navbar/>
    <Outlet/>
    <Footer/>
  
    </>
  )
}

export default App
