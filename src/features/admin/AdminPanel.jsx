import { useGetBooksQuery } from "../books/bookApi";
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { base } from "../../app/mainApi";
import { Button } from "../../components/ui/button";
import { EditIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { RemoveBook } from "./RemoveBook";

export default function AdminPanel() {
  const nav= useNavigate();
    const {isLoading,error,data} = useGetBooksQuery();
    if(isLoading) return <div>Loading...</div>;
    if(error) return <h1 className = "text-pink-950" >{error}</h1>
    
    return (
    
    <div>

      <div className="mb-4" >
      <Button
      onClick={() => nav('/book-add')}
      className={'bg-green-700'}>Add New Book</Button>
      </div>

    <div className='w-full'>
      <div className='[&>div]:rounded-sm [&>div]:border'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Book Title</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.books.map(item => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src={`${base}/${item.image}`} alt={item.image} />
                    </Avatar>
                    <div className='font-medium'>{item.title}</div>
                  </div>
                </TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                    <Button onClick={() => nav(`/book-edit/${item._id}`)} >
                        <EditIcon/>
                    </Button>
                </TableCell>
                <TableCell>

                  <RemoveBook id={item._id} />
                    
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
        </div>
    )
}
