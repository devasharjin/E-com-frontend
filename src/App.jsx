import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Contacts from "./pages/Contacts"
import ProductDetails from "./pages/ProductDetails"
import About from "./pages/About"
import Products from "./pages/Products"
import Register from "./user/Register"


const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/contacts" element={<Contacts/>}/>
    <Route path="/about-us" element={<About/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route path="/products" element={<Products/>}/>
  </Routes>
  )
}

export default App