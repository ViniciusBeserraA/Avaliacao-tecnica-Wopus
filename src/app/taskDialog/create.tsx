/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "sonner";

type CreateTaskDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  createTask: (task: any) => Promise<void>;
};

export default function CreateTaskDialog({
  isOpen,
  setIsOpen,
  createTask,
}: CreateTaskDialogProps) {
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!task.title || !task.description) {
      toast("Título e descrição são obrigatórios.", {
        style: { backgroundColor: "red", color: "white" },
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    try {
      await createTask(task);

      toast("Tarefa criada com sucesso!", {
        style: { backgroundColor: "green", color: "white" },
        position: "top-right",
      });
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      toast(error.response?.data?.message || "Erro ao criar tarefa.", {
        style: { backgroundColor: "red", color: "white" },
        position: "top-right",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
          <DialogDescription style={{ marginTop: "15px" }}>
            Preencha os campos abaixo para criar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Título da tarefa"
            className="w-full"
          />
          <Textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Descrição da tarefa"
            className="w-full"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Criar Tarefa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
