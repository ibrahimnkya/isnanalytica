import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { DataSourceModule } from '../data-source/data-source.module';

@Module({
  imports: [DataSourceModule],
  providers: [QueryService],
  controllers: [QueryController],
})
export class QueryModule { }
