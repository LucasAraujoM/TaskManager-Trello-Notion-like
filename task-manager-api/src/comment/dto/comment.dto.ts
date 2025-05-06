import { IsString, IsNotEmpty } from 'class-validator';

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    taskId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
