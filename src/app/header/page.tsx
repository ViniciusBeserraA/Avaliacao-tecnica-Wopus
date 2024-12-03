import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, LogOut } from "lucide-react";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  onLogout: () => void;
  onOpenCreateTaskDialog: () => void;
};

export default function Header({
  search,
  setSearch,
  onLogout,
  onOpenCreateTaskDialog,
}: HeaderProps) {
  return (
    <div className="mb-6">
      {/* Título no topo à esquerda */}
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

      {/* Caixa de pesquisa e botão de criar tarefa */}
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
          onClick={onOpenCreateTaskDialog}
          className="bg-primary text-white flex items-center hover:bg-red-700 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Criar Tarefa
        </Button>
      </div>
    </div>
  );
}
