import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { OrganizationService } from '../organization/organization.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private organizationService;
    constructor(userService: UserService, jwtService: JwtService, organizationService: OrganizationService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: any): Promise<{
        access_token: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
