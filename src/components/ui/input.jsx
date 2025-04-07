import React from "react";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full ${className || ""}`}
    ref={ref}
    {...props}
  />
));

Input.displayName = "Input";

export { Input }; 