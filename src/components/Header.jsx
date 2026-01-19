import { NavLink } from "react-router";
import DropDownProfile from "./DropDownProfile";
import {Button} from "./ui/button"
import { useSelector } from "react-redux";
export default function Header() {
    const {user} = useSelector((state) => state.userSlice);
    
    return (
        <div className="bg-gray-300 px-5 flex justify-between items-end py-2" >
        <h1 className="text-[30px] font-bold ">BookStore</h1>

        {user ? <DropDownProfile user={user} /> : <div className="space-x-5" >
            <NavLink to={'/login'} >
             <Button variant= "link" className={'text-[16px]'} >Login</Button>
            </NavLink>
            <NavLink to={'/signup'} >
            <Button >Sign Up</Button>
            </NavLink>
        </div> }
        </div>
    )
}
