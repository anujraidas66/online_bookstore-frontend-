import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./components/RootLayout"
import Home from "./features/home/Home"
import Login from "./features/authentication/Login"
import Register from "./features/authentication/Register"
import AdminPanel from "./features/admin/AdminPanel"
import BookAddForm from "./features/admin/BookAddForm"
import BookEdit from "./features/admin/BookEdit"
import BookDetail from "./features/books/BookDetail"
import CheckOut from "./features/carts/CheckOut"


export default function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children: [
        {
          index:true,
          element:<Home/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<Register/>
        },

        {
          path:'admin-panel',
          element:<AdminPanel/>
        },

        {
          path:'books/:id',
          element:<BookDetail/>
        },

        {
          path: 'book-edit/:id',
          element:<BookEdit/>
        },

        {
          path: 'book-add',
          element:<BookAddForm/>
        },

        {
          path:'checkout',
          element:<CheckOut/>
        }
       
      ]
    }
  ])
  return <RouterProvider router={router} />
}
