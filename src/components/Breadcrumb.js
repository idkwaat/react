import React from "react";
import PropTypes from "prop-types";

const Breadcrumb = ({ title, current }) => {
  return (
    <div
      className="breadcumb-wrapper"
      data-bg-src="assets/img/bg/breadcumb-bg.png"
    >
      <div className="container z-index-common">
        <div className="breadcumb-content text-center">
          <h1 className="breadcumb-title">{title}</h1>
          <div className="breadcumb-menu-wrap">
            <div className="breadcumb-menu">
              <span>
                <a href="/">Trang chủ</a>
              </span>
              <span>{current}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
};

export default Breadcrumb;
