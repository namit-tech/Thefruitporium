

import axios from "axios";
import debounce from "lodash.debounce";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

let syncCartToBackend = debounce(async (dispatch, getState) => {
  const state = getState();
  const { items } = state.cart;
  console.log("itemsredux", items);

  if (!items || items.length === 0) {
    console.warn("Cart is empty, skipping sync");
    return;
  }

  const userPhone = localStorage.getItem("userPhone"); // Retrieve phone number from localStorage

  if (!userPhone) {
    console.error("No userPhone found in localStorage");
    return;
  }

  try {
    // Step 2: Fetch the userId from the backend using the userPhone
    const response = await axios.get(
      `${apiUrl}/api/cart/getuserid`,
      {
        headers: {
          "phone-number": userPhone, // Send phone number in header
        },
        withCredentials: true, // Enable credentials for CORS
      }
    );
    console.log("response", response.data);

    const userId = response.data.userId;
    if (!userId) {
      console.error("User ID not found in response");
      return;
    }

    console.log("Fetched UserID:", userId);

    // Step 3: Sync the cart with the backend using the fetched userId
    await axios.post(
      `${apiUrl}/api/cart/sync`,
      { userId, cartItems: items },
      {
        headers: {
          Authorization: `Bearer ${userPhone}`,
          "phone-number": userPhone,
        },
        withCredentials: true,
      }
    );
    console.log("items", items);

    console.log("Cart synced to backend");
  } catch (err) {
    console.error("Failed to sync cart:", err);
  }
}, 1000);

const cartSyncMiddleware = (store) => (next) => (action) => {
  const result = next(action); // Dispatch action and update state
  console.log("State after action:", store.getState().cart); // Check state after update

  if (
    ["cart/addToCart", "cart/removeFromCart", "cart/updateItemQuantity"].includes(action.type)
  ) {
    syncCartToBackend(store.dispatch, store.getState); // Use updated state
  }
  console.log("State in middleware:", store.getState());


  return result;
};

// console.log("cartsyncmiddle", cartSyncMiddleware);

export default cartSyncMiddleware;
