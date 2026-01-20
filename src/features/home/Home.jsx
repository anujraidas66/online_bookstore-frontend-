// import { useGetBooksQuery } from "../books/bookApi";
// import BookCard from "../books/BookCard";

// export default function Home() {
//     const { isLoading, error, data } = useGetBooksQuery();
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <h1 className="text-pink-950">{error}</h1>;

//     return (
//         <div className="py-8">
//             <div className="grid gap-5
//                             grid-cols-1      /* Mobile: 1 column */
//                             sm:grid-cols-2   /* Small screens: 2 columns */
//                             md:grid-cols-3   /* Medium screens: 3 columns */
//                             lg:grid-cols-4   /* Large screens: 4 columns always */">
//                 {data.books.map((book) => (
//                     <BookCard key={book._id} book={book} />
//                 ))}
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useGetBooksQuery } from "../books/bookApi";
import BookCard from "../books/BookCard";

export default function Home() {
  const { isLoading, error, data } = useGetBooksQuery();
  const [currentIndex, setCurrentIndex] = useState(0); // track which image is shown

  if (isLoading) return <div>Loading...</div>;
  if (error) return <h1 className="text-pink-950">{error}</h1>;

  // Images for the clickable carousel
  const carouselImages = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  ];

  return (
    <div className="space-y-10">

      {/* ===== MAIN IMAGE ===== */}
      <div className="w-full relative">
        <img
          src={carouselImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-72 md:h-96 object-cover rounded-xl"
        />

        {/* ===== THUMBNAILS ABOVE IMAGE ===== */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {carouselImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer
                ${currentIndex === index ? "border-amber-400" : "border-white/30"}`}
              onClick={() => setCurrentIndex(index)} // click to change main image
            />
          ))}
        </div>
      </div>

      {/* ===== BOOK GRID ===== */}
      <div
        className="grid gap-5
                   grid-cols-1
                   sm:grid-cols-2
                   md:grid-cols-3
                   lg:grid-cols-4"
      >
        {data.books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}



