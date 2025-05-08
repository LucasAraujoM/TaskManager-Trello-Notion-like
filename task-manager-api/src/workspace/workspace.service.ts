import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WorkspaceDto } from './dto/workspace.dto';

@Injectable()
export class WorkspaceService {
    constructor(private prisma: PrismaService) {}

    async getAllWorkspaces() {
        const workspaces = await this.prisma.workspace.findMany();
        if (!workspaces) {
            return [];
        }
        return workspaces;
    }
    async getWorkspaceById(id: string) {
        const workspace = await this.prisma.workspace.findUnique({
            where: {
                id,
            },
        });
        if (!workspace) {
            return [];
        }
        return workspace;
    }
    async createWorkspace(workspace: WorkspaceDto) {
        try{
            const newWorkspace = await this.prisma.workspace.create({
                data: workspace,
            });
            return newWorkspace;
        } catch (error) {
            throw new BadRequestException('Failed to create workspace');
        }
    }
    
}