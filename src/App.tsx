import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import NavBar from './components/navBar/NavBar'
import Main from './components/main/Main'
import Provider from './components/provider/Provider'
import Product from './components/product/Product'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      <nav className="navbar navbar-dark bg-light d-flex justify-content-around p-1">
        <Link to="/" className="link-dark btn btn-secondary btn-lg active p-2">Main page</Link>
        <Link to="/provider" className="link-dark btn btn-secondary btn-lg active p-2">Provider</Link>
        <Link to="/product" className="link-dark btn btn-secondary btn-lg active p-2">Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/provider" element={<Provider/>} />
        <Route path="/product" element={<Product/>} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App
