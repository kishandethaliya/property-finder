import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = (props) => {
  const { children } = props;
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="custom-container">{children}</div>
    </div>
  );
};

export default AdminLayout;
