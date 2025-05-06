import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async getCommentById(id: string) {
        return this.prisma.comment.findUnique({
            where: {
                id,
            },
        });
    }
    async createComment(comment: CommentDto) {
        return this.prisma.comment.create({
            data: {
                content: comment.content,
                taskId: comment.taskId,
                userId: comment.userId, 
            },
        });
    }
    async deleteComment(id: string) {
        return this.prisma.comment.delete({
            where: {
                id,
            },
        });
    }
}
