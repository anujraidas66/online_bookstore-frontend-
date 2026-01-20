// import { NavLink } from "react-router";
// import DropDownProfile from "./DropDownProfile";
// import {Button} from "./ui/button"
// import { useSelector } from "react-redux";
// export default function Header() {
//     const {user} = useSelector((state) => state.userSlice);
    
//     return (
//         <div className="relative py-10 z-50 " >
//         <div className="bg-sky-950 px-5 flex justify-between items-end py-1 fixed top-0 right-0 left-0 " >
//         <div>
//              <i class="fa-solid fa-book"></i>
//         <h1 className=" text-2xl text-yellow-400 font-bold">
//             <div className=" text-xl ">Online</div>BookStore</h1>
//             </div>   
       

//         {user ? <DropDownProfile user={user} /> : <div className="space-x-5" >
//             <NavLink to={'/login'} >
//              <Button variant= "link" className={'text-[16px]'} >Login</Button>
//             </NavLink>
//             <NavLink to={'/signup'} >
//             <Button >Sign Up</Button>
//             </NavLink>
//         </div> }
//         </div>
//         </div>
//     )
// }


//main part //

// import { NavLink } from "react-router";
// import DropDownProfile from "./DropDownProfile";
// import { Button } from "./ui/button";
// import { useSelector } from "react-redux";

// export default function Header() {
//   const { user } = useSelector((state) => state.userSlice);

//   return (
//     <div className="relative py-10 z-50">
//       <div className="bg-sky-950 px-5 flex justify-between items-center py-2 fixed top-0 right-0 left-0">
//         {/* LOGO SECTION */}
//         <div className="flex items-center gap-3">
//           {/* Book Icon */}
//           <i className="fa-solid fa-book text-amber-400 text-5xl"></i>

//           {/* Text */}
//           <h1 className="text-yellow-400 font-serif leading-tight">
//             <span className="block text-lg ">Online</span>
//             <span className="text-xl">BookStore</span>
//           </h1>
//         </div>

//         {/* AUTH SECTION */}
//         {user ? (
//           <DropDownProfile user={user} />
//         ) : (
//           <div className="space-x-5">
//             <NavLink to="/login">
//               <Button variant="link" className="text-[16px]">
//                 Login
//               </Button>
//             </NavLink>
//             <NavLink to="/signup">
//               <Button>Sign Up</Button>
//             </NavLink>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// formilaty
import { NavLink } from "react-router";
import DropDownProfile from "./DropDownProfile";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="relative py-10 z-50">
      <div className="bg-sky-950 px-5 flex justify-between items-center py-2 fixed top-0 right-0 left-0">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-book text-amber-400 text-5xl"></i>
          <h1 className="text-yellow-400 font-serif leading-tight">
            <span className="block text-lg">Online</span>
            <span className="text-xl">BookStore</span>
          </h1>
        </div>

        {/* NAV TEXT (NOT CLICKABLE) */}
        <nav className="hidden md:flex items-center gap-8">
          <span className="text-white text-sm font-medium cursor-default">
            Home
          </span>
          <span className="text-white text-sm font-medium cursor-default">
            About
          </span>
          <span className="text-white text-sm font-medium cursor-default">
            Contact
          </span>
        </nav>

        {/* AUTH SECTION */}
        {user ? (
          <DropDownProfile user={user} />
        ) : (
          <div className="space-x-5">
            <NavLink to="/login">
              <Button variant="link" className="text-[16px] text-white">
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button>Sign Up</Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
