import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import NavBar from './components/navBar/NavBar'
import Main from './components/main/Main'
import Provider from './components/provider/Provider'
import Product from './components/product/Product'
import Receipt from './components/receipt/Receipt'
import SignIn from './components/login/SignIn'
import LogIn from './components/login/LogIn'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import GoogleLogIn from './components/login/GoogleLogIn'
import LogOut from './components/login/LogOut'

function App() {

  const{user} = useSelector((state:RootState) => state.logged)

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      {user!==null?
      <nav className="navbar navbar-dark bg-light d-flex justify-content-around p-1">
        <Link to="/login">Log in</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/" className="link-dark btn btn-secondary btn-lg active p-2">Main page</Link>
        <Link to="/provider" className="link-dark btn btn-secondary btn-lg active p-2">Provider</Link>
        <Link to="/product" className="link-dark btn btn-secondary btn-lg active p-2">Product</Link>
        <Link to="/receipt" className="link-dark btn btn-secondary btn-lg active p-2">Receipt</Link>
        <Link to="/logOut" className="link-dark btn btn-secondary btn-lg active p-2">Log Out</Link>
      </nav>:
      <nav className="navbar navbar-dark bg-light d-flex justify-content-around p-1">
        <Link to="/login">Log in</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/loginGoogle">Login with Google</Link>
      </nav>
      }
      <Routes>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/loginGoogle" element={<GoogleLogIn />}/>
        <Route path="/logOut" element={<LogOut />}/>
        <Route path="/" element={<Main />} />
        <Route path="/provider" element={<Provider/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/receipt" element={<Receipt/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App
