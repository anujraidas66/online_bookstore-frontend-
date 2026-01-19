import { useParams } from "react-router"
import { useGetBookQuery } from "../books/bookApi";
import BookEditForm from "./BookEditForm";


export default function BookEdit(){
    const {id} = useParams();
    const {isLoading,error,data} = useGetBookQuery(id);
    if(isLoading) return <div>Loading...</div>;
    if(error) return <h1 className = "text-pink-950" >{error}</h1>
    
    return(
        <>
            <h1 className = "text-2xl  font-bold" >Book Edit</h1>
            <BookEditForm book={data?.book}/>
        </>
    )
}