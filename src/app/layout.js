import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";
import {StateContext} from "@/context/StateContext";
import {Toaster} from "react-hot-toast";


import './globals.css'


export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className={"layout"}>
            <StateContext>
                <header>
                    <Navbar/>
                </header>

                <main className={"main-container"}>
                    <Toaster/>
                    {children}
                </main>
            </StateContext>


            <footer>
                <Footer/>
            </footer>
        </div>
        </body>
        </html>
    )
}
