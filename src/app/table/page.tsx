import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Edit, Trash, CheckCircle } from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

type TableComponentProps = {
  tasks: Task[];
};

export default function TaskTable({ tasks }: TableComponentProps) {
  return (
    <Table className="rounded-lg overflow-hidden shadow-md">
      <TableHeader>
        <TableRow className="bg-primary text-white hover:bg-primary">
          <TableCell className="py-3 px-4 font-semibold">ID</TableCell>
          <TableCell className="py-3 px-4 font-semibold">Título</TableCell>
          <TableCell className="py-3 px-4 font-semibold">Descrição</TableCell>
          <TableCell className="py-3 px-4 font-semibold">Status</TableCell>
          <TableCell className="py-3 px-4 font-semibold">Ações</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow
            key={task.id}
            className={`${
              index % 2 === 0 ? "" : "bg-white"
            } transition duration-200`}
          >
            <TableCell className="py-3 px-4 text-gray-800">{task.id}</TableCell>
            <TableCell className="py-3 px-4 text-gray-800">
              {task.title}
            </TableCell>
            <TableCell className="py-3 px-4 text-gray-800">
              {task.description}
            </TableCell>
            <TableCell className="py-3 px-4 text-gray-800">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
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
            <TableCell className="py-3 px-4 text-gray-800">
              <div className="flex space-x-2">
                <div className="relative group">
                  <button className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black px-3 py-1 rounded-md whitespace-nowrap">
                    Alterar tarefa
                  </span>
                </div>

                <div className="relative group">
                  <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                    <Trash className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black px-3 py-1 rounded-md whitespace-nowrap">
                    Excluir tarefa
                  </span>
                </div>

                <div className="relative group">
                  <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black px-3 py-1 rounded-md whitespace-nowrap">
                    Finalizar tarefa
                  </span>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
