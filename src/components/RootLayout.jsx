import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";


export default function RootLayout() {
    return (
        <>
        <Header/>
        <main className="p-5">
        <Outlet/>
        </main>
        <Footer/>
        </>
    )
}
