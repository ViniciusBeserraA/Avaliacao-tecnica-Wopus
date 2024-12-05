'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../header/page';
import TableComponent from '../table/page';
import taskService from '../../services/taskService';
import { toast } from 'sonner';

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [tasksPerPage, setTasksPerPage] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [toastAutentication, setToastAutentication] = useState(false);

  const { loadTasks } = taskService();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  const fetchTasks = async (page: number, search?: string, status?: string) => {
    try {
      setLoading(true);
      const response = await loadTasks(page, search, status);
      setTasks(response.tasks);
      setTotalTasks(response.total);
      setError('');
    } catch (err) {
      setError('Erro ao carregar as tarefas da tabela');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    fetchTasks(currentPage, search, status);
  };

  const handleStatusChange = (value: string) => {
    const newStatus = value === 'todos' ? '' : value;
    setStatus(newStatus);
    fetchTasks(currentPage, search, newStatus);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    fetchTasks(page, search, status);
  };

  useEffect(() => {
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true' && !toastAutentication) {
      toast('Usuário autenticado com sucesso.', {
        duration: 4000,
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '20px',
        },
        position: 'top-right',
      });
      setToastAutentication(true);
      localStorage.removeItem('loginSuccess');
    }

    fetchTasks(currentPage, search, status);

    if (!localStorage.getItem('token')) {
      router.replace('/login');
    }
  }, [currentPage, search, status, toastAutentication]);

  return (
    <div className="flex flex-col min-h-screen m-6">
      <Header
        search={search}
        setSearch={handleSearch}
        loadTasks={fetchTasks}
        onLogout={handleLogout}
        currentPage={currentPage}
        status={status}
        onStatusChange={handleStatusChange}
      />

      <TableComponent
        tasks={tasks}
        loadTasks={fetchTasks}
        loading={loading}
        error={error}
        totalTasks={totalTasks}
        currentPage={currentPage}
        tasksPerPage={tasksPerPage}
        changePage={changePage}
      />
    </div>
  );
}
