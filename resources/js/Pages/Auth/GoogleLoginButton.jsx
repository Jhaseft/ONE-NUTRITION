import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  return (
    <a
      href={route("google.redirect")}
      className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl 
                 border border-gray-300 bg-white text-gray-700
                 hover:bg-gray-100 transition-all duration-300 shadow
                 active:scale-95 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
    >
      <FcGoogle className="text-2xl" />
      <span className="font-medium text-sm tracking-wide">
        Continuar con Google
      </span>
    </a>
  );
}
