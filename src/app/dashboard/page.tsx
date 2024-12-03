"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../header/page";
import TableComponent from "../table/page";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const tasks = [
  {
    id: 1,
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    status: "Em andamento",
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
    status: "Em andamento",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Em andamento",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleCreateTask = () => {
    tasks.push({ ...newTask, id: tasks.length + 1 });
    setIsOpen(false);
    setNewTask({
      title: "",
      description: "",
      status: "Em andamento",
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        search={search}
        setSearch={setSearch}
        onLogout={handleLogout}
        onOpenCreateTaskDialog={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para criar uma nova tarefa.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Título da tarefa"
              className="w-full"
            />
            <Textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Descrição da tarefa"
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTask}>Criar Tarefa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TableComponent tasks={filteredTasks} />
    </div>
  );
}
