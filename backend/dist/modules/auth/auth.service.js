"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const organization_service_1 = require("../organization/organization.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    userService;
    jwtService;
    organizationService;
    constructor(userService, jwtService, organizationService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.organizationService = organizationService;
    }
    async validateUser(email, pass) {
        const user = await this.userService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(registerDto) {
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
    async forgotPassword(email) {
        const user = await this.userService.findOne(email);
        if (!user) {
            return { message: 'If your email is in our system, you will receive a reset link.' };
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        await this.userService.update(user.id, {
            resetToken: token,
            resetTokenExpires: expires,
        });
        console.log(`Password reset token for ${email}: ${token}`);
        return { message: 'If your email is in our system, you will receive a reset link.' };
    }
    async resetPassword(token, newPassword) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        organization_service_1.OrganizationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map