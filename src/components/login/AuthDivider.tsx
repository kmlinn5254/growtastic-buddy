
import React from "react";

const AuthDivider = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-2 text-gray-500">
          or continue with
        </span>
      </div>
    </div>
  );
};

export default AuthDivider;
