import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/spell-grammar">Spell & Grammar</Link>
          </li>
          <li>
            <Link to="/translation">Translation</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main> {/* Render the pages inside Layout */}
    </div>
  );
};

export default Layout;
