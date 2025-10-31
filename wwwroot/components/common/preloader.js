import React from "react";

const Preloader = () => {
  return (
    <div id="preloader">
      <div className="plod">
        <span className="lod1">
          <img src="/frontend/images/loder/1.png" alt="preloader" loading="lazy" />
        </span>
        <span className="lod2">
          <img src="/frontend/images/loder/2.png" alt="preloader" loading="lazy" />
        </span>
        <span className="lod3">
          <img src="/frontend/images/loder/3.png" alt="preloader" loading="lazy" />
        </span>
      </div>
    </div>
  );
};

export default Preloader;
