import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @MaxLength(100)
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty({ example: '11999999999', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefone?: string;
}