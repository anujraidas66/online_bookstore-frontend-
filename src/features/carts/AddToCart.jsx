import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./CartSlice";
import { useNavigate } from "react-router";

export default function AddToCart({book}) {
  const {carts} = useSelector((state) => state.cartSlice);
  const {user} = useSelector((state) => state.userSlice);
  const isExist = carts.find((cart) =>  cart.id === book._id);
  const [qty, setQty] = useState(isExist?.qty || 1);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty - 1);

  const handleCart = () => {
    dispatch(setCart({
      id: book._id,
      title: book.title,
      price: book.price,
      stock: book.stock,
      image: book.image,
      category: book.category,
      qty
    }));
    nav('/checkout');
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button 
          disabled={qty === 1} 
          onClick={decrement} 
          className="p-2 sm:p-3"
        >
          <MinusIcon className="w-4 h-4 sm:w-5 sm:h-5"/>
        </Button>

        <h3 className="text-base sm:text-lg">{qty}</h3>

        <Button 
          disabled={qty === book.stock} 
          onClick={increment}
          className="p-2 sm:p-3"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5"/>
        </Button>
      </div>

      {/* Add To Cart Button */}
      <Button 
        disabled={user?.role === 'admin' || !user} 
        onClick={handleCart} 
        className="bg-green-700 w-full text-sm sm:text-base py-2 sm:py-3"
      >
        Add To Cart
      </Button>
    </div>
  )
}

