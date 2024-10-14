import Header from "../components/sections/Header"
import { useSession } from "next-auth/react"

export default function Profile() {
    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-screen bg-gradient-to-b from-mainSecondColor to-mainColor'>
                <div className="bg-slate-50 min-h-[450px] min-w-[300px] rounded-lg flex flex-col items-center">
                    <div className="h-[150px] w-[150px] rounded-full bg-slate-300 mt-10"></div>
                    <p className="text-2xl font-bold mt-5">Username</p>
                    <p className="mt-2">Email</p>
                    <button className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-5">Edit Profile</button>
                    <button className="bg-red-500 text-slate-50 px-4 py-2 rounded-lg mt-2">Delete Account</button>
                    <button className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-2">Logout</button>
                </div>
            </div>
        </>
    )
}
