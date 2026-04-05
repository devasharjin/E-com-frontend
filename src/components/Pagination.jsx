import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react"
import { useSelector } from "react-redux"

const Pagination = ({ currentPage, onPageChange }) => {
  const { products, totalPage } = useSelector((state) => state.product)

  const getPageNumbers = () => {
    const pageNumbers = []
    const pageWindow = 2

    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPage, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  if (!products || products.length === 0 || totalPage <= 1) return null

  return (
    <div className="flex flex-col items-center gap-3 mt-6">

      <div className="flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-xl">

        {/* start & prev */}
        <div className="flex gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronsLeft size={18} />
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* page numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === number
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* next & last */}
        <div className="flex gap-1">
          <button
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>

          <button
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(totalPage)}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronsRight size={18} />
          </button>
        </div>

      </div>

      <p className="text-sm text-gray-500 mb-2">
        Page {currentPage} of {totalPage}
      </p>

    </div>
  )
}

export default Pagination