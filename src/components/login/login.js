import React, { useState, useEffect } from 'react'
import logo from './assets/Logo.jpg'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

const initialState = {
    email: "",
    password: "",
  };

export default function Login() {

    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(error);
        error && toast.error(error);
      }, [error]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
          dispatch(login({ formValue,navigate, toast }));
        }
      };
      const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        console.log(formValue)
      };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={logo} alt="" />
        </div>

        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
                <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Username</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" value={email} name="email" onChange={onInputChange} />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" value={password} onChange={onInputChange} />
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <p>Forgot Password</p>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGNIN</button>
                
            </form>
        </div>
    </div>
  )
}