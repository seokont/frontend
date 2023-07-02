import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div style={{ width: "100%", height: "60px", backgroundColor: "#ccc" }}>
        <nav>
          <ul style={{ listtyle: "none", margin: "0", paddingLeft: "0" }}>
            <li style={{ display: "inline-block", padding: "10px" }}>
              <Link to="/frontend">Home</Link>
            </li>
            <li style={{ display: "inline-block", padding: "10px" }}>
              <Link to="/two">Page Two</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
