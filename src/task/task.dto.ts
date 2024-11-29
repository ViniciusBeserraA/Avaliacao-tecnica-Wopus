import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
  PENDENTE,
  EM_PROGRESSO,
  CONCLUIDA,
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum = TaskStatusEnum.PENDENTE;

  @IsOptional()
  creationDate: Date;

  @IsDateString()
  @IsOptional()
  completionDate: Date;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}
