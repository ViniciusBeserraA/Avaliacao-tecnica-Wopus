"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-center mb-6">
          <Image src="/assets/logo.svg" alt="Logo" width={105} height={64} />
        </div>
        <h2 className="text-white text-2xl mb-6 text-center">
          Página de Acesso
        </h2>
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
          <label htmlFor="password" className="text-white text-lg block mb-2">
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
    </div>
  );
}
