import { Module } from '@nestjs/common';
import { SupersetService } from './superset.service';
import { SupersetController } from './superset.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [SupersetController],
    providers: [SupersetService],
    exports: [SupersetService],
})
export class SupersetModule { }
