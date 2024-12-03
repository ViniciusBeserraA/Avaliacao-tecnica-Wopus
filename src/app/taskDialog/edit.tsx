import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

type EditTaskDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: { title: string; description: string; status: string };
  onSave: (updatedTask: {
    title: string;
    description: string;
    status: string;
  }) => void;
};

export default function EditTaskDialog({
  isOpen,
  setIsOpen,
  task,
  onSave,
}: EditTaskDialogProps) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleSave = () => {
    if (updatedTask.title && updatedTask.description && updatedTask.status) {
      onSave(updatedTask);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Altere os campos abaixo para editar a tarefa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            placeholder="Título da tarefa"
            className="w-full"
          />
          <Textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            placeholder="Descrição da tarefa"
            className="w-full"
          />
          <Select
            value={updatedTask.status}
            onValueChange={(value) =>
              setUpdatedTask({ ...updatedTask, status: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em progresso">Em progresso</SelectItem>
              <SelectItem value="Concluída">Concluída</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
