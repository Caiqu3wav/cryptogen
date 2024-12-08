/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import Header from '../../components/sections/Header'
import { LiaEyeSolid } from "react-icons/lia"
import { BsEyeSlashFill } from "react-icons/bs"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { defaultPfpImages } from '@/app/utils'

 export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [sucessMessage, setsucessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setError] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const randomPfp = defaultPfpImages[Math.floor(Math.random() * defaultPfpImages.length)];
 
  const handleSignup = async (e: any) => {
    e.preventDefault();
    

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          profileImage: randomPfp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setIsLoading(false);

      if (response && response.ok || response.status === 200) {
        setsucessMessage(true);
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000);
      }
    } catch (error: any) {
      setIsLoading(false);
      const errorText = error?.response?.data?.message || 'Erro ao fazer cadastro. Tente novamente.';
      console.error('Error signing up:', errorText);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  
   return (
     <>
        <Header/>
        <div className='flex justify-center items-center h-screen bg-gradient-to-b from-mainSecondColor to-mainColor'>
          <div className='bg-white rounded-xl flex items-center flex-col p-5'>
        {isLoading ? (
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mainColor'></div>
            </div>
          ) : isError ? (
            <div className='flex justify-center items-center flex-col'>
            <h1 className='text-mainColor text-2xl'>Something went wrong with your register</h1>
          </div>
          ) : sucessMessage ? (
            <div className='flex justify-center items-center flex-col'>
              <h1 className='text-mainColor text-2xl'>You have sucessed sign up!</h1>
              <p className='text-mainColor'>Redirecting to login...</p>
            </div>
          ) : 
             (
            <form className='flex flex-col items-center justify-center gap-3' onSubmit={handleSignup}>
            <h1 className='text-white'>Create your account</h1>
                  <label>Name:
                            <input className="rounded-lg bg-gray-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                                type="name"
                                name="name"
                                required
                            />
                        </label> 
                  <label>Email:
                            <input className="rounded-lg bg-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                required
                            />
                        </label>
                                    <label>
                      Password:
                            <input className="rounded-lg bg-gray-400"
                                type={!isVisible ? "password" : "text"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button onClick={() => setIsVisible(!isVisible)} style={{ backgroundColor: 'transparent' }} type="button" id="togglePassword">
                               {isVisible ? <BsEyeSlashFill /> : <LiaEyeSolid />}
                            </button>
                        </label>     
                        <label>Confirmar Senha: 
                            <input className='rounded-lg bg-gray-400'
                                type={!isVisible ? "password" : "text"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button onClick={() => setIsVisible(!isVisible)} style={{ backgroundColor: 'transparent' }} type="button">
                               {isVisible ? <BsEyeSlashFill /> : <LiaEyeSolid />}
                            </button>
                        </label>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <button type='submit'>Sign</button>
                    <p>Already have your account yet? Go to login: </p>
                     <Link href='/auth/login' className='text-blue-600'>Login</Link>
                     </form>
          )}
         </div>
        </div>
     </>
   )
 }