import { useParams } from "react-router"
import { useGetBookQuery } from "./bookApi";
import { base } from "../../app/mainApi";
import AddToCart from "../carts/AddToCart";

export default function BookDetail() {
      const {id} = useParams();
    const {isLoading, error, data} = useGetBookQuery(id);
    if(isLoading) return <div>Loading...</div>;
    if(error) return <h1 className = "text-pink-950" >{error.data?.message}</h1>;
   
    
    return (
        <div className=" max-w-7xl mx-auto grid grid-cols-2 mt-7 gap-10">
            <div>
                <img src={`${base}/${data.book.image}`} alt="book.image" />
            </div>
            <div className="space-y-5" >
                <h1>{data.book.title}</h1>
                <p className="text-zinc-500" >Price:- {data.book.price}</p>
                <p className="text-zinc-500" >Stock:- {data.book.stock}</p>
                <p className="text-zinc-700" >{data.book.description}</p>
                <hr/>
                <div>
                    <AddToCart book={data.book}/>
                </div>
            </div>
            
        </div>
    )
}
