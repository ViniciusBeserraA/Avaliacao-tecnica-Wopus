/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, LogOut } from "lucide-react";
import TaskDialog from "../taskDialog/create";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  loadTasks: (currentPage: any, search: any, status: any) => void;
  onLogout: () => void;
  createTask: (task: any) => Promise<void>;
  currentPage: number;
};

export default function Header({
  search,
  setSearch,
  loadTasks,
  onLogout,
  createTask,
  currentPage,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({ title: "", description: "" });
  const [status, setStatus] = useState("");

  const openCreateDialog = () => {
    setTask({ title: "", description: "" });
    setIsOpen(true);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    loadTasks(currentPage, search, status);
  };

  const handleStatusChange = (value: string) => {
    if (value === "todos") {
      setStatus("");
    } else {
      setStatus(value);
    }
    loadTasks(currentPage, search, value === "todos" ? "" : value);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          Gerenciador de Tarefas
        </h1>
        <Button
          variant="outline"
          onClick={onLogout}
          className="bg-primary text-white flex items-center hover:bg-red-700 hover:text-white"
        >
          <LogOut className="mr-2" />
          Sair
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Pesquisar tarefa..."
          className="w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-1/6 bg-primary text-white max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
            <SelectItem value="EM_PROGRESSO">Em progresso</SelectItem>
            <SelectItem value="CONCLUIDA">Concluída</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={openCreateDialog}
          className="bg-primary text-white flex items-center hover:bg-red-700 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Criar Tarefa
        </Button>
      </div>

      <TaskDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        createTask={createTask}
      />
    </div>
  );
}
