import './additem.css';
import axios from 'axios';
import { useState } from 'react';

export default function Additem() {
  const [preview, setpreview] = useState(null);
  const [clicked, setclicked] = useState(null);
  const [product, setproduct] = useState({
    image: null,
    name: '',
    size: '',
    price: '',
    description: '',
    category: '',
    gender: '',
    season: ''
  });

  const handelfilechange = (e) => {
    const file = e.target.files?.[0];
    const name = e.target.name;

    if (name === 'image' && file) {
      setpreview(URL.createObjectURL(file));
      setclicked(false);
      setproduct({ ...product, image: file });
    } else {
      setproduct({ ...product, [name]: e.target.value });
    }
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      alert('✅ Product added successfully!');
    } catch (err) {
      console.log(err);
      alert('❌ Error adding product');
    }
  };

  const clickpreview = () => setclicked(true);

  return (
    <div className="additem">
      <h1>Welcome Admin</h1>
      <div className="itemform">
        <form onSubmit={handelsubmit}>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handelfilechange}
          />
          <div className="itemimage">
            {clicked && <img src={preview} alt="preview" height="100px" />}
          </div>
          {clicked === false && <button onClick={clickpreview}>Preview</button>}

          <input
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={handelfilechange}
          />

          <input
            placeholder="Size"
            name="size"
            value={product.size}
            onChange={handelfilechange}
          />

          <input
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handelfilechange}
          />

          <input
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={handelfilechange}
          />

          {/* New dropdowns */}
          <select name="category" value={product.category} onChange={handelfilechange}>
            <option value="">Select Category</option>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
          </select>

          <select name="gender" value={product.gender} onChange={handelfilechange}>
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          <select name="season" value={product.season} onChange={handelfilechange}>
            <option value="">Select Season</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="all">All Seasons</option>
          </select>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
