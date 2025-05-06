import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BoardDto } from './dto/board.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BoardService {
    constructor(private prisma: PrismaService) {}
    
    async getAllBoards() {
        const boards = await this.prisma.board.findMany();
        if (!boards) {
            throw new NotFoundException('Boards not found');
        }
        return boards;
    }
    async getBoardById(id: string) {
        const board = await this.prisma.board.findUnique({
            where: {
                id,
            },
        });
        if (!board) {
            throw new NotFoundException('Board not found');
        }
        return board;
    }
    async createBoard(board: BoardDto) {
        try{
            const newBoard = await this.prisma.board.create({
                data: {
                    name: board.name,
                    workspaceId: board.workspaceId,
                },
            });
            return newBoard;
        } catch (error) {
            if(error.code === 'P2002') {
                throw new BadRequestException('Board with this name already exists');
            }
            if(error.code === 'P2003') {
                throw new BadRequestException('Workspace not found');
            }
            throw new BadRequestException('Failed to create board');
        }
    }
}
