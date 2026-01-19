
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
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { useRemoveBookMutation } from "../books/bookApi"
import { useSelector } from "react-redux";
import toast from "react-hot-toast"
import { Spinner } from "@/components/ui/spinner"
export function RemoveBook({id}) {
  const {user} = useSelector((state) => state.userSlice);
  const [removeBook, {isLoading}] = useRemoveBookMutation();
  const handleRemoveBook = async() => {
    try {
      await removeBook({id,token:user.token}).unwrap();
      toast.success("Book removed successfully");
    } catch (err) {
      toast.error(err.data.message);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
         <Button className={'bg-red-700'} disabled={isLoading} >
        
          {isLoading ? <Spinner/> : <TrashIcon/>}
         </Button> 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete 
            this book
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveBook} >Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
