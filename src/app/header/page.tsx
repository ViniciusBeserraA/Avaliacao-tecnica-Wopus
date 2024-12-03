import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, LogOut } from "lucide-react";
import TaskDialog from "../taskDialog/create";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  onLogout: () => void;
};

export default function Header({ search, setSearch, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({ title: "", description: "" });

  const handleCreateTask = () => {
    console.log("Tarefa criada:", task);
    setIsOpen(false);
    setTask({ title: "", description: "" });
  };

  const openCreateDialog = () => {
    setTask({ title: "", description: "" });
    setIsOpen(true);
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
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar tarefa..."
          className="w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        onSave={handleCreateTask}
      />
    </div>
  );
}
