import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { OrganizationService } from '../organization/organization.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private organizationService: OrganizationService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: any) {
        // Check if user exists
        const existingUser = await this.userService.findOne(registerDto.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        let organization = null;
        if (registerDto.companyName) {
            organization = await this.organizationService.createOrganization({
                name: registerDto.companyName,
            });
        }

        const user = await this.userService.create({
            email: registerDto.email,
            passwordHash: registerDto.password,
            fullName: registerDto.fullName,
            organization: organization,
            role: registerDto.role || 'viewer'
        });

        return this.login(user);
    }

    async forgotPassword(email: string) {
        const user = await this.userService.findOne(email);
        if (!user) {
            // We don't want to reveal if a user exists
            return { message: 'If your email is in our system, you will receive a reset link.' };
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date();
        expires.setHours(expires.getHours() + 1); // 1 hour expiry

        await this.userService.update(user.id, {
            resetToken: token,
            resetTokenExpires: expires,
        });

        // In a real app, send an email here. For now, we log it.
        console.log(`Password reset token for ${email}: ${token}`);

        return { message: 'If your email is in our system, you will receive a reset link.' };
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await this.userService.findByResetToken(token);
        if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
            throw new Error('Invalid or expired reset token');
        }

        await this.userService.update(user.id, {
            passwordHash: newPassword,
            resetToken: null,
            resetTokenExpires: null,
        });

        return { message: 'Password has been reset successfully.' };
    }
}
