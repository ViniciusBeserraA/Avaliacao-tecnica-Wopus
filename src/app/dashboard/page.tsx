"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../header/page";
import TableComponent from "../table/page";

const tasks = [
  {
    id: 1,
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    status: "Em progresso",
  },
  {
    id: 2,
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    status: "Concluída",
  },
  {
    id: 3,
    title: "Tarefa 3",
    description: "Descrição da tarefa 3",
    status: "Pendente",
  },
  {
    id: 4,
    title: "Tarefa 4",
    description: "Descrição da tarefa 4",
    status: "Em progresso",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const handleLogout = () => {
    router.push("/login");
  };

  const filteredTasks = tasks
    .filter((task) => {
      return task.title.toLowerCase().includes(search.toLowerCase());
    })
    .filter((task) => {
      if (status) {
        return task.status === status;
      }
      return true;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        search={search}
        setSearch={setSearch}
        onLogout={handleLogout}
        status={status}
        setStatus={setStatus}
      />
      <TableComponent tasks={filteredTasks} />
    </div>
  );
}
