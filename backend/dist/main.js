"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    let port = parseInt(process.env.PORT || '3001');
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await app.listen(port);
            console.log(`Backend is running on: http://localhost:${port}`);
            return;
        }
        catch (error) {
            if (error.code === 'EADDRINUSE') {
                console.warn(`Port ${port} is in use, trying ${port + 1}...`);
                port++;
                retries++;
            }
            else {
                throw error;
            }
        }
    }
    throw new Error(`Could not find an available port after ${maxRetries} attempts.`);
}
bootstrap();
//# sourceMappingURL=main.js.map