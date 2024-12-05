import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { toast } from 'sonner';

type TaskDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleUpdateTask: (updatedTask: any) => Promise<void>;
  initialTask: any | null;
  loadTasks: (currentPage: number) => void;
};

export default function TaskDialog({
  isOpen,
  setIsOpen,
  handleUpdateTask,
  initialTask,
}: TaskDialogProps) {
  const [task, setTask] = useState<any | null>(initialTask);

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleSave = () => {
    if (!task?.title || !task?.description || !task?.status) {
      toast('Título, descrição e status são obrigatórios.', {
        style: { backgroundColor: 'red', color: 'white' },
        position: 'top-right',
      });
      return;
    }
    handleUpdateTask(task);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription style={{ marginTop: '15px' }}>
            Altere os campos abaixo para editar a tarefa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="text"
            value={task?.title || ''}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Título da tarefa"
            className="w-full"
          />
          <Textarea
            value={task?.description || ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Descrição da tarefa"
            className="w-full"
          />
          <Select
            value={task?.status || ''}
            onValueChange={(value) => setTask({ ...task, status: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDENTE">Pendente</SelectItem>
              <SelectItem value="EM_PROGRESSO">Em progresso</SelectItem>
              <SelectItem value="CONCLUIDA">Concluída</SelectItem>
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
