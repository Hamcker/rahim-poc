import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';
import { TodoStatus, TodoPriority } from '@/types/todo';

interface TodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: Todo | null;
  onSave: (data: CreateTodoDto | UpdateTodoDto) => void;
}

export function TodoDialog({ open, onOpenChange, todo, onSave }: TodoDialogProps) {
  const [formData, setFormData] = useState<CreateTodoDto>({
    title: '',
    description: '',
    status: TodoStatus.PENDING,
    priority: TodoPriority.MEDIUM,
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        status: todo.status,
        priority: todo.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
      });
    }
  }, [todo, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{todo ? 'ویرایش وظیفه' : 'افزودن وظیفه جدید'}</DialogTitle>
            <DialogDescription>
              {todo ? 'اطلاعات وظیفه را ویرایش کنید' : 'وظیفه جدید خود را اضافه کنید'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">عنوان</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">توضیحات</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">وضعیت</Label>
              <Select
                value={formData.status}
                onValueChange={(value: TodoStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TodoStatus.PENDING}>در انتظار</SelectItem>
                  <SelectItem value={TodoStatus.IN_PROGRESS}>در حال انجام</SelectItem>
                  <SelectItem value={TodoStatus.COMPLETED}>انجام شده</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">اولویت</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: TodoPriority) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب اولویت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TodoPriority.LOW}>کم</SelectItem>
                  <SelectItem value={TodoPriority.MEDIUM}>متوسط</SelectItem>
                  <SelectItem value={TodoPriority.HIGH}>زیاد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">ذخیره</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
