/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "../lib/axios";

const taskService = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async (
    page: number,
    title: string = "",
    status: string = ""
  ) => {
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
          limit: 10,
          title,
          status,
        },
      });

      return response.data;
    } catch (error) {
      setError("Erro ao carregar as tarefas.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (newTask: object) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setError("Erro ao criar tarefa.");
    }
  };

  const updateTask = async (updatedTask: object) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/tasks/`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setError("Erro ao atualizar tarefa.");
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setError("Erro ao excluir tarefa.");
    }
  };

  return {
    tasks,
    totalTasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default taskService;
