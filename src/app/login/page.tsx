"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "../../lib/axios";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha inválidos. Tente novamente.");
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/auth/register", { email, password });
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      setTab("login");
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <Image src="/assets/logo.svg" alt="Logo" width={105} height={64} />
        </div>
        <h2 className="text-white text-2xl mb-6 text-center">Task Manager</h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab("login")}
            className={`px-4 py-2 rounded-t-lg ${
              tab === "login"
                ? "bg-primary text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-4 py-2 rounded-t-lg ${
              tab === "register"
                ? "bg-primary text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Cadastro
          </button>
        </div>

        {tab === "login" && (
          <form onSubmit={handleSubmitLogin}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="text-white text-md block mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-white text-md block mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md transition duration-300"
            >
              Entrar
            </button>
          </form>
        )}

        {tab === "register" && (
          <form onSubmit={handleSubmitRegister}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="text-white text-md block mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-white text-md block mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md transition duration-300"
            >
              Cadastrar usuário
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
