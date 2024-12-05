import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, LogOut } from 'lucide-react';
import TaskDialog from '../taskDialog/create';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  loadTasks: (currentPage: any, search: any, status: any) => void;
  onLogout: () => void;
  currentPage: number;
  status: string;
  onStatusChange: (value: string) => void;
};

export default function Header({
  search,
  setSearch,
  loadTasks,
  onLogout,
  status,
  onStatusChange,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openCreateDialog = () => {
    setIsOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusSelect = (value: string) => {
    onStatusChange(value);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mt-5 mb-4">
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
        {/* Campo de busca */}
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange} // Aplica o filtro de pesquisa
          placeholder="Pesquisar tarefa..."
          className="w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Seletor de status */}
        <Select value={status} onValueChange={handleStatusSelect}>
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

        {/* Botão para criar tarefa */}
        <Button
          variant="outline"
          onClick={openCreateDialog}
          className="bg-primary text-white flex items-center hover:bg-red-700 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Criar Tarefa
        </Button>
      </div>

      {/* Dialog para criação de tarefa */}
      <TaskDialog isOpen={isOpen} setIsOpen={setIsOpen} loadTasks={loadTasks} />
    </div>
  );
}
