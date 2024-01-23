import React, { useEffect } from "react";
import "./Header.css";
import mujiLogo from "../img/mujilogo.png";
import { Link } from "react-router-dom";
import { localToken } from "../../utils/auth";

function Header() {
  useEffect(() => {
    console.log("sss");
    const tok = localToken.get();
    console.log("localToken.get()", tok);
  }, []);
  return (
    <div className="min-h-screen">
      <header className="container mx-auto">
        <div className="header-content">
          <Link to="/">
            <img src={mujiLogo} alt="MUJI 로고" style={{ height: "50px" }} />
          </Link>
          <div className="search-bar">
            <div
              className="search-container"
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <input
                type="text"
                id="search-input"
                style={{
                  flex: 1,
                  padding: "10px 40px 10px 10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="search-icon"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "10px",
                  color: "#ccc",
                  cursor: "pointer",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
          <div className="icons">
            <Link to="/login">
              <div className="icon-item">
                {IconItems[0].icon()}
                <span>{IconItems[0].label}</span>
              </div>
            </Link>
            <Link to="/cart">
              <div className="icon-item">
                {IconItems[2].icon()}
                <span>{IconItems[2].label}</span>
              </div>
            </Link>
            <Link to="/order">
              <div className="icon-item">
                {IconItems[1].icon()}
                <span>{IconItems[1].label}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="product-list">
        <div className="sub-section">인기상품</div>
        <div className="sub-section">주간특가</div>
        <div className="sub-section">매거진</div>
        <div className="sub-section">아울렛</div>
      </div>
    </div>
  );
}

const focusSearchInput = () => {
  document.getElementById("search-input").focus();
};

const IconItems = [
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
    ),
    label: localToken.get() ? "로그아웃" : "로그인",
  },
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    label: "주문배송",
  },
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    ),
    label: "장바구니",
  },
];

export default Header;
