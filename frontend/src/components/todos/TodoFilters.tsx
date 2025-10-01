import type { FilterTodoDto } from '@/types/todo';
import { TodoStatus, TodoPriority } from '@/types/todo';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TodoFiltersProps {
  filters: FilterTodoDto;
  onFilterChange: (filters: FilterTodoDto) => void;
}

export function TodoFilters({ filters, onFilterChange }: TodoFiltersProps) {
  const handleSearchChange = (search: string) => {
    onFilterChange({ ...filters, search, page: 1 });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status === 'all' ? undefined : (status as TodoStatus),
      page: 1,
    });
  };

  const handlePriorityChange = (priority: string) => {
    onFilterChange({
      ...filters,
      priority: priority === 'all' ? undefined : (priority as TodoPriority),
      page: 1,
    });
  };

  const clearFilters = () => {
    onFilterChange({ page: 1, limit: filters.limit });
  };

  const hasActiveFilters = filters.search || filters.status || filters.priority;

  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1">
        <label className="text-sm font-medium">جستجو</label>
        <Input
          placeholder="جستجو در عنوان..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div className="w-48">
        <label className="text-sm font-medium">وضعیت</label>
        <Select
          value={filters.status || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value={TodoStatus.PENDING}>در انتظار</SelectItem>
            <SelectItem value={TodoStatus.IN_PROGRESS}>در حال انجام</SelectItem>
            <SelectItem value={TodoStatus.COMPLETED}>انجام شده</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <label className="text-sm font-medium">اولویت</label>
        <Select
          value={filters.priority || 'all'}
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value={TodoPriority.LOW}>کم</SelectItem>
            <SelectItem value={TodoPriority.MEDIUM}>متوسط</SelectItem>
            <SelectItem value={TodoPriority.HIGH}>زیاد</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters}>
          <X className="h-4 w-4 ml-2" />
          پاک کردن
        </Button>
      )}
    </div>
  );
}
