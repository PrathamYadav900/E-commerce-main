// import { AllProductsdata } from '../data/AllProductsdata'
import React, { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard"
import { Product } from "../types/type"
import axios from 'axios'
import ESkeleton from "../components/Skeleton";

const API_URL = import.meta.env.VITE_API_URL ;

interface AllProductsProp{
  products : Product[]
}

export const AllProducts:React.FC<AllProductsProp> = ({products}) => {
    return (
    <div className="flex flex-wrap justify-around items-center h-lvh">
    
    {products.map((product)=>(
      <ProductCard key={product.id} product={product}/> 
    ))}
    </div>
  )
}
// Making AllProduct components if i decide to use API Calls in the future and it also 
// helps with reusagebilty by passing product as a prop not directing mapping over AllProduct Data


export const ProductsPage = () => {
  const [product , setProduct] = useState([]); 
  const [loading , setloading] = useState(true);

   useEffect(()=>{
    const fetchProducts = async ()=>{
      try{
        const res = await axios.get(`${API_URL}/api/v1/product/bulk`,{
          headers :{
            Authorization : localStorage.getItem("token")
          }
        });
        console.log(res.data.AllProduct);
        setProduct(res.data.AllProduct)
      }
      catch(e){
        console.log(e,'error in ProductsPage')
       }finally{
        setloading(false)
       }
    }
fetchProducts()
   },[])

   if(loading)return <p>

{/* For other variants, adjust the size with `width` and `height` */}
<ESkeleton/>
</p>
  return (
    <div className='bg-black text-gray-200'>
        <AllProducts products={product}/>
    </div>
  )
}
