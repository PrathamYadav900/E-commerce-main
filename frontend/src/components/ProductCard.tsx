import React, { useState } from 'react'
import { Product } from '../types/type'
import { useDispatch, useSelector } from 'react-redux'
import { addItem,  removeItem, selectCartItems, updateQuantity } from '../features/AddToCart/CartSlice'
import { RootState } from '../store/store'

interface ProductProps {
  product : Product
}


///F.C. Stands for Functions components
export const ProductCard :React.FC<ProductProps> = ({product}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state:RootState)=> selectCartItems(state));
  const existingItem = cartItems.find(item => item.id === product.id)
  const [incart , setIncart] = useState(!!existingItem)


const handleAddItem = ()=>{
  dispatch(addItem(product));
  console.log(product.description);
  
  setIncart(true);
}

const handleIncrement = ()=>{
  if(existingItem){
    dispatch(updateQuantity({id:product.id , quantity:existingItem.quantity +1 }))
  }
}

const handleDecrement = ()=>{
  if(existingItem && existingItem.quantity > 1 ){
    dispatch(updateQuantity({id:product.id , quantity : existingItem.quantity -1 }))
  }else if(existingItem && existingItem.quantity === 1){
           dispatch(removeItem(product.id))
           setIncart(false)
  }
};


    return (
    <div className='flex justify-center items-center flex-col border-4 border-gray-900 rounded-lg p-2'>
      <img src={product.image} alt={product.title} className='h-60 w-60 ' />
      <h2 className='text-xl text-white mt-1.5'>{product.title}</h2>
        <p className='mt-1.5'>Price:₹{product.price}</p>
        <button type="button" 
      className="mt-1.5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onClick={handleAddItem} 
      > Add to cart</button>  
    {incart ? ( 
      <div>
        <button onClick={handleDecrement} 
        className='text-white bg-gray-800 mr-5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
        >
          -
        </button>
        <span>{existingItem?.quantity}</span>
      <button onClick={handleIncrement}
      className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ml-5'
      >
        +
      </button>
      </div>
    )
  :(
    <div></div>
  )
  }
  </div>
  )
}
