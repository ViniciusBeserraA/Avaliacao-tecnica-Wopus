/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../header/page";
import TableComponent from "../table/page";
import taskService from "../../services/taskService";

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage, setTasksPerPage] = useState<number>(10);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const {
    loading,

    loadTasks,
  } = taskService();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  useEffect(() => {
    loadTasks(currentPage, search, status);
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, []);

  const changePage = (page: number) => {
    setCurrentPage(page);
    loadTasks(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        search={search}
        setSearch={setSearch}
        loadTasks={loadTasks}
        onLogout={handleLogout}
        currentPage={currentPage}
      />

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TableComponent
          tasks={tasks}
          loading={loading}
          error={error}
          totalTasks={totalTasks}
          currentPage={currentPage}
          tasksPerPage={tasksPerPage}
          changePage={changePage}
        />
      )}
    </div>
  );
}
