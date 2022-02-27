import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

const Sidebar = () => {
  const elem = window.location.pathname;

  return (
    <div className="custom-sidebar">
      <ul>
        <li>
          <Link
            className={cx(elem === "/admin/add" && "active")}
            to="/admin/add"
          >
            Add Property
          </Link>
        </li>
        <li>
          <Link
            className={cx(elem === "/admin/properties" && "active")}
            to="/admin/properties"
          >
            Properties
          </Link>
        </li>
        <li>
          <Link className="text-black" to="/">
            Back to User Panel
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
