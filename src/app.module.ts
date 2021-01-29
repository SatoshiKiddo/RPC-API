import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { FunctionsModule } from './functions/functions.module';
import { Usuario } from './model/usuario.entity';
import { Transaccion } from 'src/model/transaccion.entity';
import { Cuenta } from 'src/model/cuenta.entity';
import { FunctionsService } from './functions/functions.service';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [Usuario, Transaccion, Cuenta],
    synchronize: false,
  }), FunctionsModule],
  controllers: [AppController],
  providers: [AppService, FunctionsService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
