'use client'
import Header from "../../components/sections/Header"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { userApiDataI } from "@/app/types";
import { CiEdit } from 'react-icons/ci';

export default function Profile() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [userProfileData, setUserProfileData] = useState<userApiDataI>();
    const [editMode, setEditMode] = useState(false);

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

    const updateUserProfileData = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${userId.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                    email: e.target.email.value
                })
            });
            if (res.ok) {
                const userData = await res.json();
                setUserProfileData(userData);
                setEditMode(false);
            } else {
                setError("Erro ao atualizar usuário");
            }
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
            setError("Erro ao atualizar usuário.")
        }
    }


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
                            <MdError size={50} className="text-red-600" />
                        </div>
                    </>
                ) : (
                    <div className="bg-slate-50 min-h-[450px] min-w-[300px] rounded-lg flex flex-col items-center justify-around py-2">
                        {session?.user.id == userProfileData?.Id ? (
                            <div onClick={() => setEditMode(true)} className="relative w-fit h-fit group cursor-pointer">
                        <img src={userProfileData?.ProfileImage} className="w-[120px] rounded-xl object-cover group-hover:brightness-50" alt="" />

                        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300"><CiEdit size={30} color="white"/></div>
                        </div>
                        )
                     : (
                        <img src={userProfileData?.ProfileImage} className="w-[120px] rounded-xl" alt="" />
                     )}
                        <div className="flex flex-col items-center">
                            {editMode ? (
                                <form onSubmit={updateUserProfileData} className="flex flex-col gap-3">
                                    <input type="text" placeholder={userProfileData?.Name} required name="name" className="bg-slate-200 px-4 py-2 rounded-lg mt-5" />
                                    <input type="email" name="email" placeholder={userProfileData?.Email} required className="bg-slate-200 px-4 py-2 rounded-lg mt-2" />
                                    <button type="submit" className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-5">Save</button>
                                </form>
                            ) : (
                                <>
                                    <p className="text-2xl font-bold mt-5">{userProfileData?.Name}</p>
                                    <p className="mt-2">{userProfileData?.Email}</p>
                                </>
                            )}
                        </div>
                        {session?.user.id == userProfileData?.Id && (
                            <>
                            <button onClick={() => setEditMode(!editMode)} className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-5"><h2>{editMode ? "Apenas visualisar" : "Editar perfil"}</h2></button>
                        <button className="bg-red-500 text-slate-50 px-4 py-2 rounded-lg mt-2">Delete Account</button>
                        <button className="bg-mainColor text-slate-50 px-4 py-2 rounded-lg mt-2">Logout</button>
                        </>
                    )}
                    </div>
                )}
            </div>
        </>
    )
}
