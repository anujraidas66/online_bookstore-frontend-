
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik } from "formik"
import * as Yup from 'yup'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { useUpdateBookMutation } from "../books/bookApi"
import { base } from "../../app/mainApi"
import toast from "react-hot-toast"


const valSchema = Yup.object({
  title: Yup.string().min(4).required(),
  author: Yup.string().min(4).required(),
  description: Yup.string().min(10).required(),
  price: Yup.string().required(),
  stock: Yup.string().required(),
  category: Yup.string().required(),
  image: Yup.mixed()
    .test('fileType', 'Unsupported File Format', (val) => {
      if(!val) return true
      return val && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(val.type);
    })
    .test('fileSize', 'file is too large', (val) => {
      if(!val) return true
      return val && val.size <= 5 * 1024 * 1024;
    })
});

export default function BookEditForm({book}) {
  const [updateBook,{isLoading}] = useUpdateBookMutation();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Book Create</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              title: book.title,
              author: book.author,
              price: book.price,
              stock: book.stock,
              category: book.category,
              description: book.description,
              image: '',
              imageReview: book.image,
            }}

            onSubmit={async (val) => {
              try {
                const formData = new FormData();
                formData.append('title', val.title);
                formData.append('price', val.price);
                formData.append('stock', val.stock);
                formData.append('author', val.author);
                formData.append('category', val.category);
                formData.append('description', val.description);
                if(val.image){
                  formData.append('image', val.image);
                }
                await updateBook({
                  token: user.token,
                  body: formData,
                  id:book._id
                }).unwrap();
                toast.success('Book updated successfully');
                nav(-1);
              } catch (err) {
                toast.error(err.data.message);
              }

            }}
             validationSchema={valSchema}
          >
            {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">

                  <div className="grid gap-2">
                    <Label htmlFor="title">Book Title</Label>
                    <Input
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      id="title"
                      type="text"
                      placeholder="book title"
                    />
                    {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="author">Author Name</Label>
                    <Input
                      name="author"
                      onChange={handleChange}
                      value={values.author}
                      id="author"
                      type="text"
                      placeholder="John Doe"
                    />
                    {touched.author && errors.author && <p className="text-red-500">{errors.author}</p>}
                  </div>
                 
                 <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      name="price"
                      onChange={handleChange}
                      value={values.price}
                      id="price"
                      type="number"
                      placeholder="Book price"
                    />
                    {touched.price && errors.price && <p className="text-red-500">{errors.price}</p>}
                  </div>


                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      name="stock"
                      onChange={handleChange}
                      value={values.stock}
                      id="stock"
                      type="number"
                      placeholder="Book stock"
                    />
                    {touched.stock && errors.stock && <p className="text-red-500">{errors.stock}</p>} 
                  </div>

                   <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      name="category"
                      onChange={handleChange}
                      value={values.category}
                      id="category"
                      type="text"
                      placeholder="Book Category"
                    />
                    {touched.category && errors.category && <p className="text-red-500">{errors.category}</p>} 
                  </div>


                    <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      id="description"
                      type="text"
                      placeholder="Book Description"
                    />
                    {touched.description && errors.description && <p className="text-red-500">{errors.description}</p>}
                  </div>

                
                 
                  <div className="grid gap-2">
                    <Label htmlFor="image">Select an image</Label>
                    <Input
                      name="image"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue('imageReview', URL.createObjectURL(file));
                        setFieldValue('image', file);
                      }}

                      id="image"
                      type="file"

                    />
                    {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
                    {values.imageReview && !errors.image && <img src=
                    {!values.image ? `${base}/${values.imageReview}` : values.imageReview} alt="" />}

                  </div>

                  {isLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                    <Spinner />
                    Submit
                  </Button> : <Button type="submit" className="w-full mt-5">
                    Submit
                  </Button>}

                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}
