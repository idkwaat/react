// src/components/MobileMenu.js
import React from "react";

const MobileMenu = () => {
  return (
    <div className="vs-menu-wrapper">
      <div className="vs-menu-area text-center">
        <div className="mobile-logo">
          {/* Logo từ thư mục public */}
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/logo.svg`}
              alt="ebukz"
              className="logo"
            />
          </a>
          <button className="vs-menu-toggle">
            <i className="fal fa-times"></i>
          </button>
        </div>

        <div className="vs-mobile-menu">
          <ul>
            <li className="menu-item-has-children">
              <a href="/">Home</a>
              <ul className="sub-menu">
                <li><a href="/">Home 1</a></li>
                <li><a href="/">Home 2</a></li>
                <li><a href="/">Home 3</a></li>
              </ul>
            </li>

            <li className="menu-item-has-children">
              <a href="/shop">Shop</a>
              <ul className="sub-menu">
                <li><a href="/shop">Shop</a></li>
                <li><a href="/shop-sidebar">Shop Sidebar</a></li>
                <li><a href="/shop-details">Shop Details</a></li>
              </ul>
            </li>

            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
