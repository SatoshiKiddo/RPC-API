import { Module } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../model/usuario.entity';
import { Transaccion } from 'src/model/transaccion.entity';
import { Cuenta } from 'src/model/cuenta.entity';
import { Repository, } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Cuenta, Transaccion])],
  providers: [UsuariosService, Repository],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsersModule {}
