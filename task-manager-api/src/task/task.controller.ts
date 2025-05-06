import { Controller, Delete, Get, Param, Post, Put, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';


@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}
    @Get(':boardId')
    getAllTasks(@Param('boardId') boardId: string) {
        return this.taskService.getAllTasks(boardId);
    }
    @Post('create')
    createTask(@Body() task: TaskDto) {
        return this.taskService.createTask(task);
    }
    @Put(':id')
    updateTask(@Param('id') id: string, @Body() task: TaskDto) {
        return this.taskService.updateTask(id, task);
    }
    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }
    @Get(':id')
    getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }
    @Get(':id/comments')
    getCommentsByTaskId(@Param('id') id: string) {
        return this.taskService.getCommentsByTaskId(id);
    }
}
