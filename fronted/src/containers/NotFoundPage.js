import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage(props) {
  return (
    <div>
      <h1>Not Found</h1>
      <Link to="/">Back</Link>
    </div>
  );
}
