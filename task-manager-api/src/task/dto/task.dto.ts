import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    boardId: string;

    @IsString()
    @IsNotEmpty()
    createdById: string;
    
    @IsString()
    @IsOptional()
    assignedToId: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsNotEmpty()
    title: string;

}
