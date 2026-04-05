import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useEffect } from "react";
import { getProducts, removeError } from "../features/product/productSlice";
import toast from "react-hot-toast";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const Products = () => {
    const {
        products = [],
        productCount = 0,
        loading,
        error,
        resultPerPage = 8
    } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page"), 10) || 1;

    const totalPages = Math.ceil(productCount / resultPerPage);

    // ✅ Pagination
    const handlePageChange = (pageNumber) => {
        if (pageNumber === page) return;

        const params = new URLSearchParams(location.search);

        if (pageNumber === 1) {
            params.delete("page");
        } else {
            params.set("page", pageNumber);
        }

        navigate(`?${params.toString()}`);
    };

    // ✅ Category
    const handleCategoryChange = (cat) => {
        const params = new URLSearchParams(location.search);

        if (cat === category) return;

        if (cat === "All") {
            params.delete("category");
        } else {
            params.set("category", cat);
        }

        params.delete("page");

        navigate(`?${params.toString()}`);
    };

    // ✅ Fetch
    useEffect(() => {
        dispatch(getProducts({ keyword, page, category }));
    }, [dispatch, keyword, page, category]);

    // ✅ Error Handling (FIXED)
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeError());
        }
    }, [dispatch, error]);

    const categories = [
        "All",
        "Dress",
        "Electronics",
        "Kitchen",
        "Toys",
        "Sports",
        "Appliances",
        "Beauty",
    ];

    return loading ? (
        <Loader />
    ) : (
        <div className="bg-gray-50 min-h-screen">
            <PageTitle title="Products" />
            <Navbar />

            <div className="max-w-7xl mx-auto px-3 md:px-4 py-6 md:py-8">

                {/* MOBILE CATEGORY */}
                <div className="md:hidden mb-4 pb-6 overflow-x-auto no-scrollbar">
                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm shadow-sm active:scale-95 ${
                                    category === cat
                                        ? "bg-black text-white"
                                        : "bg-white text-gray-600"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* SIDEBAR */}
                    <div className="hidden md:block bg-white shadow-md rounded-2xl p-5 h-fit sticky top-24">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                            Categories
                        </h3>

                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-3 py-2 rounded-lg cursor-pointer transition ${
                                        category === cat
                                            ? "bg-black text-white"
                                            : "hover:bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PRODUCTS */}
                    <div className="md:col-span-3">

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg md:text-xl font-semibold">
                                Our Products
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {productCount} products
                            </p>
                        </div>

                        {/* EMPTY STATE */}
                        {products.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-60 text-gray-500">
                                <p className="text-lg font-medium">No Products Found</p>
                                <span className="text-sm">Try changing filters</span>
                            </div>
                        )}

                        {/* GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <Pagination
                            currentPage={page}
                            onPageChange={handlePageChange}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Products;