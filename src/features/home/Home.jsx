import { useGetBooksQuery } from "../books/bookApi";
import BookCard from "../books/BookCard";

export default function Home() {
    const { isLoading, error, data } = useGetBooksQuery();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <h1 className="text-pink-950">{error}</h1>;

    return (
        <div className="p-4">
            <div className="grid gap-5
                            grid-cols-1      /* Mobile: 1 column */
                            sm:grid-cols-2   /* Small screens: 2 columns */
                            md:grid-cols-3   /* Medium screens: 3 columns */
                            lg:grid-cols-4   /* Large screens: 4 columns always */">
                {data.books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
}


// import { useGetBooksQuery } from "../books/bookApi";
// import BookCard from "../books/BookCard";

// export default function Home() {
//     const {isLoading,error,data} = useGetBooksQuery();
//     if(isLoading) return <div>Loading...</div>;
//     if(error) return <h1 className = "text-pink-950" >{error}</h1>
  
//     return (

//         <div>
            
//         <div className="grid grid-cols-4 gap-5 mt-4 items-start" >
//             {data.books.map((book) => (
//                 <BookCard key={book._id} book={book} />
//             ))}
//         </div>
//         </div>
//     )
// }