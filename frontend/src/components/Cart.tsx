import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { removeItem,updateQuantity,clearCart ,selectTotalPrice ,selectCartItems} from '../features/AddToCart/CartSlice'


export const Cart = () => {
  const dispatch = useDispatch();
 const cartItems = useSelector(selectCartItems);
  const TotalPrice = useSelector((state:RootState)=> selectTotalPrice(state))
   

  const handleRemoveItem = (id:number)=>{
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id:number , quantity:number)=>{
    dispatch(updateQuantity({id,quantity}))
  }

  const handleClearCart = ()=>{
    dispatch(clearCart())
  }
 console.log(cartItems.length);
 

 return (
    <div className='bg-gray-900 text-white'>
    <h2>Your Cart</h2>
     {cartItems.length === 0 ?(
      <p>Your Cart is empty</p>
     ):(
      <ul>
        {cartItems.map((item)=>{
          return <li key={item.id}>
            <div>
              {item.title}
            </div>
            <div>
              <img src={item.image} alt="image hai yaha per" className='h-20' />
            </div>
            <div>Price : ${item.price}</div>
          <div>
            Quantity : 
            <input
            type='number'
            value={item.quantity}
            onChange={(e)=> handleUpdateQuantity(item.id , Number(e.target.value))}
            className='text-black'
            />
            </div>
          
         <button onClick={()=>handleRemoveItem(item.id)}>Remove</button>
          </li>
        })}
      
        <h1>Total Price : ${TotalPrice}</h1>
      </ul>
     )}
      {cartItems.length > 0 && <button onClick={handleClearCart}>Clear Cart </button>}    
    </div>
  )
}

