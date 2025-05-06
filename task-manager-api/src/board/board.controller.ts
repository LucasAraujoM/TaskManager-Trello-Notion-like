import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import {BoardDto} from './dto/board.dto';

@Controller('board')
export class BoardController {
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
