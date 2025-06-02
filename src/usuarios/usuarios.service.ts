import { Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../config/database';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuariosService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Verificar se email já existe - CORRIGIDO: $1 em vez de ?
    const emailExiste = await this.db.query(
      'SELECT id_usuario FROM USUARIO WHERE email = $1 AND ativo = TRUE',
      [createUsuarioDto.email]
    );

    if (emailExiste.length > 0) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(createUsuarioDto.senha, 10);

    // Inserir usuário - CORRIGIDO: $1, $2, $3, $4 em vez de ?
    const resultado = await this.db.query(
      `INSERT INTO USUARIO (nome, email, senha_hash, telefone) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id_usuario`, // PostgreSQL usa RETURNING em vez de insertId
      [
        createUsuarioDto.nome,
        createUsuarioDto.email,
        senhaHash,
        createUsuarioDto.telefone || null
      ]
    );

    // Retornar usuário criado (sem senha)
    // PostgreSQL retorna o ID no resultado da query com RETURNING
    const novoUsuarioId = resultado[0].id_usuario;
    return this.findOne(novoUsuarioId);
  }

  async findAll() {
    const usuarios = await this.db.query(
      `SELECT id_usuario, nome, email, telefone, data_criacao, data_ultima_atividade
       FROM USUARIO
       WHERE ativo = TRUE
       ORDER BY data_criacao DESC`
    );
    return usuarios;
  }

  async findOne(id: number) {
    const resultado = await this.db.query(
      `SELECT id_usuario, nome, email, telefone, data_criacao, data_ultima_atividade
       FROM USUARIO 
       WHERE id_usuario = $1 AND ativo = TRUE`,
      [id]
    );
    
    return resultado[0] || null;
  }

  async update(id: number, updateUsuarioDto: any) {
    // Construir query dinamicamente baseado nos campos fornecidos
    const campos: string[] = [];
    const valores: any[] = [];
    let paramIndex = 1;

    if (updateUsuarioDto.nome) {
      campos.push(`nome = $${paramIndex++}`);
      valores.push(updateUsuarioDto.nome);
    }

    if (updateUsuarioDto.email) {
      // Verificar se o novo email já existe (em outro usuário)
      const emailExiste = await this.db.query(
        'SELECT id_usuario FROM USUARIO WHERE email = $1 AND id_usuario != $2 AND ativo = TRUE',
        [updateUsuarioDto.email, id]
      );

      if (emailExiste.length > 0) {
        throw new ConflictException('Email já está em uso');
      }

      campos.push(`email = $${paramIndex++}`);
      valores.push(updateUsuarioDto.email);
    }

    if (updateUsuarioDto.telefone !== undefined) {
      campos.push(`telefone = $${paramIndex++}`);
      valores.push(updateUsuarioDto.telefone);
    }

    if (updateUsuarioDto.senha) {
      const senhaHash = await bcrypt.hash(updateUsuarioDto.senha, 10);
      campos.push(`senha_hash = $${paramIndex++}`);
      valores.push(senhaHash);
    }

    if (campos.length === 0) {
      throw new Error('Nenhum campo para atualizar');
    }

    // Adicionar o ID no final
    valores.push(id);

    const resultado = await this.db.query(
      `UPDATE USUARIO 
       SET ${campos.join(', ')}, data_ultima_atividade = NOW() 
       WHERE id_usuario = $${paramIndex} AND ativo = TRUE 
       RETURNING id_usuario`,
      valores
    );

    if (resultado.length === 0) {
      return null; // Usuário não encontrado
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    // Soft delete - marcar como inativo em vez de deletar
    const resultado = await this.db.query(
      `UPDATE USUARIO 
       SET ativo = FALSE, data_ultima_atividade = NOW() 
       WHERE id_usuario = $1 AND ativo = TRUE 
       RETURNING id_usuario`,
      [id]
    );

    return resultado.length > 0;
  }

  async findByEmail(email: string) {
    const resultado = await this.db.query(
      `SELECT id_usuario, nome, email, senha_hash, telefone, data_criacao 
       FROM USUARIO 
       WHERE email = $1 AND ativo = TRUE`,
      [email]
    );
    
    return resultado[0] || null;
  }
}