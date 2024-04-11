import React from "react";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-black text-white p-4 h-12">
      <div className="container mx-auto flex justify-between items-center">
        <div></div>
        {token && (
          <button onClick={handleLogout} className="ml-auto">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
