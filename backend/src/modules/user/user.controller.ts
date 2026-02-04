import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('organization/:orgId')
    findAll(@Param('orgId') orgId: string) {
        return this.userService.findAllByOrganization(orgId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Post()
    create(@Body() data: Partial<User>) {
        return this.userService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Partial<User>) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
