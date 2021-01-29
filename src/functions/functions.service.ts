import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/users/users.service';

@Injectable()
export class FunctionsService {
    constructor(private usersService: UsuariosService)
    {}

    async apertura_cuenta(documento_id: string, nombre: string, username: string, password: string): Promise<Boolean | undefined> {
        return this.usersService.apertura(documento_id, nombre, username, password);
    }

    async consulta_cuenta(documento_id: string): Promise<any> {
        return this.usersService.consulta_cuentas(documento_id);
    }

    async consulta_transacciones(numero: number, limite: number): Promise<any> {
        return this.usersService.consulta_transacciones(numero, limite);
    }

    async consulta_deposito(documento_id: string, numero: number): Promise<string> {
        return this.usersService.consulta_deposito(documento_id, numero);
    }

    async deposito(numero: number, monto: number): Promise<boolean> {
        return this.usersService.deposito(numero, monto);
    }

    async retiro(numero: number, monto: number): Promise<boolean> {
        return this.usersService.retiro(numero, monto);
    }

    async transferencia(numero_origen: number, numero_destino: number, monto: number): Promise<boolean> {
        return this.usersService.transferencia(numero_origen, numero_destino, monto);
    }

}