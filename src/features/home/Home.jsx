import { useState } from "react";
import { useGetBooksQuery } from "../books/bookApi";
import BookCard from "../books/BookCard";

export default function Home() {
  const { isLoading, error, data } = useGetBooksQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <h1 className="text-pink-950 text-center">{error.data?.message}</h1>;
  console.log(data);

  // Carousel images
  const carouselImages = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  ];

  return (
    <div className="space-y-12">

      
      <div className="relative w-full overflow-hidden rounded-xl">
        <img
          src={carouselImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-[75vh] md:h-[80vh] object-cover"
        />

        {/* Thumbnails */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 p-2 rounded-lg">
          {carouselImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-14 h-14 sm:w-16 sm:h-16
                object-cover rounded-md cursor-pointer
                border-2 transition
                ${
                  currentIndex === index
                    ? "border-amber-400 scale-105"
                    : "border-white/40 hover:border-white"
                }
              `}
            />
          ))}
        </div>
      </div>

   
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        ">
        {data.books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

    </div>
  );
}




