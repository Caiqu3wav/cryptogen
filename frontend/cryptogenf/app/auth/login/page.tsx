/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client' 
import React, { useState, useEffect } from 'react'
import Header from '../../components/sections/Header'
import { LiaEyeSolid } from "react-icons/lia"
import { BsEyeSlashFill } from "react-icons/bs"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

 export default function Login() {
  const [loginError, setLoginError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { status: sessionStatus } = useSession();

 useEffect(() => {
      setInterval(() => {
        if (sessionStatus === "authenticated") {
          router.replace("/");
      }
      }, 7000);
  }, [sessionStatus, router]);
  
  const isValidEmail = (email: any) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
  };

  const handleLogin = async (e: any) => {
      e.preventDefault();
      const email = e.target[0].value;
    const password = e.target[1].value;
    if (!isValidEmail(email)) {
      setLoginError("Email inválido");
        return;
    }
    if (!password || password.length < 8) {
        setLoginError("Senha inválida");
        return;
    }

    setIsLoading(true);
      try {
          const res = await signIn("credentials", {
              redirect: false,
              email,
              password,
              callbackUrl: '/'
          });
          console.log("Sign in Response: ",res);
          if (!res || res.ok !== true) {
              setLoginError("Email ou senha inválidos");
          } else {
          setSuccessMessage("Usuário logado com sucesso!");
        }
          } catch (error: any) {
                setLoginError("Email or password unmatch");
                console.error("Sign in Error: ", error)
            } finally {
              setIsLoading(false);
            }
        };
   return (
     <>
        <Header/>
        <div className='flex justify-center items-center h-screen bg-gradient-to-b from-mainSecondColor to-mainColor'>
        {isLoading ? (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        ) : (
        <form className='flex flex-col bg-gray-500 bg-opacity-45 rounded-lg
         items-center justify-center w-[500px] min-h-[400px] gap-3' onSubmit={handleLogin}>
          <h1 className='text-white'>Enter your account</h1>
          <label>Email:
                    <input className="rounded-lg"
                        type="email"
                        name="email"
                        required
                    />
                </label>            <label>
              Password:
                    <input className="rounded-lg"
                        type={!isVisible ? "password" : "text"}
                        name="password"
                        required
                    />
                    <button onClick={() => setIsVisible(!isVisible)} style={{ backgroundColor: 'transparent' }} type="button" id="togglePassword">
                       {isVisible ? <BsEyeSlashFill /> : <LiaEyeSolid />}
                    </button>
                </label>     
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                       <button type='submit'>Login</button>
            <p>Don't have your account yet? Go to signup: </p> <a href="/auth/register" className='text-white'>Register</a>	
        </form>
         )}
        </div>
     </>
   )
  }