import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}
    async getAllTasks(boardId: string) {
        return this.prisma.task.findMany({
            where: {
                boardId,
            },  
        });
    }
    async createTask(task: TaskDto) {
        return this.prisma.task.create({
            data: task,
        });
    }
    async updateTask(id: string, task: TaskDto) {
        return this.prisma.task.update({
            where: {
                id,
            },
            data: task,
        });
    }
    async deleteTask(id: string) {
        return this.prisma.task.delete({
            where: {
                id,
            },
        });
    }
    async getTaskById(id: string) {
        return this.prisma.task.findUnique({
            where: {
                id,
            },
        });
    }
    async getCommentsByTaskId(id: string) {
        return this.prisma.comment.findMany({
            where: {
                taskId: id,
            },
        });
    }
}
