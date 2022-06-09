import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import Main from './components/Main/Main'
import Provider from './components/Provider/Provider'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      <nav className="navbar navbar-dark bg-light d-flex justify-content-around p-1">
        <Link to="/" className="link-dark btn btn-secondary btn-lg active p-2">Main page</Link>
        <Link to="/provider" className="btn btn-secondary btn-lg active p-2">Provider</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/provider" element={<Provider/>} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App
