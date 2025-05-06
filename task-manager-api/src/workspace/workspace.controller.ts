import { Controller, Get, Param, Post, Body} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/workspace.dto';

@Controller('workspace')
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) {}
    @Get()
    getAllWorkspaces() {
        return this.workspaceService.getAllWorkspaces();
    }
    @Get(':id')
    getWorkspaceById(@Param('id') id: string) {
        return this.workspaceService.getWorkspaceById(id);
    }
    @Post('create')
    createWorkspace(@Body() workspace: WorkspaceDto) {
        return this.workspaceService.createWorkspace(workspace);
    }
}
