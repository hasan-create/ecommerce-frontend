
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tsearch.css";

export default function Tsearch() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleGenderClick = (gender) => {
   
    if (gender === "kids") {
      navigate(`/tgrid?gender=kids`);
      return;
    }

    setActiveMenu(activeMenu === gender ? null : gender);
  };

  
  const goToFilteredPage = (gender, category) => {
    const params = [];
    if (gender) params.push(`gender=${gender}`);
    if (category) params.push(`category=${category}`);
    navigate(`/tgrid?${params.join("&")}`);
    setActiveMenu(null);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/tgrid?search=${search.trim()}`);
    }
  };

  return (
    <div className="searchp">
      {}
      <ul className="searchul">
        <li onClick={() => handleGenderClick("men")}>MEN</li>
        {activeMenu === "men" && (
          <div className="dropdown">
            <p onClick={() => goToFilteredPage("men", "topwear")}>Topwear</p>
            <p onClick={() => goToFilteredPage("men", "bottomwear")}>Bottomwear</p>
          </div>
        )}

        <li onClick={() => handleGenderClick("women")}>WOMEN</li>
        {activeMenu === "women" && (
          <div className="dropdown">
            <p onClick={() => goToFilteredPage("women", "topwear")}>Topwear</p>
            <p onClick={() => goToFilteredPage("women", "bottomwear")}>Bottomwear</p>
          </div>
        )}

        {}
        <li onClick={() => handleGenderClick("kids")}>KIDS</li>
      </ul>

      {}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="searchbox-container">
          <div className="searchbox">
            <input
              type="search"
              placeholder="Search.."
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="searchicon" onClick={handleSearchSubmit}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          {}
          <div className="ham">
            <i
              className="fa-solid fa-bars"
              onClick={() =>
                setActiveMenu(activeMenu === "helpMenu" ? null : "helpMenu")
              }
            ></i>

            {activeMenu === "helpMenu" && (
              <div className="help-dropdown">
                <p
                  onClick={() => {
                    navigate("/faq");
                    setActiveMenu(null);
                  }}
                >
                  FAQ
                </p>
                <p
                  onClick={() => {
                    navigate("/privacy");
                    setActiveMenu(null);
                  }}
                >
                  Privacy & Policy
                </p>
                <p
                  onClick={() => {
                    navigate("/help");
                    setActiveMenu(null);
                  }}
                >
                  Help Center
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
