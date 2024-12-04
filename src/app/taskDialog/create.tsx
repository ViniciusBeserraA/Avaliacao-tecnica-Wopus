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
import axios from "../../lib/axios";
import { toast } from "sonner";

type CreateTaskDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function CreateTaskDialog({
  isOpen,
  setIsOpen,
}: CreateTaskDialogProps) {
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!task.title || !task.description) {
      toast("Título e descrição são obrigatórios.", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    setLoading(true);

    try {
      // Enviar a requisição para criar a tarefa
      const token = localStorage.getItem("token");
      const response = await axios.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Tarefa criada:", response.data);

      toast("Tarefa criada com sucesso!", {
        style: { backgroundColor: "green", color: "white" },
      });

      setIsOpen(false);
      setTask({ title: "", description: "" }); // Limpar os campos após o envio
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      toast(error.response?.data?.message || "Erro ao criar tarefa.", {
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
