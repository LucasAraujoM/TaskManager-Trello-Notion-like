import { IsString, IsNotEmpty } from 'class-validator';

export class BoardDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    workspaceId: string;
}
