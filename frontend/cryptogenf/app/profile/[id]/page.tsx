'use client'
import Header from "../../components/sections/Header"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { userApiDataI } from "@/app/types";

export default function Profile() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [userProfileData, setUserProfileData] = useState<userApiDataI>();

    const pathParts = pathname.split('/');
    const userId = pathParts[pathParts.length - 1];

    useEffect(() => {

    const getUserProfileData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${userId.toString()}`);
            if (res.ok) {
                const userData = await res.json();
                console.log(userData);
                setUserProfileData(userData);
            } else {
                setError("Erro ao encontrar usuário");
            }
        } catch (err) {
            console.error("Erro ao encontrar usuário:", err);
            setError("Erro ao Encontrar usuário.")
        } finally {
            setLoading(false);
        }
    };
    getUserProfileData();
}, [userId]);

    
    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-screen bg-gradient-to-b from-mainSecondColor to-mainColor'>
            {loading ? (
                      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            ) : error ? (
                <>
                <div className="flex flex-col items-center gap-3">
                <p>{error}</p>
                <MdError size={50} className="text-red-600"/>
                </div>
                </>
            ) : (
                <div className="bg-slate-50 min-h-[450px] min-w-[300px] rounded-lg flex flex-col items-center">
                    <div className="h-[150px] w-[150px] rounded-full bg-slate-300 mt-10"></div>
                    <p className="text-2xl font-bold mt-5">{userProfileData?.Name}</p>
                    <p className="mt-2">{userProfileData?.Email}</p>
                    {session?.user.id == userProfileData?.Id && (
                    <button className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-5">Edit Profile</button>
                )}
                    <button className="bg-red-500 text-slate-50 px-4 py-2 rounded-lg mt-2">Delete Account</button>
                    <button className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-2">Logout</button>
                </div>
                          )}
            </div>
        </>
    )
}
