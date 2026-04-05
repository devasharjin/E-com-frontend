import { Star } from "lucide-react"
import { useEffect, useState } from "react"

const Ratings = ({
  value = 0,
  onRatingChange,
  disabled = false,
  showValue = true
}) => {

  const [rating, setRating] = useState(value)
  const [hover, setHover] = useState(0)

  // Sync when parent value changes
  useEffect(() => {
    setRating(value)
  }, [value])

  const handleClick = (star) => {
    if (disabled) return

    setRating(star)
    onRatingChange?.(star)
  }

  return (
    <div className="flex gap-2">
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hover ? star <= hover : star <= rating

        return (
          <Star
            key={star}
            size={22}
            className={`transition-all duration-200
              ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }
              ${disabled ? "cursor-default" : "cursor-pointer"}
            `}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(0)}
            onClick={() => handleClick(star)}
          />
        )
      })}
    </div>
    <p className="text-sm font-medium">{rating.toFixed(0)}/5</p>
    </div>
  )
}

export default Ratings