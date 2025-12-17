import React, { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Hero from "./hero";
import Navbar from "./navbar";
import Footer from "./footer";
import Login from "./login.jsx";
import Trend from "./trendhero.jsx";
import Signup from "./signup.jsx";
import Tsearch from "./tsearch.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import Cart from "./cart.jsx";
import axios from "axios";
import Tgrid from "./tgrid";
import Cardspecs from "./cardspecs.jsx";
import PlaceOrder from "./Placeorder.jsx";
import Orders from "./orders.jsx";
import TrackOrder from "./TrackOrder.jsx";
import Hgrid from "./hgrid.jsx";
import About from "./About.jsx";

import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import HelpCenter from "./pages/HelpCenter";

import ProtectedRoute from "./ProtectedRoute";

axios.defaults.withCredentials = true;

const UserContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    // PROTECTED PAGES ⬇⬇⬇
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Hero />
            <Hgrid />
            <Footer />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/Trends",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Tsearch />
            <Trend />
            <br></br>
            <Tgrid />
            <Footer />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/tgrid",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Tgrid />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/Cart",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Cart />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/specs/:id",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Cardspecs />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/place-order",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <PlaceOrder />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Orders />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/track-order",
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <TrackOrder />
          </>
        </ProtectedRoute>
      ),
    },

    {
      path: "/Admin",
      element: (
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      ),
    },

    // PUBLIC PAGES ⬇⬇⬇
    {
      path: "/Signup",
      element: (
        <>
          <Navbar />
          <Signup />
        </>
      ),
    },

    {
      path: "/about",
      element: <About />,
    },

    {
      path: "/faq",
      element: (
        <>
          <Navbar />
          <FAQ />
          <Footer />
        </>
      ),
    },

    {
      path: "/privacy",
      element: (
        <>
          <Navbar />
          <Privacy />
          <Footer />
        </>
      ),
    },

    {
      path: "/help",
      element: (
        <>
          <Navbar />
          <HelpCenter />
          <Footer />
        </>
      ),
    },

    {
      path: "*",
      element: (
        <h2
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "gray",
          }}
        >
          404 | Page Not Found
        </h2>
      ),
    },
  ]);

  return (
    <UserContext.Provider value={products}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;
