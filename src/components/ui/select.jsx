import React, { createContext, useContext, useState } from "react";

const SelectContext = createContext({});

const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, className, ...props }) => {
  const { open, setOpen } = useContext(SelectContext);
  
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className || ""}`}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

const SelectContent = ({ className, children, ...props }) => {
  const { open, setOpen } = useContext(SelectContext);
  
  if (!open) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 z-10" 
        onClick={() => setOpen(false)}
      />
      <div 
        className={`absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

const SelectItem = ({ value, className, children, ...props }) => {
  const { value: selectedValue, onValueChange, setOpen } = useContext(SelectContext);
  
  const handleClick = () => {
    onValueChange(value);
    setOpen(false);
  };
  
  return (
    <div
      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${selectedValue === value ? "bg-blue-50 text-blue-600" : ""} ${className || ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }; 