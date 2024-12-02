"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Gerenciador de Tarefas
        </h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="bg-primary text-white flex items-center hover:bg-red-700 hover:text-white"
        >
          <LogOut className="mr-2 " /> Sair
        </Button>
      </div>

      <div className="mb-6 flex items-center space-x-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar tarefa..."
          className="w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white flex items-center hover:bg-red-700 hover:text-white">
              <Plus className="h-5 w-5" />
              <span>Criar Tarefa</span>
            </Button>
          </DialogTrigger>
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
              <Input
                type="text"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Descrição"
                className="w-full"
              />

              <Select
                value={newTask.status}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, status: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTask}>Criar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="rounded-lg overflow-hidden shadow-md">
        <TableHeader>
          <TableRow className="bg-primary text-white hover:bg-primary">
            <TableCell className="py-3 px-4 font-semibold">ID</TableCell>
            <TableCell className="py-3 px-4 font-semibold">Título</TableCell>
            <TableCell className="py-3 px-4 font-semibold">Descrição</TableCell>
            <TableCell className="py-3 px-4 font-semibold">Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task, index) => (
            <TableRow
              key={task.id}
              className={`${
                index % 2 === 0 ? "" : "bg-white"
              } transition duration-200`}
            >
              <TableCell className="py-3 px-4 text-gray-800">
                {task.id}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-800">
                {task.title}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-800">
                {task.description}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-800">
                <span
                  className={`px-2 py-0.5 rounded-full  text-xs font-semibold ${
                    task.status === "Pendente"
                      ? "bg-orange-100 text-orange-800"
                      : task.status === "Em andamento"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
