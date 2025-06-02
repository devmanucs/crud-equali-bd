# CRUD Equali BD - Guia de Teste

Este projeto é uma API construída com NestJS para gerenciar usuários, oferecendo funcionalidades básicas de um CRUD.

---

### Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte instalado:
* Node.js (versão recomendada no `package.json` ou superior)
* npm (geralmente vem com o Node.js)
* PostgreSQL (banco de dados utilizado pelo projeto)

---

### Configuração

1.  **Variáveis de Ambiente**:
    * Crie um arquivo `.env` na raiz do projeto.
    * Este arquivo deve conter as credenciais e informações de conexão com o seu banco de dados PostgreSQL. Consulte `src/config/database.ts` para ver as variáveis utilizadas:
        ```env
        DB_HOST=localhost
        DB_PORT=5432
        DB_USERNAME=seu_usuario_pg
        DB_PASSWORD=sua_senha_pg
        DB_NAME=seu_banco_pg
        PORT=3000 # Porta opcional para a API, padrão 3000
        ```

2.  **Banco de Dados**:
    * Certifique-se de que o PostgreSQL está em execução e acessível com as credenciais fornecidas no arquivo `.env`.
    * A aplicação tentará conectar ao banco de dados na inicialização e exibirá uma mensagem de sucesso ou erro no console.
    * A estrutura da tabela `USUARIO` (ou similar) deve existir no banco de dados. O serviço `UsuariosService` interage com colunas como `id_usuario`, `nome`, `email`, `senha_hash`, `telefone`, `ativo`, `data_criacao`, `data_ultima_atividade`.

---

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone [https://github.com/devmanucs/crud-equali-bd](https://github.com/devmanucs/crud-equali-bd)
cd crud-equali-bd
npm install
```

## Executando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento (com watch mode):

```bash
npm run start:dev
```
A API estará disponível em http://localhost:PORT (onde PORT é o valor definido no seu .env ou 3000 por padrão).
A documentação da API (Swagger UI) estará acessível em http://localhost:PORT/api.

Outros scripts úteis do package.json:

- npm run start: Inicia a aplicação (requer build prévio).
- npm run build: Compila o projeto TypeScript.
- npm run start:prod: Inicia a aplicação em modo de produção (requer build prévio).

#### Entendendo o CRUD de Usuários

O módulo principal para teste é o UsuariosModule (src/usuarios). Ele gerencia as operações de CRUD para os usuários.

Endpoints disponíveis em /usuarios:

##### POST /usuarios

-Descrição: Cria um novo usuário.
- Payload: CreateUsuarioDto (ver src/usuarios/dto/create-usuario.dto.ts).
- nome (string, obrigatório)
- email (string, email válido, obrigatório)
- senha (string, mínimo 6 caracteres, obrigatório)
- telefone (string, opcional)

#### Respostas:
201 Created: Usuário criado com sucesso (retorna os dados do usuário sem a senha).
409 Conflict: Email já está em uso.
400 Bad Request: Dados de entrada inválidos (conforme as validações do DTO).
GET /usuarios

Descrição: Lista todos os usuários ativos.

#### Respostas:
`200 OK`: Retorna um array de usuários.
`GET /usuarios/:id`

Descrição: Busca um usuário específico pelo ID.
Parâmetros: id (integer) do usuário.

#### Respostas:
`200 OK`: Retorna os dados do usuário.
`404 Not Found`: Usuário não encontrado.
`PATCH /usuarios/:id`

Descrição: Atualiza os dados de um usuário existente.
Parâmetros: id (integer) do usuário.
Payload: UpdateUsuarioDto (ver src/usuarios/dto/update-usuario.dto.ts). Permite atualizar nome, email e telefone. A senha pode ser atualizada se enviada no corpo da requisição.

#### Respostas:
`200 OK`: Usuário atualizado com sucesso (retorna os dados atualizados do usuário).
`404 Not Found`: Usuário não encontrado.
`409 Conflict`: Se o novo email fornecido já estiver em uso por outro usuário.
`DELETE /usuarios/:id`

Descrição: Remove um usuário (realiza um soft delete, marcando o usuário como inativo).
Parâmetros: id (integer) do usuário.

#### Respostas:
`200 OK`: Usuário removido/inativado com sucesso (retorna true).
`404 Not Found`: Usuário não encontrado ou já inativo.
