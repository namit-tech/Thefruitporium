
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import fruitImage from "../../../assets/anaar.JPG"; // Example image
import "./categorypage.css";
import CardData from "../../Cards/CardData";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get category from URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/api/products?category=${categoryName}`
        );
        console.log("Fetched products:", res.data);
        setProducts(res.data); // Only set products of the selected category
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="cards">
       <CardData products={products} />
      </div>
    </div>
  );
};


export default CategoryPage;





