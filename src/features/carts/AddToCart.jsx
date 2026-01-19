import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./CartSlice";
import { useNavigate } from "react-router";

export default function AddToCart({book}) {
    const {carts} = useSelector((state) => state.cartSlice);
    const isExist = carts.find((cart) =>  cart.id === book._id);
    const [qty, setQty] = useState(isExist?.qty || 1);
    const dispatch = useDispatch();
    const increment = () => setQty(qty + 1)
    const decrement = () => setQty(qty - 1)
    const nav =  useNavigate();
    const handleCart = () => {
        dispatch(setCart({
            id:book._id,
            title:book.title,
            price:book.price,
            stock:book.stock,
            image:book.image,
            category:book.category,
            qty
        }));
        nav('/checkout');
    }
    return (
        <div className="space-y-5" >
            <div className="flex gap-4 ">
            <Button disabled={qty == 1} onClick={decrement}  >
                <MinusIcon/>
            </Button>
            <h3>{qty}</h3>
             <Button disabled={qty === book.stock} onClick={increment}>
                <PlusIcon/>
            </Button>
            </div>

            <Button 
            onClick={handleCart}
            className={'bg-green-700'} >Add To Cart</Button>
           
        </div>
    )
}
