import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      user: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      max: 20, // máximo de conexões no pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  // Método que roda quando o módulo é inicializado
  async onModuleInit() {
    await this.testConnection();
  }

  // Método que roda quando a aplicação é encerrada
  async onModuleDestroy() {
    await this.pool.end();
    console.log('🔌 Conexão com PostgreSQL encerrada');
  }

  // Método para testar a conexão
  async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      
      // Testa uma query simples
      const result = await client.query('SELECT 1 as test');
      client.release();
      
      console.log('✅ Conectado ao PostgreSQL com sucesso!');
      console.log('📊 Dados da conexão:', {
        host: this.configService.get('DB_HOST'),
        port: this.configService.get('DB_PORT'),
        database: this.configService.get('DB_NAME'),
        user: this.configService.get('DB_USERNAME')
      });
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao conectar ao PostgreSQL:', error.message);
      console.error('🔧 Verifique se:', {
        'PostgreSQL está rodando': `psql -h ${this.configService.get('DB_HOST')} -p ${this.configService.get('DB_PORT')} -U ${this.configService.get('DB_USERNAME')} -d ${this.configService.get('DB_NAME')}`,
        'Credenciais estão corretas': 'DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME',
        'Firewall/Rede': 'PostgreSQL aceita conexões externas'
      });
      return false;
    }
  }

  // Método para executar queries
  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(sql, params);
        return result.rows; // PostgreSQL retorna os dados em result.rows
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Erro na query:', error);
      throw error;
    }
  }

  // Método adicional para obter informações da conexão
  async getConnectionInfo() {
    try {
      const client = await this.pool.connect();
      const result = await client.query(`
        SELECT 
          current_database() as database_name,
          current_user as current_user,
          version() as postgresql_version
      `);
      client.release();
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao obter informações da conexão:', error);
      return null;
    }
  }

  // Método para transações
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Getter para acessar o pool diretamente se necessário
  getPool(): Pool {
    return this.pool;
  }
}