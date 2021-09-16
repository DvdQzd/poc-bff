import { Controller, Get, Post } from "@nestjs/common";
import { Permissions } from "../decorator/permissions.decorator";

@Controller('module')
export class ModuleController {
    @Get()
    @Permissions('read')
    async getModules(): Promise<any> {
        return 'getting modules';
    }

    @Post()
    @Permissions('read', 'write')
    async createModule(): Promise<any> {
        return 'creating module';
    }
}
