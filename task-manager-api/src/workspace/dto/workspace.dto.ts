import { IsString, IsNotEmpty } from 'class-validator';

export class WorkspaceDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
