import { Link } from "react-router-dom"
import Ratings from "./Ratings"
import { useState } from "react"

const Product = ({ product }) => {
  const [rating, setRating] = useState(product.ratings || 0)

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">

      {/* Clickable product */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image[0].url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />

        <h3 className="mt-2 font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm">
          {product.description}
        </p>
      </Link>

      {/* Rating Section */}
      <div className="flex items-center gap-4 mt-3">
        <Ratings
          value={rating}
          onRatingChange={(r) => setRating(r)}
        />

        
        <p className="text-gray-500 text-sm">
          {product.numOfReviews} reviews
        </p>
      </div>

      {/* Price + Button */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-xl font-bold text-green-700">
          ₹{product.price}
        </p>

        <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default Product