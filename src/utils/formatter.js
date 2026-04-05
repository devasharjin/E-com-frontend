export const calculatediscount=(price,mrp)=>{
    return Math.ceil(((mrp-price)/mrp)*100)
}

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};