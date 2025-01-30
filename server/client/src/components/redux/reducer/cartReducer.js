import { createSlice } from "@reduxjs/toolkit";

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items
    totalPrice: 0, // Total price of all items in the cart
    lastSynced: null, // Timestamp of the last sync with the backend
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, size, price } = action.payload;
      console.log("Action payload received:", action.payload);

      const existingItem = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity += 1;
        console.log("Item exists, incrementing quantity:", existingItem);
      } else {
        // Add new item to cart
        const newItem = { productId, size, price, quantity: 1 };
        state.items.push(newItem);
        console.log("New item added to cart:", newItem);
      }

      state.totalPrice += price;

      console.log("Updated cart state:", state.items);
    },

    // Remove an item from the cart
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      const index = state.items.findIndex(
        (item) => item.productId === productId && item.size === size
      );
      if (index !== -1) {
        const item = state.items[index];
        state.totalPrice -= item.price * item.quantity; // Deduct the item's total price
        state.items.splice(index, 1); // Remove the item from the cart
      }
    },

    updateItemQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      console.log("Action Payload:", action.payload);
      
      // Find item index by comparing productId and size
      const itemIndex = state.items.findIndex(
        (item) =>
          item.productId.toString() === productId.toString() && item.size === size
      );
    
      console.log("Item Index Found:", itemIndex);
    
      if (itemIndex === -1) {
        console.error("Item not found in cart for ProductId and Size:", productId, size);
        return;
      }
    
      const item = state.items[itemIndex];
      const newQuantity = item.quantity + quantity;
    
      if (newQuantity > 0) {
        // Update quantity and price
        item.quantity = newQuantity;
        state.totalPrice += item.price * quantity;
      } else {
        // Remove the item from cart if quantity is <= 0
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    
      // Recalculate total price after update
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      console.log("Updated totalPrice after quantity change:", state.totalPrice);
    },
    
    

  setCart: (state, action) => {
      console.log("Payload received in setCart:", action.payload);
    
      // Process items in the payload
      state.items = action.payload.map((item) => {
        console.log("Processing item:", item);
        
        const productDetails = item.productId; // Ensure this is correctly populated in payload
        console.log("Extracted productDetails:", productDetails);
    
        // Assuming `by_size` is an array within the product document that contains size details
        const sizeDetails = productDetails?.by_size?.find(
          (sizeEntry) => sizeEntry.size === item.size
        );
        console.log("Size details for size:", item.size, sizeDetails);
    
        // Update the item price based on size details
        const updatedItem = {
          ...item,
          price: sizeDetails?.price || item.price, // Ensure price is set correctly
        };
        console.log("Updated item:", updatedItem);
        return updatedItem;
      });
    
      // Recalculate total price based on updated items
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      console.log("Updated totalPrice:", state.totalPrice);
    
      // Set the last synced timestamp
      state.lastSynced = Date.now();
      console.log("Updated lastSynced timestamp:", state.lastSynced);
    },
    
  },
});

export const { addToCart, removeFromCart, updateItemQuantity, setCart } =
  cartReducer.actions;

export default cartReducer.reducer;

