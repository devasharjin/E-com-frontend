import { Menu, Search, ShoppingBag, ShoppingCart, X} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery,setSearchQuery]=useState("")
  const isAuthorised = false
  
  const cartCount = 3
  const navigate=useNavigate()

  const handleSubmit = (e) => {
  e.preventDefault()
  if(searchQuery.trim()){
    navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`)
  }else{
    navigate('/products')
  }
  setSearchQuery("")
}

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* TOP BAR */}
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-700 font-bold text-lg md:text-xl"
        >
          <ShoppingBag size={26} />
          Shopping Hub
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 font-semibold">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/contacts" className="hover:text-blue-600">Contact</Link>
          <Link to="/about-us" className="hover:text-blue-600">About</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DESKTOP SEARCH */}
          <form onSubmit={handleSubmit} className="hidden md:flex items-center border rounded-md px-2">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              className="outline-none px-2 py-1"
              onChange={(e)=>{setSearchQuery(e.target.value)}}
            />
            <button type="submit">
              <Search size={18} />
            </button>
          </form>

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={26} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* AUTH BUTTON — DESKTOP */}
          {isAuthorised ? (
            <button className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-md">
              Profile
            </button>
          ) : (
            <button onClick={()=>{navigate('/register')}} className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-md">
              Register
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* ⭐ DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t px-6 py-4 flex flex-col gap-4 font-semibold">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/contacts" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/about-us" onClick={() => setOpen(false)}>About</Link>

          <hr />

          {!isAuthorised && (
            <button
              onClick={() => {
                setOpen(false)
                navigate('/register')
              }}
              className="bg-blue-700 text-white py-2 rounded-md"
            >
              Register
            </button>
          )}

        </div>
      )}
    </header>
  )
}

export default Navbar