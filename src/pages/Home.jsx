import Navbar from "../components/Navbar"
import ImageSlider from "../components/ImageSlider"
import Product from "../components/Product"
import Footer from "../components/Footer"
import PageTitle from "../components/PageTitle"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProducts } from "../features/product/productSlice"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { removeError } from "../features/product/productSlice"

const Home = () => {

  const {products,productCount,loading,error}=useSelector((state)=>{
           return state.product})
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getProducts({keyword:""}))
  },[dispatch])

  useEffect(()=>{
    if(error){
    toast.error(error)
    dispatch(removeError())
    }
  },[dispatch,error])
 
  return (
    loading?<Loader/>:
    <>
      <PageTitle title="Home |  E-commerce"/>
      <Navbar />

      {/* Hero Slider */}
      <ImageSlider />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
          Latest Collections
        </h2>

        {/* Responsive Product Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        ">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Home