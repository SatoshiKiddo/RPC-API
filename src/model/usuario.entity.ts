import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Cuenta } from './cuenta.entity';

@Entity()
export class Usuario {
  @PrimaryColumn()
  document_id: string;

  @Column()
  nombre: string;

  @Column()
  nombre_usuario: string;

  @Column()
  contrasena: string;

  @OneToMany(type => Cuenta, cuenta => cuenta.usuario)
  cuentas: Cuenta[];
}