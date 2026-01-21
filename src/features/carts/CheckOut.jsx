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

  // Redirect when cart is empty
  useEffect(() => {
    if (carts.length === 0) {
      navigate("/")
    }
  }, [carts, navigate])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
      {/* ✅ Responsive grid: stack on small screens, side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10">
        
        {/* Cart Table */}
        <div className="w-full overflow-x-auto">
          <div className="[&>div]:rounded-sm [&>div]:border">
            <Table className="min-w-[500px] md:min-w-full">
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
                        <Avatar className="rounded-sm w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage
                            src={`${base}/${item.image}`}
                            alt={item.title}
                          />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {item.title}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-sm sm:text-base">{item.title}</div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="text-sm sm:text-base">{item.category}</TableCell>

                    {/* Quantity */}
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                          disabled={item.qty === 1}
                          onClick={() => handleRemove(item)}
                          variant="outline"
                          size="icon"
                          className="p-1 sm:p-2"
                        >
                          <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4"/>
                        </Button>

                        <span className="text-sm sm:text-base">{item.qty}</span>

                        <Button
                          disabled={item.qty === item.stock}
                          onClick={() => handleAdd(item)}
                          variant="outline"
                          size="icon"
                          className="p-1 sm:p-2"
                        >
                          <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4"/>
                        </Button>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="text-sm sm:text-base">
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
                            <Trash2Icon className="w-4 h-4 sm:w-5 sm:h-5"/>
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
        <div className="flex flex-col items-center md:items-start bg-gray-50 p-4 rounded-lg space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>

          <div className="space-y-2 w-full">
            {carts.map((item) => (
              <div key={item.id} className="flex justify-between text-sm sm:text-base">
                <span>{item.title}</span>
                <span>
                  {item.qty} × Rs.{item.price}
                </span>
              </div>
            ))}

            <p className="text-sm sm:text-base">Total Items: {carts.length}</p>

            <p className="font-semibold text-sm sm:text-base">
              Total Price: Rs.{" "}
              {carts.reduce((total, item) => total + item.price * item.qty, 0)}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

