import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../model/usuario.entity';
import { Transaccion } from 'src/model/transaccion.entity';
import { Cuenta } from 'src/model/cuenta.entity';
import { Connection, QueryRunner} from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private UsuariosRepository: Repository<Usuario>,
    private CuentaRepository: Repository<Cuenta>,
    private TransaccionRepository: Repository<Transaccion>,
    private connection: Connection,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.UsuariosRepository.find();
  }

  findOne(id: string): Promise<Usuario> {
    return this.UsuariosRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.UsuariosRepository.delete(id);
  }

  apertura(documento_id: string, nombre: string, username: string, password: string): Promise<Boolean>{
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT apertura_cuenta($1, $2, $3, $4)', [documento_id, nombre, username , password]);

    queryConnection.release();
    return result;
  }

  consulta_transacciones(numero: number, limite: number): Promise<any>{
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT consulta_transacciones($1, $2)', [numero, limite]);

    queryConnection.release();
    return result;
  }

  consulta_cuentas(documento_id: string): Promise<any>{
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT consulta_cuentas($1)', [documento_id]);

    queryConnection.release();
    return result;
  }

  consulta_deposito(documento_id: string, numero: number): Promise<any>{
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT consulta_deposito($1, $2)', [documento_id, numero]);

    queryConnection.release();
    return result;
  }

  deposito(numero: number, monto: number): Promise<boolean> {
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT deposito($1, $2)', [numero, monto]);

    queryConnection.release();
    return result;
  }

  retiro(numero: number, monto: number): Promise<boolean> {
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT retiro($1, $2)', [numero, monto]);

    queryConnection.release();
    return result;
  }

  transferencia(numero_origen: number, numero_destino: number, monto: number): Promise<boolean> {
    var queryConnection = this.connection.createQueryRunner();
    queryConnection.connect();
    var result = queryConnection.query('SELECT transferencia($1, $2, $3)', [numero_origen, numero_destino, monto]);

    queryConnection.release();
    return result;
  }

}
