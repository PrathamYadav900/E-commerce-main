import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  removeItem,
  updateQuantity,
  clearCart,
  selectTotalPrice,
  selectCartItems,
} from "../features/AddToCart/CartSlice";
import ESkeleton from "./Skeleton";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const TotalPrice = useSelector((state: RootState) => selectTotalPrice(state));

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Your Cart ({cartItems.length} items)
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your Cart is empty</p>
      ) : (
        <div className="w-full overflow-x-auto">
          {/* Cart Table Header */}
          <div className="hidden md:grid grid-cols-4 gap-4 text-xl font-bold border-b-2 border-gray-500 py-2">
            <div>Item</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:grid md:grid-cols-4 items-center gap-4 border-b border-gray-700 py-4"
              >
                {/* Image & Name */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-32 md:h-40 object-contain"
                  />
                  <span className="text-lg mt-2">{item.title}</span>
                </div>

                {/* Price */}
                <div className="text-lg md:text-xl">₹{item.price}</div>

                {/* Quantity Input */}
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, Number(e.target.value))
                    }
                    className="text-black w-16 p-2 text-center rounded-md"
                  />
                </div>

                {/* Total Price */}
                <div className="text-lg md:text-xl">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0 w-full md:w-auto"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Price Section */}
          <div className="text-xl md:text-2xl font-bold mt-6 text-center md:text-right">
            Total: ₹{TotalPrice.toFixed(2)}
          </div>
        </div>
      )}

      {/* Clear Cart Button */}
      {cartItems.length > 0 && (
        <div className="flex justify-center md:justify-end mt-6">
          <button
            onClick={handleClearCart}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-xl"
          >
            
            Clear Cart
          </button>
        </div>
      
      )}
    </div>
  );
};
