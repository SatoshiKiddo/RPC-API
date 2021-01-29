import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, TableForeignKey, ManyToOne, OneToMany} from 'typeorm';
import { Transaccion } from './transaccion.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Cuenta {
  @PrimaryColumn()
  numero: number;

  @Column()
  balance_actual: number;

  @ManyToOne(type => Usuario, user => user.cuentas)
  usuario: Usuario;

  @OneToMany(type => Transaccion, transaccion_origen => transaccion_origen.cuenta_origen)
  transacciones_origen: Transaccion[];

  @OneToMany(type => Transaccion, transaccion_destino => transaccion_destino.cuenta_destino)
  transacciones_destino: Transaccion[];

}