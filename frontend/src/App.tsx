import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TodoDialog } from '@/components/todos/TodoDialog';
import { TodoItem } from '@/components/todos/TodoItem';
import { TodoFilters } from '@/components/todos/TodoFilters';
import { Pagination } from '@/components/todos/Pagination';
import { todoApi } from '@/api/todos';
import type { Todo, FilterTodoDto, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filters, setFilters] = useState<FilterTodoDto>({
    page: 1,
    limit: 10,
  });

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await todoApi.getAll(filters);
      setTodos(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const handleCreateTodo = async (data: CreateTodoDto) => {
    try {
      await todoApi.create(data);
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (data: UpdateTodoDto) => {
    if (!selectedTodo) return;
    try {
      await todoApi.update(selectedTodo.id, data);
      fetchTodos();
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('آیا از حذف این وظیفه اطمینان دارید؟')) return;
    try {
      await todoApi.delete(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedTodo(null);
    }
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleSave = (data: CreateTodoDto | UpdateTodoDto) => {
    if (selectedTodo) {
      handleUpdateTodo(data as UpdateTodoDto);
    } else {
      handleCreateTodo(data as CreateTodoDto);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">مدیریت وظایف</h1>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            افزودن وظیفه
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <TodoFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {loading ? (
          <div className="text-center py-12">در حال بارگذاری...</div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">هیچ وظیفه‌ای یافت نشد</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="bg-white rounded-lg shadow p-4">
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}

        <TodoDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          todo={selectedTodo}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default App;
