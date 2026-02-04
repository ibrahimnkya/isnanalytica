"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const user_service_1 = require("./modules/user/user.service");
const user_entity_1 = require("./modules/user/user.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(user_service_1.UserService);
    const adminEmail = 'admin@isn.io';
    const existingAdmin = await userService.findOne(adminEmail);
    if (!existingAdmin) {
        console.log(`Creating default admin user: ${adminEmail}`);
        await userService.create({
            email: adminEmail,
            passwordHash: 'admin123',
            role: user_entity_1.UserRole.ADMIN,
            fullName: 'System Administrator'
        });
        console.log('Admin user created successfully.');
    }
    else {
        console.log('Admin user already exists.');
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map