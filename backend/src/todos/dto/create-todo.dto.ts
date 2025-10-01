import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { TodoStatus, TodoPriority } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;
}
