import React from "react";

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className || ""}`}
    ref={ref}
    {...props}
  />
));

Button.displayName = "Button";

export { Button }; 