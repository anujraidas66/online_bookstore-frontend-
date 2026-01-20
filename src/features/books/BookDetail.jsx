import { useParams } from "react-router"
import { useGetBookQuery } from "./bookApi";
import { base } from "../../app/mainApi";
import AddToCart from "../carts/AddToCart";

export default function BookDetail() {
  const {id} = useParams();
  const {isLoading, error, data} = useGetBookQuery(id);

  if(isLoading) return <div>Loading...</div>;
  if(error) return <h1 className="text-pink-950">{error.data?.message}</h1>;

  return (
    <div className="max-w-7xl mx-auto mt-7 px-4 sm:px-6 md:px-8">
      {/* Grid changes for responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
        
        {/* Book Image */}
        <div className="flex justify-center md:justify-start">
          <img 
            src={`${base}/${data.book.image}`} 
            alt={data.book.title} 
            className="w-full max-w-sm sm:max-w-md md:max-w-full rounded-lg object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="space-y-4 sm:space-y-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">{data.book.title}</h1>
          <p className="text-zinc-500 text-sm sm:text-base">Price: Rs. {data.book.price}</p>
          <p className="text-zinc-500 text-sm sm:text-base">Stock: {data.book.stock}</p>
          <p className="text-zinc-700 text-sm sm:text-base">{data.book.description}</p>
          <hr className="border-zinc-300"/>
          
          <div>
            <AddToCart book={data.book}/>
          </div>
        </div>

      </div>
    </div>
  )
}


// import { useParams } from "react-router"
// import { useGetBookQuery } from "./bookApi";
// import { base } from "../../app/mainApi";
// import AddToCart from "../carts/AddToCart";

// export default function BookDetail() {
//       const {id} = useParams();
//     const {isLoading, error, data} = useGetBookQuery(id);
//     if(isLoading) return <div>Loading...</div>;
//     if(error) return <h1 className = "text-pink-950" >{error.data?.message}</h1>;
   
    
//     return (
//         <div className=" max-w-7xl mx-auto grid grid-cols-2 mt-7 gap-10">
//             <div>
//                 <img src={`${base}/${data.book.image}`} alt="book.image" />
//             </div>
//             <div className="space-y-5" >
//                 <h1>{data.book.title}</h1>
//                 <p className="text-zinc-500" >Price:- {data.book.price}</p>
//                 <p className="text-zinc-500" >Stock:- {data.book.stock}</p>
//                 <p className="text-zinc-700" >{data.book.description}</p>
//                 <hr/>
//                 <div>
//                     <AddToCart book={data.book}/>
//                 </div>
//             </div>
            
//         </div>
//     )
// }