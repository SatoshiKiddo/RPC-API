import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, TableForeignKey, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import { Cuenta } from './cuenta.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Transaccion {
  @PrimaryColumn()
  id_transaccion: number;

  @Column()
  monto: number;

  @Column()
  fecha: Date;

  @Column()
  description: Date;

  @ManyToOne(type => Cuenta, cuenta => cuenta.transacciones_origen)
  cuenta_origen: Cuenta;

  @ManyToOne(type => Cuenta, cuenta => cuenta.transacciones_origen)
  cuenta_destino: Cuenta;

}