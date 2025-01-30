// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import fruitImage from "../../../../client/src/assets/anaar.JPG";
// import axios from "axios";
// import "./carddata.css";

// const CardData = ({ addToCart }) => {
//   const [products, setProducts] = useState([]);

//   const addButton = {
//     backgroundColor: "#709F41",
//     color: "white",
//     width: "4vw",
//   };

//   const cardDrop = {
//     backgroundColor: "white",
//     color: "black",
//     border: "1px solid black",
//     width: "7vw",
//     marginTop: "10px",
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="cards">
//       {products.length > 0 ? (
//         products.map((product) =>
//           product && product._id ? (
//             <ProductCard
//               key={product._id}
//               product={product}
//               addButton={addButton}
//               cardDrop={cardDrop}
//               addToCart={addToCart} // Pass addToCart to ProductCard
//             />
//           ) : (
//             <p key={Math.random()}>Invalid product data.</p>
//           )
//         )
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// };

// const ProductCard = ({ product, addButton, cardDrop, addToCart }) => {
//   const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

//   const handleSelectWeight = (index) => {
//     setSelectedSizeIndex(index);
//   };

//   return (
//     <Card className="data">
//       <Link to={`/description/${product._id}`}>
//         <Card.Img variant="top" src={fruitImage} alt={product.Name} />
//       </Link>
//       <Card.Body>
//         <Card.Title className="fw-bold">{product.Name}</Card.Title>
//         <Card.Text>Rs - {product.by_size[selectedSizeIndex].price}/-</Card.Text>

//         <div className="d-flex justify-content-between align-items-center">
//           <Card.Text className="text-secondary">
//             {product.by_size[selectedSizeIndex].size}
//           </Card.Text>
//           <Button
//             variant="success"
//             style={addButton}
//             onClick={() =>
//               addToCart(product._id, product.by_size[selectedSizeIndex])
//             }
//           >
//             ADD
//           </Button>
//         </div>

//         <Dropdown className="weights">
//           <Dropdown.Toggle variant="light" style={cardDrop} id="dropdown-basic">
//             Weights
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {product.by_size.map((sizeOption, index) => (
//               <Dropdown.Item
//                 key={index}
//                 onClick={() => handleSelectWeight(index)}
//               >
//                 {sizeOption.size}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </Card.Body>
//     </Card>
//   );
// };

// export default CardData;

// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import fruitImage from "../../../../client/src/assets/anaar.JPG";
// import axios from "axios";
// import "./carddata.css";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../Cart/cartActions";

// const CardData = () => {
//   const [products, setProducts] = useState([]);
//   const dispatch = useDispatch();

//   const addButton = {
//     backgroundColor: "#709F41",
//     color: "white",
//     width: "4vw",
//   };

//   const cardDrop = {
//     backgroundColor: "white",
//     color: "black",
//     border: "1px solid black",
//     width: "7vw",
//     marginTop: "10px",
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="cards">
//       {products.length > 0 ? (
//         products.map((product) =>
//           product && product._id ? (
//             <ProductCard
//               key={product._id}
//               product={product}
//               addButton={addButton}
//               cardDrop={cardDrop}
//               dispatch={dispatch}
//             />
//           ) : (
//             <p key={Math.random()}>Invalid product data.</p>
//           )
//         )
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// };

// const ProductCard = ({ product, addButton, cardDrop, dispatch }) => {
//   const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

//   const handleSelectWeight = (index) => {
//     setSelectedSizeIndex(index);
//   };

//   const handleAddToCart = () => {
//     const selectedSize = product.by_size[selectedSizeIndex];
//     dispatch(addToCart(product, selectedSize));
//   };

//   return (
//     <Card className="data">
//       <Link to={`/description/${product._id}`}>
//         <Card.Img variant="top" src={fruitImage} alt={product.Name} />
//       </Link>
//       <Card.Body>
//         <Card.Title className="fw-bold">{product.Name}</Card.Title>
//         <Card.Text>Rs - {product.by_size[selectedSizeIndex].price}/-</Card.Text>

//         <div className="d-flex justify-content-between align-items-center">
//           <Card.Text className="text-secondary">
//             {product.by_size[selectedSizeIndex].size}
//           </Card.Text>
//           <Button
//             variant="success"
//             style={addButton}
//             onClick={handleAddToCart}
//           >
//             ADD
//           </Button>
//         </div>

//         <Dropdown className="weights">
//           <Dropdown.Toggle variant="light" style={cardDrop} id="dropdown-basic">
//             Weights
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {product.by_size.map((sizeOption, index) => (
//               <Dropdown.Item
//                 key={index}
//                 onClick={() => handleSelectWeight(index)}
//               >
//                 {sizeOption.size}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </Card.Body>
//     </Card>
//   );
// };

// export default CardData;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import fruitImage from "../../../../client/src/assets/anaar.JPG";
import anaar from "../../assets/product-9.png";
import axios from "axios";
import "./carddata.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

const CardData = ({ products: passedProducts }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const addButton = {
    backgroundColor: "#709F41",
    color: "white",
    width: "4vw",
  };

  const cardDrop = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    width: "100%",
    marginTop: "10px",
  };

  useEffect(() => {
    if (!passedProducts) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/products`);
          setProducts(res.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [passedProducts]);

  const renderProducts = passedProducts || products;

  return (
    <div className="cards">
      {renderProducts.length > 0 ? (
        renderProducts.map((product) =>
          product && product._id ? (
            <ProductCard
              key={product._id}
              product={product}
              addButton={addButton}
              cardDrop={cardDrop}
              dispatch={dispatch}
            />
          ) : (
            <p key={Math.random()}>Invalid product data.</p>
          )
        )
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

const ProductCard = ({ product, addButton, cardDrop, dispatch }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = React.useState(0);

  const handleSelectWeight = (index) => {
    setSelectedSizeIndex(index);
  };

  // const handleAddToCart = () => {
  //   const selectedSize = product.by_size[selectedSizeIndex];
  //   dispatch(addToCart(product, selectedSize));
  // };

  const handleAddToCart = () => {
    const selectedSize = product.by_size[selectedSizeIndex];
    const productId = product._id;
    const { price } = selectedSize; // Get the product ID and price from the selected siz
    const size = selectedSize.size; // Get the selected size

    // Dispatch the addToCart action with the required fields: productId, size, and price
    dispatch(addToCart({ productId, size, price, quantity: 1 }));
  };

  return (
    <Card className="data">
      <Link to={`/description/${product._id}`}>
        <div style={{ position: "relative" }}>
          {/* Original image */}
          <Card.Img
            variant="top"
            src={fruitImage}
            alt={product.Name}
            className="data-img"
          />
          {/* Hover image */}
          <Card.Img
            variant="top"
            src={anaar} // Static hover image
            alt={`${product.Name} Hover`}
            className="data-img-hover"
          />
        </div>
      </Link>
      <Card.Body>
        <Card.Title className="fw-bold">{product.Name}</Card.Title>
        <Card.Text>Rs - {product.by_size[selectedSizeIndex].price}/-</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Card.Text className="text-secondary">
            {product.by_size[selectedSizeIndex].size}
          </Card.Text>
          <Button variant="success" style={addButton} onClick={handleAddToCart}>
            ADD
          </Button>
        </div>

        <Dropdown className="weights">
          <Dropdown.Toggle variant="light" style={cardDrop} id="dropdown-basic">
            Weights
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {product.by_size.map((sizeOption, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSelectWeight(index)}
              >
                {sizeOption.size}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
};

export default CardData;
