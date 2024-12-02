import { Module } from '@nestjs/common';
import { EstatesService } from './estates.service';
import { EstatesController } from './estates.controller';

@Module({
  controllers: [EstatesController],
  providers: [EstatesService],
})
export class EstatesModule {}
