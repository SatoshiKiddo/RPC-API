import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { FunctionsService } from './functions/functions.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private functionsService: FunctionsService
    ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/apertura')
  async apertura(@Request() req) {
    return this.functionsService.apertura_cuenta(req.body.documento_id, req.body.nombre, req.body.username, req.body.password);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/consulta_cuenta')
  async consulta_cuenta(@Request() req) {
    return this.functionsService.consulta_cuenta(req.body.documento_id);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/consulta_deposito')
  async consulta_deposito(@Request() req) {
    return this.functionsService.consulta_deposito(req.body.documento_id, req.body.numero);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/consulta_transacciones')
  async consulta_transacciones(@Request() req) {
    return this.functionsService.consulta_transacciones(req.body.numero, req.body.limite);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/deposito')
  async deposito(@Request() req) {
    return this.functionsService.deposito(req.body.numero, req.body.monto);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/retiro')
  async retiro(@Request() req) {
    return this.functionsService.retiro(req.body.numero, req.body.monto);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('function/transferencia')
  async transferencia(@Request() req) {
    return this.functionsService.transferencia(req.body.numero_origen, req.body.numero_destino, req.body.monto);
  }
  
}