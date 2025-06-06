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
`201 Created`: Usuário criado com sucesso (retorna os dados do usuário sem a senha).
`409 Conflict`: Email já está em uso.
`400 Bad Request`: Dados de entrada inválidos (conforme as validações do DTO).
`GET /usuarios`

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

# Testando as Operações CRUD

Este guia demonstra como testar os endpoints CRUD da API de usuários de duas maneiras principais.

## 1. Usando a Documentação Interativa (Swagger UI)

Com a aplicação rodando, acesse [`http://localhost:PORT/api`](http://localhost:PORT/api) no seu navegador.

Você verá a interface do Swagger UI com a lista de endpoints disponíveis para o recurso **usuários**.<br>
Expanda cada endpoint para ver detalhes, incluindo parâmetros, corpo da requisição esperado e possíveis respostas.<br>
Utilize o botão **"Try it out"** para preencher os campos necessários e enviar requisições diretamente pela interface.

### **Criar Usuário (POST `/usuarios`)**

1. Expanda o endpoint `POST /usuarios`
2. Clique em **"Try it out"**
3. Preencha o JSON no **"Request body"** com os dados do usuário (ex: nome, email, senha):

```json
{
  "nome": "Usuário Teste Swagger",
  "email": "swagger@teste.com",
  "senha": "senha segura123",
  "telefone": "11987654321"
}
```

4. Clique em **"Execute"**
5. Verifique a resposta (código 201 e os dados do usuário criado). Anote o `id_usuario` retornado para usar nos próximos testes

### **Listar Usuários (GET `/usuarios`)**

1. Expanda o endpoint `GET /usuarios`
2. Clique em **"Try it out"**, depois em **"Execute"**
3. Verifique a lista de usuários retornada

### **Buscar Usuário por ID (GET `/usuarios/{id}`)**

1. Expanda o endpoint `GET /usuarios/{id}`
2. Clique em **"Try it out"**
3. Insira o `id_usuario` (obtido na criação) no campo **"id"**
4. Clique em **"Execute"**
5. Verifique os dados do usuário específico

### **Atualizar Usuário (PATCH `/usuarios/{id}`)**

1. Expanda o endpoint `PATCH /usuarios/{id}`
2. Clique em **"Try it out"**
3. Insira o `id_usuario` no campo **"id"**
4. Modifique o JSON no **"Request body"** com os campos que deseja atualizar (ex: nome, telefone):

```json
{
  "nome": "Usuário Teste Swagger Atualizado",
  "telefone": "22912345678"
}
```

5. Clique em **"Execute"**
6. Verifique a resposta e os dados atualizados do usuário

### **Remover Usuário (DELETE `/usuarios/{id}`)**

1. Expanda o endpoint `DELETE /usuarios/{id}`
2. Clique em **"Try it out"**
3. Insira o `id_usuario` no campo **"id"**
4. Clique em **"Execute"**
5. Verifique a resposta (deve ser `true` ou um corpo vazio com status 200)
6. Tente buscar o usuário pelo ID novamente; ele não deve ser encontrado (ou deve estar marcado como inativo no banco)

---

## 2. Usando cURL ou Clientes de API (Postman, Insomnia, etc.)

Substitua `PORT` pela porta que sua aplicação está usando (padrão 3000) e `USER_ID` pelo ID do usuário quando aplicável.

### **Criar Usuário (POST `/usuarios`)**

```bash
curl -X POST http://localhost:PORT/usuarios \
-H "Content-Type: application/json" \
-d '{
  "nome": "Usuário Teste cURL",
  "email": "curl@teste.com",
  "senha": "outrasenhasegura",
  "telefone": "33912345678"
}'
```

Anote o `id_usuario` da resposta.

### **Listar Usuários (GET `/usuarios`)**

```bash
curl http://localhost:PORT/usuarios
```

### **Buscar Usuário por ID (GET `/usuarios/USER_ID`)**

```bash
curl http://localhost:PORT/usuarios/USER_ID
```

### **Atualizar Usuário (PATCH `/usuarios/USER_ID`)**

```bash
curl -X PATCH http://localhost:PORT/usuarios/USER_ID \
-H "Content-Type: application/json" \
-d '{
  "nome": "Usuário Teste cURL Atualizado",
  "telefone": null
}'
```

### **Remover Usuário (DELETE `/usuarios/USER_ID`)**

```bash
curl -X DELETE http://localhost:PORT/usuarios/USER_ID
```

---

## Executando Testes Automatizados

O projeto possui scripts para executar testes automatizados definidos no `package.json`:

### **Testes unitários**

```bash
npm run test
```

### **Testes unitários em modo watch**

```bash
npm run test:watch
```

### **Cobertura de testes**

```bash
npm run test:cov
```

### **Testes End-to-End (e2e)**

```bash
npm run test:e2e
```

> **Nota:** Certifique-se de que a aplicação e o banco de dados estejam configurados e rodando para os testes e2e.

---

## Notas sobre o Banco de Dados

- O sistema utiliza **PostgreSQL**
- As operações de exclusão de usuário (`DELETE /usuarios/:id`) realizam um **soft delete**. Isso significa que o usuário não é fisicamente removido do banco de dados, mas sim marcado como inativo (o campo `ativo` é definido como `FALSE`)
- A senha do usuário é armazenada como um hash usando **bcrypt**

---

**Com este guia, você deve ser capaz de configurar, executar e testar completamente as funcionalidades CRUD da API de usuários.**
