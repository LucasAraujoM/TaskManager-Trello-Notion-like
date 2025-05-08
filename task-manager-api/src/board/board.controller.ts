import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import {BoardDto} from './dto/board.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController{
    constructor(private boardService: BoardService) {}
    @Get()
    getAllBoards() {
        return this.boardService.getAllBoards();
    }
    @Get(':id')
    getBoardById(@Param('id') id: string) {
        return this.boardService.getBoardById(id);
    }
    @Post('create')
    createBoard(@Body() board: BoardDto) {
        return this.boardService.createBoard(board);
    }
}
