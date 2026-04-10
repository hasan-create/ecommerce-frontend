
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./App";
import "./cardspecs.css";
import { buildImageUrl } from "./utils/url";

export default function Cardspecs() {
  const User = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (User && Array.isArray(User)) {
      const foundProduct = User.find((p) => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [User, id]);

  const fetchFeedbacks = async (pid) => {
    if (!pid) return;
    try {
      const res = await axios.get(`/api/feedback/${pid}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    if (product?._id) fetchFeedbacks(product._id);
  }, [product]);

  const addToCart = async () => {
    
    if (!product) return;
    const itemToCart = { productId:product._id,name: product.name, price: product.price, image: product.image };
    try {
      await axios.post("/api/cart/add", itemToCart, { withCredentials: true });
      alert("Product added to cart!");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  const buyNow = () => {
    if (!product) return;
    const itemToBuy = { name: product.name, price: product.price, image: product.image };
    navigate("/place-order", { state: { product: itemToBuy } });
  };

  const submitFeedback = async () => {
    if (!product) return;
    try {
      await axios.post(
        "/api/feedback/add",
        { productId: product._id, rating, comment },
        { withCredentials: true }
      );
      alert("Feedback submitted!");
      setComment("");
      setRating(5);
      fetchFeedbacks(product._id);
    } catch (err) {
      console.error(err);
      alert("Please login to submit feedback");
    }
  };

 
  if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}></h2>;

  return (
    <div className="cardspecs-container">
      {}
      <div className="imgcontent">    <div className="product-image">
        <img src={buildImageUrl(product.image)} alt={product.name} />
      </div>

      {}
      <div className="product-details">
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
        {}
<div className="size-selector">
  <h4>Select Size:</h4>
  <div className="size-options">
    {["S", "M", "L", "XL", "XXL"].map((size) => (
      <div
        key={size}
        className={`size-box ${selectedSize === size ? "selected" : ""}`}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </div>
    ))}
  </div>
</div>
<div className="product-button">      <button className="add-cart-btn" onClick={addToCart}>Add to Cart</button></div>
        {product.description && <p>{product.description}</p>}
          <hr></hr>
           <div className="content">
          
            <ul>
              <li>  âœ… 100% Original Products  </li>
              <li>ðŸšš Cash on Delivery Available </li>
              <li>ðŸ”„ 7-Day Easy Returns  </li>
              <li>ðŸ’³ Secure Payment Options  </li>
              <li>â­ Trusted by Thousands of Customers  </li>
            </ul>
     
</div>
      </div></div>
  
  
    
          <button className="buy-now-btn" onClick={buyNow}>Buy Now</button>

      {}
      <div className="feedback-section">
        <h3>Customer Feedback</h3>

        {}
        <div className="feedback-form">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <textarea
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={submitFeedback}>Submit</button>
        </div>

        {}
        <div className="feedback-list">
          {feedbacks.length === 0 ? (
            <p>No feedback yet</p>
          ) : (
            feedbacks.map((f) => (
              <div key={f._id} className="feedback-item">
                <strong>{f.userEmail}</strong> - Rating: {f.rating}/5
                <p>{f.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import "./cardspecs.css";

// export default function Cardspecs() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [selectedSize, setSelectedSize] = useState(null);

//   // ------------------- Fetch product by ID from backend -------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`/api/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // ------------------- Fetch feedbacks -------------------
//   const fetchFeedbacks = async (pid) => {
//     if (!pid) return;
//     try {
//       const res = await axios.get(`/api/feedback/${pid}`);
//       setFeedbacks(res.data);
//     } catch (err) {
//       console.error("Error fetching feedbacks:", err);
//     }
//   };

//   useEffect(() => {
//     if (product?._id) fetchFeedbacks(product._id);
//   }, [product]);

//   // ------------------- Add to Cart -------------------
// const addToCart = async () => {
//   if (!product) return;
//   const itemToCart = {
//     productId: product._id,  // ðŸ”¹ MUST include
//     name: product.name,
//     price: product.price,
//     image: product.image,
//   };
//   try {
//     await axios.post("/api/cart/add", itemToCart, {
//       withCredentials: true,
//     });
//     alert("Product added to cart!");
//     navigate("/cart");
//   } catch (err) {
//     console.error("Failed to add to cart:", err.response?.data || err);
//     alert("Failed to add product");
//   }
// };



//   // ------------------- Buy Now -------------------
//   const buyNow = () => {
//     if (!product) return;
//     const itemToBuy = { name: product.name, price: product.price, image: product.image };
//     navigate("/place-order", { state: { product: itemToBuy } });
//   };

//   // ------------------- Submit Feedback -------------------
//   const submitFeedback = async () => {
//     if (!product) return;
//     try {
//       await axios.post(
//         "/api/feedback/add",
//         { productId: product._id, rating, comment },
//         { withCredentials: true }
//       );
//       alert("Feedback submitted!");
//       setComment("");
//       setRating(5);
//       fetchFeedbacks(product._id);
//     } catch (err) {
//       console.error(err);
//       alert("Please login to submit feedback");
//     }
//   };

//   if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

//   return (
//     <div className="cardspecs-container">
//       <div className="imgcontent">
//         <div className="product-image">
//           <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
//         </div>

//         <div className="product-details">
//           <h1>{product.name}</h1>
//           <h2>${product.price}</h2>

//           <div className="size-selector">
//             <h4>Select Size:</h4>
//             <div className="size-options">
//               {["S", "M", "L", "XL", "XXL"].map((size) => (
//                 <div
//                   key={size}
//                   className={`size-box ${selectedSize === size ? "selected" : ""}`}
//                   onClick={() => setSelectedSize(size)}
//                 >
//                   {size}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="product-button">
//             <button className="add-cart-btn" onClick={addToCart}>Add to Cart</button>
//           </div>

//           {product.description && <p>{product.description}</p>}

//           <hr />

//           <div className="content">
//             <ul>
//               <li>âœ… 100% Original Products</li>
//               <li>ðŸšš Cash on Delivery Available</li>
//               <li>ðŸ”„ 7-Day Easy Returns</li>
//               <li>ðŸ’³ Secure Payment Options</li>
//               <li>â­ Trusted by Thousands of Customers</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <button className="buy-now-btn" onClick={buyNow}>Buy Now</button>

//       <div className="feedback-section">
//         <h3>Customer Feedback</h3>

//         <div className="feedback-form">
//           <label>Rating:</label>
//           <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>{r}</option>
//             ))}
//           </select>
//           <textarea
//             placeholder="Write your feedback..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button onClick={submitFeedback}>Submit</button>
//         </div>

//         <div className="feedback-list">
//           {feedbacks.length === 0 ? (
//             <p>No feedback yet</p>
//           ) : (
//             feedbacks.map((f) => (
//               <div key={f._id} className="feedback-item">
//                 <strong>{f.userEmail}</strong> - Rating: {f.rating}/5
//                 <p>{f.comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// // }
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import "./cardspecs.css";

// export default function Cardspecs() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [selectedSize, setSelectedSize] = useState(null);

//   // ------------------- Fetch product by ID from backend -------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`/api/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // ------------------- Fetch feedbacks -------------------
//   const fetchFeedbacks = async (pid) => {
//     if (!pid) return;
//     try {
//       const res = await axios.get(`/api/feedback/${pid}`);
//       setFeedbacks(res.data || []);
//     } catch (err) {
//       console.error("Error fetching feedbacks:", err);
//     }
//   };

//   useEffect(() => {
//     if (product?._id) fetchFeedbacks(product._id);
//   }, [product]);

//   // ------------------- Add to Cart -------------------
//   const addToCart = async () => {
//     if (!product) return;
//     const itemToCart = {
//       productId: product._id,  // required for Cart links
//       name: product.name,
//       price: product.price,
//       image: product.image || "",
//     };
//     try {
//       await axios.post("/api/cart/add", itemToCart, {
//         withCredentials: true,
//       });
//       alert("Product added to cart!");
//       navigate("/cart");
//     } catch (err) {
//       console.error("Failed to add to cart:", err.response?.data || err);
//       alert("Failed to add product");
//     }
//   };

//   // ------------------- Buy Now -------------------
//   const buyNow = () => {
//     if (!product) return;
//     const itemToBuy = {
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       image: product.image || "",
//     };
//     navigate("/place-order", { state: { product: itemToBuy } });
//   };

//   // ------------------- Submit Feedback -------------------
//   const submitFeedback = async () => {
//     if (!product) return;
//     try {
//       await axios.post(
//         "/api/feedback/add",
//         { productId: product._id, rating, comment },
//         { withCredentials: true }
//       );
//       alert("Feedback submitted!");
//       setComment("");
//       setRating(5);
//       fetchFeedbacks(product._id);
//     } catch (err) {
//       console.error(err);
//       alert("Please login to submit feedback");
//     }
//   };

//   if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

//   return (
//     <div className="cardspecs-container">
//       <div className="imgcontent">
//         <div className="product-image">
//           <img src={`http://localhost:3000/${product.image || ""}`} alt={product.name} />
//         </div>

//         <div className="product-details">
//           <h1>{product.name}</h1>
//           <h2>${product.price}</h2>

//           <div className="size-selector">
//             <h4>Select Size:</h4>
//             <div className="size-options">
//               {["S", "M", "L", "XL", "XXL"].map((size) => (
//                 <div
//                   key={size}
//                   className={`size-box ${selectedSize === size ? "selected" : ""}`}
//                   onClick={() => setSelectedSize(size)}
//                 >
//                   {size}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="product-button">
//             <button className="add-cart-btn" onClick={addToCart}>Add to Cart</button>
//           </div>

//           {product.description && <p>{product.description}</p>}

//           <hr />

//           <div className="content">
//             <ul>
//               <li>âœ… 100% Original Products</li>
//               <li>ðŸšš Cash on Delivery Available</li>
//               <li>ðŸ”„ 7-Day Easy Returns</li>
//               <li>ðŸ’³ Secure Payment Options</li>
//               <li>â­ Trusted by Thousands of Customers</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <button className="buy-now-btn" onClick={buyNow}>Buy Now</button>

//       <div className="feedback-section">
//         <h3>Customer Feedback</h3>

//         <div className="feedback-form">
//           <label>Rating:</label>
//           <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>{r}</option>
//             ))}
//           </select>
//           <textarea
//             placeholder="Write your feedback..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button onClick={submitFeedback}>Submit</button>
//         </div>

//         <div className="feedback-list">
//           {feedbacks.length === 0 ? (
//             <p>No feedback yet</p>
//           ) : (
//             feedbacks.map((f) => (
//               <div key={f._id} className="feedback-item">
//                 <strong>{f.userEmail}</strong> - Rating: {f.rating}/5
//                 <p>{f.comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

