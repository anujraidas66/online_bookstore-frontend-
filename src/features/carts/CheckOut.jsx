import { useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar"
import { base } from "../../app/mainApi"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button"
import { removeCart, setCart } from "./CartSlice"
import { useNavigate } from "react-router"

export default function CheckOut() {
  const { carts } = useSelector((state) => state.cartSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAdd = (item) =>
    dispatch(setCart({ ...item, qty: item.qty + 1 }))

  const handleRemove = (item) =>
    dispatch(setCart({ ...item, qty: item.qty - 1 }))

  const handleRemoveItem = (item) => {
    dispatch(removeCart(item))
  }

  // ✅ Redirect when cart becomes empty
  useEffect(() => {
    if (carts.length === 0) {
      navigate("/")
    }
  }, [carts, navigate])

  return (
    <div>
      <div className="grid grid-cols-[1.4fr_1fr]">
        <div className="w-full">
          <div className="[&>div]:rounded-sm [&>div]:border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-0">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {carts.map((item) => (
                  <TableRow key={item.id}>
                    {/* Product */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="rounded-sm">
                          <AvatarImage
                            src={`${base}/${item.image}`}
                            alt={item.title}
                          />
                          <AvatarFallback className="text-xs">
                            {item.title}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{item.title}</div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>{item.category}</TableCell>

                    {/* Quantity */}
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <Button
                          disabled={item.qty === 1}
                          onClick={() => handleRemove(item)}
                          variant="outline"
                          size="icon"
                        >
                          <MinusIcon />
                        </Button>

                        <span>{item.qty}</span>

                        <Button
                          disabled={item.qty === item.stock}
                          onClick={() => handleAdd(item)}
                          variant="outline"
                          size="icon"
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      Rs. {item.price * item.qty}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <Trash2Icon />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This item will be removed from your cart.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveItem(item)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex items-center flex-col">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="space-y-4 mt-4">
            {carts.map((item) => (
              <div key={item.id} className="flex justify-between gap-14">
                <span>{item.title}</span>
                <span>
                  {item.qty} × Rs.{item.price}
                </span>
              </div>
            ))}

            <p>Total Items: {carts.length}</p>

            <p className="font-semibold">
              Total Price: Rs.{" "}
              {carts.reduce(
                (total, item) => total + item.price * item.qty,
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
