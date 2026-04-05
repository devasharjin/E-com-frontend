import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Ratings from "../components/Ratings";
import { useSelector, useDispatch } from 'react-redux'

import { ShoppingCart, Plus, Minus, CheckCircle, MessageSquare, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../features/product/productSlice";
import { calculatediscount, formatDate } from "../utils/formatter";

const ProductDetails = () => {
  const { product } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [id, dispatch])

  const [userRating, setUserrating] = useState(0)

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageTitle title={product?.name || "Loading..."} />
      <Navbar />

      {/* MAIN SECTION */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-6 md:py-15 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-md bg-white">
            <img
              src={product?.image?.[0]?.url}
              alt="product"
              className="w-full h-70 md:h-110 object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm">

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold">
            {product?.name}
          </h2>

          {/* REVIEWS */}
          <div className="flex items-center gap-2">
            <Ratings value={product?.ratings} disabled={true} />
            <span className="text-gray-500 text-sm">
              {product?.reviews?.length || 0} reviews
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">
              ₹ {product?.price}
            </span>
            <span className="line-through text-gray-400">
              ₹ {product?.mrp}
            </span>
            <span className="text-sm text-red-500 font-medium">
              {calculatediscount(product?.price, product?.mrp)} % OFFER
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          {/* STOCK */}
          {product?.stock > 0 ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />
              <span className="font-medium">In Stock</span>
              <span className="text-gray-500">
                ({product?.stock} available)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <CheckCircle size={18} />
              <span className="font-medium">Out of Stock</span>
            </div>
          )}

          {/* QUANTITY + CART */}
          {product?.stock > 0 && (
            <div className="flex flex-wrap items-center gap-4 mt-3">

              <div className="flex items-center border rounded-lg overflow-hidden">
                <button className="p-2 hover:bg-gray-100">
                  <Minus size={16} />
                </button>

                <span className="px-5">1</span>

                <button className="p-2 hover:bg-gray-100">
                  <Plus size={16} />
                </button>
              </div>

              <button className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition">
                <ShoppingCart size={18} />
                Add to Cart
              </button>

            </div>
          )}

          {/* REVIEW INPUT */}
          <div className="mt-6">

            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={18} />
              <h3 className="text-md font-medium">Share your feedback</h3>
            </div>

            <div className="mb-3">
              <Ratings
                value={userRating}
                onRatingChange={(r) => setUserrating(r)}
              />
            </div>

            <textarea
              placeholder="Write your review..."
              className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              rows={3}
            />

            <button className="mt-3 bg-black text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-800">
              Post Review
            </button>

          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-10">
        <h3 className="text-2xl font-semibold mb-6">Customer Stories</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {product?.reviews?.map((rev, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition relative">

              {/* DATE TOP RIGHT */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                {formatDate(rev.createdAt)}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={rev.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold">{rev.name}</h4>
                  <Ratings value={rev.rating} disabled={true} />
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;