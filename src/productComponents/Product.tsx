import { useAppDispatch } from "../redux/hooks";
import { setCart } from "../redux/cart-slice";
import { addToCartApi } from "../utils/cartApi";

type ProductProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
};

export default function Product({
  id,
  image,
  title,
  price,
  description,
}: ProductProps) {

  const dispatch = useAppDispatch();

  async function handleAddToCart() {
    try {
      const updatedCart = await addToCartApi(id, 1);
      dispatch(setCart(updatedCart));
    } catch (error) {
      alert("Failed to add item");
    }
  }

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}