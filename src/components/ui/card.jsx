import React from "react";

const Card = ({ className, ...props }) => (
  <div className={`bg-white rounded-lg shadow-md ${className || ""}`} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={`p-4 ${className || ""}`} {...props} />
);

export { Card, CardContent }; 