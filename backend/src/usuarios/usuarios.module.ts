import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DatabaseService } from '../config/database';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, DatabaseService],
})
export class UsuariosModule {}