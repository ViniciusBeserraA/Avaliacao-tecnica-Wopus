export class Task {
  id: string; // Usaremos UUID
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em_progresso' | 'concluida';
  dataCriacao: Date;
  dataConclusao?: Date;
}
