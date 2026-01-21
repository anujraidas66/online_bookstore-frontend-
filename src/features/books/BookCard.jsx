import { useNavigate } from "react-router";
import { base } from "../../app/mainApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export default function BookCard({ book }) {
  const nav = useNavigate();

  return (
    <Card
      onClick={() => nav(`/books/${book._id}`)}
      className="pt-0 hover:scale-[103%] ease-in duration-75 delay-100 transition cursor-pointer h-full"
    >
      {/* Image */}
      <CardContent className="px-0">
        <img
          src={`${base}/${book.image}`}
          alt={book.title}  
          className="aspect-video h-60 rounded-t-xl"  // ✅ original image line
        />
      </CardContent>

      {/* Title & Description */}
      <CardHeader className="px-3 py-2 flex flex-col gap-1 h-full">
        <CardTitle className="text-sm sm:text-base md:text-lg font-semibold">{book.title}</CardTitle>
        <CardTitle className="text-sm sm:text-base md:text-lg text-gray-700">Rs. {book.price}</CardTitle>
        <CardDescription className="text-xs sm:text-sm md:text-base line-clamp-4 text-gray-600">
          {book.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}



