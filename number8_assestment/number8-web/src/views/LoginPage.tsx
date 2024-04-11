import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/layouts/Header";
import { Footer } from "@components/layouts/Footer";
import { useAuth } from "@hooks/useAuth";
import axios from "axios";
import Input from "@components/atoms/Input";
import Button from "@components/atoms/Button";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authenticate(username, password);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setLoginError("* Incorrect credentials.");
      } else {
        setLoginError("* Login failed.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4 text-center font-bold">
              <h1 className="font-siz">Login</h1>
            </div>
            <div className="mb-4">
              <Input
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                name="passoword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />
            </div>
            {loginError && (
              <div
                className="px-4 py-3 mb-4 rounded relative text-red text-red-500"
                role="alert"
              >
                <span className="block sm:inline">{loginError}</span>
              </div>
            )}
            <div className="flex items-center justify-center">
              <Button isPrimary={true} onClick={() => {}}>
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
