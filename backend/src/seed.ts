import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './modules/user/user.service';
import { UserRole } from './modules/user/user.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UserService);

    const adminEmail = 'admin@isn.io';
    const existingAdmin = await userService.findOne(adminEmail);

    if (!existingAdmin) {
        console.log(`Creating default admin user: ${adminEmail}`);
        await userService.create({
            email: adminEmail,
            passwordHash: 'admin123',
            role: UserRole.ADMIN,
            fullName: 'System Administrator'
        });
        console.log('Admin user created successfully.');
    } else {
        console.log('Admin user already exists.');
    }

    await app.close();
}

bootstrap();
