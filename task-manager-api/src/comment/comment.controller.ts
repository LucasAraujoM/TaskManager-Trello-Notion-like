import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get(':id')
    getCommentById(@Param('id') id: string) {
        return this.commentService.getCommentById(id);
    }

    @Post()
    createComment(@Body() comment: CommentDto) {
        return this.commentService.createComment(comment);
    }

    @Delete(':id')
    deleteComment(@Param('id') id: string) {
        return this.commentService.deleteComment(id);
    }
}
