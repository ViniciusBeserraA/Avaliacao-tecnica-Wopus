/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../header/page";
import TableComponent from "../table/page";
import axios from "../../lib/axios";

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
      console.log(response.data);
    } catch (err) {
      setError("Erro ao carregar as tarefas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (status !== "all" ? task.status === status : true));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        search={search}
        setSearch={setSearch}
        onLogout={handleLogout}
        status={status}
        setStatus={setStatus}
      />

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TableComponent tasks={filteredTasks} />
      )}
    </div>
  );
}
