import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@npmuserhahaha/ecommerce-common/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ;


export function Signin() {
    const navigate = useNavigate();
    const [postInputs,setpostInputs] = useState<SigninInput>({
        email : "",
        password: ""
    })
 
   const  onSubmit =async ()=>{
    try{
    const res = await axios.post(`${API_URL}/api/v1/user/signin`,postInputs);
    const jwt = res.data ; 
    localStorage.setItem("token",jwt)
    navigate('/')
    }
    
    catch(e){
        alert("Inputs are incorrect")
    }
   }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign in
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput onChange={(e)=>{
                            setpostInputs({
                                ...postInputs , 
                            email : e.target.value   })
                        }} label="Username" placeholder="harkirat@gmail.com" />
                        <LabelledInput onChange={
                            (e)=>{
                                setpostInputs({
                                    ...postInputs , 
                                    password : e.target.value
                                })
                        } }label="Password" type={"password"} placeholder="123456" />

                        <button type="button" onClick={onSubmit} className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
                    </div>
                    <div> 
                        Create an account
                       <Link to={'/signup'}> SignUp </Link>
                    </div>
                </div>
            </a>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange : (e : ChangeEvent<HTMLInputElement>)=> void
}

function LabelledInput({ label, placeholder, type,onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange}  type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}