import { ChangeEvent } from "react";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function EditProduct() {
const [postInputs,setpostInputs] =useState({
    title : "",
    description : "",
    price : 0,
    image : ""
})

const OnSubmit = async ()=>{
    try{
        const res = await axios.post(`${API_URL}/api/v1/admin/product`,postInputs);
        console.log('Product added',res.data)
    }catch(e){
        console.log(`API URL: ${API_URL}/api/v1/admin/product`);

        console.log(
             `Post inputs are `,JSON.stringify(postInputs),
            `Error while adding product to store ${e}`
        );
    }
}

    return (
    <>
  <div className="flex justify-center flex-col p-9" >
<LabelledInput label="Title" placeholder="title" type="text"  
      onChange={(e)=>{
        setpostInputs({
            ...postInputs,
            title:e.target.value
        })
    }}
    />
<LabelledInput label="Description" placeholder="description" type="text" 
    onChange={(e)=>{
        setpostInputs({
            ...postInputs,
            description:e.target.value
        })
    }}
    />
<LabelledInput label="Price" placeholder="price" type="text" onChange={(e)=>{
    setpostInputs({
        ...postInputs,
        price:parseInt(e.target.value)
    })
}}/>
<LabelledInput label="image" placeholder="image" type="text" onChange={(e)=>{setpostInputs({
    ...postInputs,
    image:e.target.value
})}}/>
<button type="button" 
className="m-9 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
onClick={OnSubmit}
>Add to Store</button>
  </div>
  </>)
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