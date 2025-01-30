// import React, { useEffect, useState } from "react";
// import { addToCart, removeFromCart } from "../Cart/cartActions";
// import axios from "axios";
// import { TiTick } from "react-icons/ti";
// import anaar from "../../assets/anaar.JPG";
// import "./cart.css";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [subtotal, setSubtotal] = useState(0);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     const userToken = localStorage.getItem("userToken");
//     const userPhone = localStorage.getItem("userPhone"); // assuming phone number is saved in localStorage

//     if (!userPhone) {
//       alert("Please login to view Cart");
//       navigate("/");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/api/cart/cartpage", {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "Phone-Number": userPhone, // Add user phone number to header
//         },
//       });

//       const enrichedItems = await Promise.all(
//         res.data.items.map(async (item) => {
//           try {
//             const productRes = await axios.get(
//               `http://localhost:5000/api/products/${
//                 item.productId._id || item.productId
//               }`
//             );
//             return { ...item, productDetails: productRes.data };
//           } catch {
//             return { ...item, productDetails: null };
//           }
//         })
//       );
//       setCartItems(enrichedItems);
//       calculateTotalPrice(enrichedItems);
//     } catch (error) {
//       console.error("Error fetching cart:", error)
//     }
//   };

//   const calculatePrice = (items) => {
//     return items.reduce((sum, item) => {
//       const itemPrice =
//         item.productDetails?.by_size.find(
//           (sizeObj) => sizeObj.size === item.size
//         )?.price || 0;
//       return sum + item.quantity * itemPrice;
//     }, 0);
//   };

//   const calculateSubtotal = (items) => {
//     setSubtotal(calculatePrice(items));
//   };

//   const calculateTotalPrice = (items) => {
//     setTotalPrice(calculatePrice(items));
//   };
//   const handleQuantityChange = async (productId, size, change) => {
//     const updatedItems = cartItems.map((item) =>
//       item.productId === productId && item.size === size
//         ? {
//             ...item,
//             quantity: Math.max(item.quantity + change, 0), // Allow quantity to reach 0
//           }
//         : item
//     );

//     if (updatedItems.some((item) => item.quantity === 0)) {
//       try {
//         await axios.post("http://localhost:5000/api/cart/removeFromCart", {
//           productId,
//         });
//         fetchCart(); // Refresh cart to reflect removal
//       } catch (error) {
//         console.error("Error removing item from cart:", error);
//       }
//     } else {
//       setCartItems(updatedItems);
//       calculateTotalPrice(updatedItems);
//       calculateSubtotal(updatedItems);

//       try {
//         await axios.post("http://localhost:5000/api/cart/update", {
//           productId,
//           size,
//           change,
//         });
//       } catch (error) {
//         console.error("Error updating quantity:", error);
//       }
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     dispatch(removeFromCart(productId));
//     fetchCart();
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <>
//       <h1>Your Basket</h1>
//       <div className="cart-page">
//         <div className="cart-items">
//           {cartItems.length > 0 ? (
//             cartItems.map((item, index) => {
//               const sizeDetails = item.productDetails?.by_size.find(
//                 (sizeObj) => sizeObj.size === item.size
//               );
//               return (
//                 <div key={item._id || index} className="cart-item-card">
//                   <div className="cartcard-info">
//                     <div className="cart-item-image">
//                       <img
//                         src={anaar}
//                         alt={item.productDetails?.Name || "Product Image"}
//                       />
//                     </div>
//                     <div>
//                       <h3>{item.productDetails?.Name || "Unnamed Product"}</h3>
//                       <div className="home-delivery">
//                         <TiTick className="tick" />
//                         <p>Home Delivery</p>
//                       </div>
//                       <hr style={{ width: "100%" }} />
//                       <div className="cart-weightage">
//                         <p>Qty:</p>
//                         <div className="cart-item-actions">
//                           <button
//                             className="action-btn"
//                             onClick={() =>
//                               handleQuantityChange(
//                                 item.productId,
//                                 item.size,
//                                 -1
//                               )
//                             }
//                           >
//                             -
//                           </button>
//                           <p>{item.quantity}</p>
//                           <button
//                             className="action-btn"
//                             onClick={() =>
//                               handleQuantityChange(item.productId, item.size, 1)
//                             }
//                           >
//                             +
//                           </button>
//                         </div>
//                         <p>Rs {sizeDetails?.price || "N/A"}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//         </div>
//         {cartItems.length > 0 && (
//           <div className="checkout">
//             <div>
//               <div className="subtotal">
//                 <h6>Subtotal:</h6>
//                 <p>Rs {totalPrice}</p>
//               </div>
//               <div className="checkout-delivery">
//                 <h6>Delivery:</h6>
//                 <p>Rs 0</p>
//               </div>
//               <hr />
//               <div className="checkout-total">
//                 <h4>Total:</h4>
//                 <p>Rs {totalPrice}</p>
//               </div>
//               <hr />
//               <Link to="/address">
//                 <button className="checkout-btn">Checkout</button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { TiTick } from "react-icons/ti";
// import anaar from "../../assets/anaar.JPG";
// import "./cart.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [subtotal, setSubtotal] = useState(0);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const items = useSelector((state) => state.cart);

//   const fetchCart = async () => {
//     const userToken = localStorage.getItem("userToken");
//     const userPhone = localStorage.getItem("userPhone");

//     if (!userPhone) {
//       alert("Please login to view Cart");
//       navigate("/");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/api/cart/cartpage", {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "Phone-Number": userPhone,
//         },
//       });

//       const enrichedItems = await Promise.all(
//         res.data.items.map(async (item) => {
//           try {
//             const productRes = await axios.get(
//               `http://localhost:5000/api/products/${
//                 item.productId._id || item.productId
//               }`
//             );
//             return { ...item, productDetails: productRes.data };
//           } catch {
//             return { ...item, productDetails: null };
//           }
//         })
//       );
// setCartItems(enrichedItems);
//       calculateTotalPrice(enrichedItems);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   const calculatePrice = (items) => {
//     return items.reduce((sum, item) => {
//       const itemPrice =
//         item.productDetails?.by_size.find(
//           (sizeObj) => sizeObj.size === item.size
//         )?.price || 0;
//       return sum + item.quantity * itemPrice;
//     }, 0);
//   };

//   const calculateSubtotal = (items) => {
//     setSubtotal(calculatePrice(items));
//   };

//   const calculateTotalPrice = (items) => {
//     setTotalPrice(calculatePrice(items));
//   };

//   const handleQuantityChange = async (productId, size, change) => {
//     try {
//       // Find the item in the cart and optimistically update the state
//       const updatedItems = cartItems.map((item) =>
//         item.productId === productId && item.size === size
//           ? { ...item, quantity: Math.max(item.quantity + change, 0) }
//           : item
//       );

//       // Remove items with quantity 0 from the UI
//       const itemsToKeep = updatedItems.filter((item) => item.quantity > 0);

//       // Optimistically update UI state
//       setCartItems(itemsToKeep);
//       calculateTotalPrice(itemsToKeep);
//       calculateSubtotal(itemsToKeep);

//       // Backend update: If quantity is reduced to zero, remove the item
//       if (change < 0 && itemsToKeep.length < cartItems.length) {
//         await axios.post("http://localhost:5000/api/cart/removeFromCart", {
//           productId,
//           size,
//         });
//       } else {
//         // Otherwise, update the quantity on the backend
//         await axios.post("http://localhost:5000/api/cart/update", {
//           productId,
//           size,
//           change,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);

//       // Roll back the state to match the backend data
//       fetchCart();
//     }
//   };
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <>
//       <h1>Your Basket</h1>
//       <div className="cart-page">
//         <div className="cart-items">
//           {cartItems.length > 0 ? (
//             cartItems.map((item, index) => {
//               const sizeDetails = item.productDetails?.by_size.find(
//                 (sizeObj) => sizeObj.size === item.size
//               );
//               return (
//                 <div key={item._id || index} className="cart-item-card">
//                   <div className="cartcard-info">
//                     <div className="cart-item-image">
//                       <img
//                         src={anaar}
//                         alt={item.productDetails?.Name || "Product Image"}
//                       />
//                     </div>
//                     <div>
//                       <h3>{item.productDetails?.Name || "Unnamed Product"}</h3>
//                       <div className="home-delivery">
//                         <TiTick className="tick" />
//                         <p>Home Delivery</p>
//                       </div>
//                       <hr style={{ width: "100%" }} />
//                       <div className="cart-weightage">
//                         <p>Qty:</p>
//                         <div className="cart-item-actions">
//                           <button
//                             className="action-btn"
//                             onClick={() =>
//                               handleQuantityChange(
//                                 item.productId,
//                                 item.size,
//                                 -1
//                               )
//                             }
//                           >
//                             -
//                           </button>
//                           <p>{item.quantity}</p>
//                           <button
//                             className="action-btn"
//                             onClick={() =>
//                               handleQuantityChange(item.productId, item.size, 1)
//                             }
//                           >
//                             +
//                           </button>
//                         </div>
//                         <p>Rs {sizeDetails?.price || "N/A"}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//         </div>
//         {cartItems.length > 0 && (
//           <div className="checkout">
//             <div>
//               <div className="subtotal">
//                 <h6>Subtotal:</h6>
//                 <p>Rs {totalPrice}</p>
//               </div>
//               <div className="checkout-delivery">
//                 <h6>Delivery:</h6>
//                 <p>Rs 0</p>
//               </div>
//               <hr />
//               <div className="checkout-total">
//                 <h4>Total:</h4>
//                 <p>Rs {totalPrice}</p>
//               </div>
//               <hr />
//               <Link to="/address">
//                 <button className="checkout-btn">Checkout</button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import anaar from "../../assets/anaar.JPG";
import { Link, useNavigate } from "react-router-dom";
import {
  setCart,
  updateItemQuantity,
  removeItem,
} from "../redux/reducer/cartReducer";
import axios from "axios";
import debounce from "lodash.debounce";
import "./cart.css";
import store from "../redux/Store";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";
console.log(apiUrl);

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart.items || []);
  const totalPrice = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  console.log("totalprice", totalPrice);
  console.log("cartpage", cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCart = async () => {
    const userPhone = localStorage.getItem("userPhone");

    if (!userPhone) {
      alert("Please login to view Cart");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${apiUrl}/api/cart/cartpage`, {
        headers: {
          Authorization: `Bearer ${userPhone}`,
          "phone-number": userPhone,
        },
      });

      const enrichedItems = res.data.items.map((item) => ({
        ...item,
        sizeDetails: item.productId?.by_size.find(
          (size) => size.size === item.size
        ),
      }));

      dispatch(setCart(enrichedItems));
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const syncCartWithBackend = debounce(async () => {
    const state = store.getState();
    console.log("statefront", state);

    const cart = state.cart;
    console.log("cartfront", cart);

    const userPhone = localStorage.getItem("userPhone");

    if (!userPhone) {
      console.error("User phone not found in localStorage");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/api/cart/sync`,
        { cartItems: cart.items },
        {
          headers: {
            Authorization: `Bearer ${userPhone}`,
            "phone-number": userPhone,
          },
          withCredentials: true,
        }
      );
      console.log("cartitems", cart);

      console.log("Cart synced successfully");
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  }, 1000);

  const handleCheckout = async () => {
    const state = store.getState();
    const cart = state.cart;
    const userPhone = localStorage.getItem("userPhone");

    try {
      await axios.post(
        `${apiUrl}/api/cart/sync`,
        { cartItems: cart.items },
        {
          headers: {
            Authorization: `Bearer ${userPhone}`,
            "phone-number": userPhone,
          },
          withCredentials: true,
        }
      );
      console.log("Cart synced before checkout");
      navigate("/address");
    } catch (error) {
      console.error("Failed to sync cart before checkout:", error);
      alert("Failed to save your cart. Please try again.");
    }
  };

  const handleQuantityChange = (productId, size, quantityChange) => {
    console.log(
      "ProductId:",
      productId,
      "Size:",
      size,
      "Quantity Change:",
      quantityChange
    );
    // Ensure quantityChange is a valid number
    if (typeof quantityChange !== "number" || quantityChange === 0) {
      console.error("Invalid quantity change:", quantityChange);
      return;
    }
    dispatch(updateItemQuantity({ productId, size, quantity: quantityChange }));
    syncCartWithBackend(); // Sync the cart state with the backend
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <>
      <h1>Your Basket</h1>
      <div className="cart-page">
        <div className="cart-items">
          {cart && cart.length > 0 ? (
            cart.map((item, index) => {
              return (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="cart-item-card"
                >
                  <div className="cartcard-info">
                    <div className="cart-item-image">
                      <img
                        src={anaar}
                        alt={item.productDetails?.Name || "Product Image"}
                      />
                    </div>
                    <div>
                      <h3>{item.productDetails?.Name || "Unnamed Product"}</h3>
                      <div className="home-delivery">
                        <p>Home Delivery</p>
                      </div>
                      <hr style={{ width: "100%" }} />
                      <div className="cart-weightage">
                        <p>Qty:</p>
                        <div className="cart-item-actions">
                          <button
                            className="action-btn"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.size,
                                -1
                              )
                            }
                          >
                           -
                          </button>
                          <button
                            className="action-btn"
                            onClick={() =>
                              handleQuantityChange(item.productId, item.size, 1)
                            }
                          >
                          {item.quantity}    +
                          </button>
                        </div>
                        <p>Rs {item.price || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="checkout">
            <div>
              <div className="subtotal">
                <h6>Subtotal:</h6>
                <p>Rs {totalPrice}</p> {/* Display calculated total price */}
              </div>
              <div className="checkout-delivery">
                <h6>Delivery:</h6>
                <p>Rs 0</p>
              </div>
              <hr />
              <div className="checkout-total">
                <h4>Total:</h4>
                <p>Rs {totalPrice}</p> {/* Display total price */}
              </div>
              <hr />
              <Link to="/address">
                <button onClick={handleCheckout} className="checkout-btn">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
