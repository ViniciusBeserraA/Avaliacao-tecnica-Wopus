/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import TaskDialog from "../taskDialog/edit";
import ConfirmDialog from "@/components/confirmDialog";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  completionDate: "";
};

type TableComponentProps = {
  tasks: Task[];
  loadTasks: () => void;
  updatedTask: (task: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loading: boolean;
  error: string;
  totalTasks: number;
  currentPage: number;
  tasksPerPage: number;
  changePage: (page: number) => void;
};

export default function TaskTable({
  tasks,
  loading,
  error,
  updatedTask,
  deleteTask,
  totalTasks,
  currentPage,
  tasksPerPage,
  changePage,
}: TableComponentProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    changePage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageNumbers;
  };
  const handleEdit = (taskToEdit: Task) => {
    setSelectedTask(taskToEdit);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask.id.toString());
        setIsDeleteOpen(false);
        setSelectedTask(null);
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    }
  };

  const openDeleteDialog = (taskToDelete: Task) => {
    setSelectedTask(taskToDelete);
    setIsDeleteOpen(true);
  };

  return (
    <div>
      <Table className="rounded-lg overflow-hidden shadow-md">
        <TableHeader>
          <TableRow className="bg-primary text-white hover:bg-primary">
            <TableCell className="py-2 px-4 font-semibold">Título</TableCell>
            <TableCell className="py-3 px-4 font-semibold">Descrição</TableCell>
            <TableCell className="py-3 px-4 font-semibold">
              Data de registro
            </TableCell>
            <TableCell className="py-3 px-4 font-semibold">
              Data de conclusão
            </TableCell>
            <TableCell className="py-3 px-4 font-semibold">Status</TableCell>
            <TableCell className="py-3 px-4 font-semibold">Ações</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            [...Array(5)].map((_, index) => (
              <TableRow key={index} className="transition duration-200">
                <TableCell className="py-2 px-4">
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Skeleton className="w-full h-6" />
                </TableCell>
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task, index) => (
              <TableRow
                key={task.id}
                className={`${
                  index % 2 === 0 ? "" : "bg-white"
                } transition duration-200`}
              >
                <TableCell className="py-2 px-4 text-gray-800">
                  {task.title}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-800 break-words max-w-[200px]">
                  {task.description}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-800">
                  {format(new Date(task.creationDate), "dd/MM/yyyy HH:mm:ss")}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-800">
                  {task.completionDate
                    ? format(
                        new Date(task.completionDate),
                        "dd/MM/yyyy HH:mm:ss"
                      )
                    : "-"}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-800">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      task.status === "PENDENTE"
                        ? "bg-orange-100 text-orange-800"
                        : task.status === "EM_PROGRESSO"
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
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
                        onClick={() => handleEdit(task)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black px-3 py-1 rounded-md whitespace-nowrap">
                        Alterar tarefa
                      </span>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={() => openDeleteDialog(task)}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black px-3 py-1 rounded-md whitespace-nowrap">
                        Excluir tarefa
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </PaginationPrevious>
          </PaginationItem>

          {renderPageNumbers()}

          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Próximo
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <TaskDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        updatedTask={updatedTask}
        initialTask={selectedTask}
      />

      {isDeleteOpen && (
        <ConfirmDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          onConfirm={handleDelete}
          title="Excluir Tarefa"
          description="Essa ação não pode ser desfeita. Tem certeza de que deseja excluir esta tarefa?"
        />
      )}
    </div>
  );
}
