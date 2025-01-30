// import axios from "axios";

// export const addToCart = (productId, selectedSize) => async (dispatch) => {
//   console.log("Adding to cart:", productId); // Add this debug log
//   const userToken = localStorage.getItem("userToken");
//   const userPhone = localStorage.getItem("userPhone");
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/cart/addToCart",
//       {
//         productId: productId._id, // Ensure `productId._id` exists
//         size: selectedSize.size,
//         price: selectedSize.price,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "Phone-Number": userPhone, // Add user phone number to header
//         },
//       }
//     );

//     console.log("addTocart", response.data);

//     dispatch({ type: "ADD_TO_CART", payload: response.data.items });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//   }
// };

// export const removeFromCart = (productId) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/cart/removeFromCart",
//       { productId }
//     );
//     dispatch({ type: "REMOVE_FROM_CART", payload: response.data.items });
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//   }
// };




// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Add to Cart Action
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, selectedSize }, { rejectWithValue }) => {
//     const userToken = localStorage.getItem("userToken");
//     const userPhone = localStorage.getItem("userPhone");
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/addToCart",
//         {
//           productId: productId._id,
//           size: selectedSize.size,
//           price: selectedSize.price,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             "Phone-Number": userPhone,
//           },
//         }
//       );
//       return response.data.items;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to add item");
//     }
//   }
// );

// // Remove From Cart Action
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (productId, { rejectWithValue }) => {
//     const userToken = localStorage.getItem("userToken");
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/removeFromCart",
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );
//       return response.data.items;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to remove item");
//     }
//   }
// );

// // Update Quantity Action
// export const updateItemQuantity = createAsyncThunk(
//   "cart/updateCartItemQuantity",
//   async ({ productId, size, change }, { rejectWithValue }) => {
//     const userToken = localStorage.getItem("userToken");
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/update",
//         { productId, size, change },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );
//       return response.data.items;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to update quantity");
//     }
//   }
// );
