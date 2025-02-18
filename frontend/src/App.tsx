import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Home } from './pages/Home';
import Ecommerce from "./assets/images/Ecommerce.png"
import { useSelector } from 'react-redux';
import {  selectTotalQuantity } from './features/AddToCart/CartSlice';

const App: React.FC = () => {
  const cartlength  = useSelector(selectTotalQuantity)
  console.log(`Cart items are ${cartlength}` );
  console.log(cartlength);
  return (
    
    <Router>
      {/* <Appbar/> */}
      <div>
        <nav className="bg-rose-900 p-4">
     
          <ul className="grid grid-cols-6 gap-4">

          <li className='col-start-1'>
             <img src={Ecommerce} alt="" className='h-20'/>
          </li>
       <div className='col-end-7 col-span-2 flex justify-around items-center'>
            <li >
              <Link to="/" className="text-white hover:text-gray-400 text-2xl">
                Home
              </Link>
            </li>
            <li >
            <Link to="/store" className="text-white hover:text-gray-400 text-2xl">
            Store
            </Link>  
            </li>
           
            <li>
              <Link to="/cart" className="text-white hover:text-gray-400 text-2xl">
                Cart ({cartlength})
              </Link>
            </li>
            </div>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/store' element={<ProductsPage />}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          {/* <Route path='/dashboard' element={<DashBoard/>}/> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
