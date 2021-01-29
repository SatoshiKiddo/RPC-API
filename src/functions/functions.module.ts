import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[UsersModule],
  providers: [FunctionsService]
})
export class FunctionsModule {}
