import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SupersetService } from './superset.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('superset')
export class SupersetController {
    constructor(private supersetService: SupersetService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('guest-token')
    async getGuestToken(@Request() req: any, @Body('dashboardId') dashboardId: string) {
        const token = await this.supersetService.getGuestToken(req.user, dashboardId);
        return { token };
    }
}
