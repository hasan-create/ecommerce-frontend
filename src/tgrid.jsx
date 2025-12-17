
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Card from "./card";
import "./tgrid.css";

export default function Tgrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

 
  const searchParams = new URLSearchParams(location.search);
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const search = searchParams.get("search");


  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true); 
      try {
        let url = `${import.meta.env.VITE_API_URL}/api/products`;
        const params = [];

        if (gender) params.push(`gender=${gender}`);
        if (category) params.push(`category=${category}`);
        if (search) params.push(`search=${search}`);

        if (params.length > 0) {
          url += "?" + params.join("&");
        }

        const res = await axios.get(url);
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(shuffleArray(data));
      } catch (err) {
        console.error("Error fetching filtered products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [gender, category, search]);

  if (loading) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h3>
    );
  }

  return (
    <div className="tgrid">
      {products.length === 0 ? (
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          No products found.
        </h3>
      ) : (
        products.map((item) => (
          <Link
            key={item._id}
            to={`/specs/${item._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              image={`${item.image}`}
              title={item.name}
              price={item.price}
            />
          </Link>
        ))
      )}
    </div>
  );
}
