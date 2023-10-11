import ProductIcon from "@assets/icons/product-icon";
import cn from "classnames";

const ProductButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Edit Button"
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 transition duration-200 text-base text-opacity-50 focus:outline-none  hover:text-opacity-100 rounded-full",
        className
      )}
    >
      <ProductIcon color={color} />
    </button>
  );
};

export default ProductButton;
