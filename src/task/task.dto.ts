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
  TO_DO = 'PENDENTE',
  IN_PROGRESS = 'EM_PROGRESSO',
  DONE = 'CONCLUÍDA',
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
  status: TaskStatusEnum = TaskStatusEnum.TO_DO;

  @IsOptional()
  creationDate: Date;

  @IsDateString()
  @IsOptional()
  completionDate: Date;
}

export interface findAllParameters {
  title: string;
  status: string;
}
