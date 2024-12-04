/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../header/page";
import TableComponent from "../table/page";
import axios from "../../lib/axios";
import { toast } from "sonner";

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage, setTasksPerPage] = useState<number>(10);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  //Requisicoes
  // Requisição com paginação
  const loadTasks = async (page: number = currentPage) => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit: tasksPerPage,
        },
      });

      setTasks(response.data.tasks);
      setTotalTasks(response.data.total);
    } catch {
      setError("Erro ao carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  };

  //cadastrando
  const createTask = async (task: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Tarefa criada:", response.data);
      loadTasks();
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      setError("Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  // Atualizando
  const updateTask = async (updatedTask: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("/tasks", updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Tarefa atualizada:", response.data);
      loadTasks();
    } catch (error: any) {
      console.error("Erro ao atualizar tarefa:", error);
      setError("Erro ao atualizar tarefa");
    } finally {
      setLoading(false);
    }
  };

  // Excluindo
  const deleteTask = async (taskId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Tarefa excluída com sucesso");

      loadTasks();
    } catch (error: any) {
      console.error("Erro ao excluir tarefa:", error);
      setError("Erro ao excluir tarefa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, []);

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (loginSuccess === "true") {
      toast("Usuário autenticado com sucesso.", {
        duration: 4000,
        style: {
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "20px",
        },
        position: "top-right",
      });

      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (status !== "all" ? task.status === status : true));

  const changePage = (page: number) => {
    setCurrentPage(page);
    loadTasks(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        search={search}
        setSearch={setSearch}
        onLogout={handleLogout}
        status={status}
        setStatus={setStatus}
        createTask={createTask}
      />

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TableComponent
          tasks={filteredTasks}
          loadTasks={loadTasks}
          updatedTask={updateTask}
          deleteTask={deleteTask}
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
