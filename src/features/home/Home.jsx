
import { useGetBooksQuery } from "../books/bookApi";
import BookCard from "../books/BookCard";

export default function Home() {
    const {isLoading,error,data} = useGetBooksQuery();
    if(isLoading) return <div>Loading...</div>;
    if(error) return <h1 className = "text-pink-950" >{error}</h1>
  
    return (

        <div>
            <div>
               
            </div>
            
        <div className="grid grid-cols-4 gap-5 mt-4 items-start" >
            {data.books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
        </div>
    )
}