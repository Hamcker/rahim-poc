import type { Todo } from '@/types/todo';
import { TodoStatus, TodoPriority } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const statusLabels = {
  [TodoStatus.PENDING]: 'در انتظار',
  [TodoStatus.IN_PROGRESS]: 'در حال انجام',
  [TodoStatus.COMPLETED]: 'انجام شده',
};

const priorityLabels = {
  [TodoPriority.LOW]: 'کم',
  [TodoPriority.MEDIUM]: 'متوسط',
  [TodoPriority.HIGH]: 'زیاد',
};

const statusColors = {
  [TodoStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [TodoStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TodoStatus.COMPLETED]: 'bg-green-100 text-green-800',
};

const priorityColors = {
  [TodoPriority.LOW]: 'bg-gray-100 text-gray-800',
  [TodoPriority.MEDIUM]: 'bg-orange-100 text-orange-800',
  [TodoPriority.HIGH]: 'bg-red-100 text-red-800',
};

export function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{todo.title}</h3>
        {todo.description && (
          <p className="text-gray-600 mt-1">{todo.description}</p>
        )}
        <div className="flex gap-2 mt-2">
          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[todo.status]}`}>
            {statusLabels[todo.status]}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[todo.priority]}`}>
            {priorityLabels[todo.priority]}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(todo)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
