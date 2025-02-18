import { ChangeEvent,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@npmuserhahaha/ecommerce-common/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ;

export function Signup() {
const navigate = useNavigate();
    const [postInputs,setpostInputs] = useState<SignupInput>({
    name : '',
    email : '', 
    password : ''
})
const OnSubmit = async ()=>{
    try{
  const res = await  axios.post(`${API_URL}/api/v1/user/signup`,postInputs);
  const jwt = res.data; 
  localStorage.setItem("token",jwt);
  navigate('/')
console.log('User signed up' , res.data)
}catch(e){
    console.log('error signing up ', e)
}
    
}
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-9">
                        <div className="text-3xl font-extrabold">
                          Signup
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput label="Name" placeholder="Pratham Yadav" onChange={(e)=>{
                            setpostInputs({
                                ...postInputs,
                                name : e.target.value
                            })
                        }}/>
                        <LabelledInput label="Email" placeholder="harkirat@gmail.com" onChange={(e)=>{
                            setpostInputs({
                                ...postInputs,
                                email:e.target.value
                            })
                        }}/>
                        <LabelledInput label="Password" type={"password"} placeholder="123456" 
                        onChange={(e)=>{
                            setpostInputs({
                                ...postInputs,
                                password:e.target.value
                            })
                        }}
                        />
                      
                        <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick={OnSubmit}
                        >Sign up</button>
                    </div>
                    <div>
                        Already have an account ? 
                       <Link to={'/signin'}>Sign In</Link>
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
    onChange : (e : ChangeEvent<HTMLInputElement>) =>void
}

function LabelledInput({ label, placeholder, type ,onChange }: LabelledInputType) {
    return <div>
        <label  className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input  type={type || "text"} id="first_name" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}