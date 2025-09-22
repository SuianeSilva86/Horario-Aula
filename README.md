# Sistema de Controle de Horários de Aula 📚

Sistema para gerenciamento de horários de aulas, professores, salas e disciplinas desenvolvido com Node.js e PostgreSQL.

## 🎯 Funcionalidades

- **Gerenciamento de Professores**: Cadastro e controle de professores
- **Controle de Salas**: Gestão de salas de aula
- **Disciplinas**: Associação de disciplinas com professores
- **Horários**: Agendamento de aulas com horários específicos
- **Relatórios**:
  - Total de horas por professor
  - Ocupação de salas
  - Horários livres por sala

## 🏗️ Estrutura do Projeto

```
Horario-Aula/
├── sql/
│   ├── 01-criacao-tabelas.sql     # Schema do banco de dados
│   ├── 02-inserts-exemplo.sql     # Dados de exemplo
│   ├── 03-consulta-horas-professor.sql # Query para horas por professor
│   └── 04-consulta-salas.sql      # Query para ocupação de salas
├── src/
│   ├── db.js                      # Configuração do banco de dados
│   ├── index.js                   # Relatórios principais
│   └── horariosLivres.js          # Análise de horários livres
├── docker-compose.yaml            # Container PostgreSQL
├── package.json                   # Dependências Node.js
└── README.md                      # Este arquivo
```

## 🗄️ Modelo do Banco de Dados

### Tabelas

- **professor**: Dados dos professores
- **room**: Informações das salas
- **subject**: Disciplinas vinculadas aos professores
- **class**: Turmas das disciplinas
- **class_schedule**: Horários das aulas

### Relacionamentos

```
professor (1:N) subject (1:N) class (1:N) class_schedule (N:1) room
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker e Docker Compose
- Git

### Configuração

1. **Clone o repositório:**
```bash
git clone https://github.com/SuianeSilva86/Horario-Aula.git
cd Horario-Aula
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente (opcional):**

Para usar configurações personalizadas do banco:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações personalizadas
```

**Exemplo de personalização (.env):**
```env
DB_HOST=localhost
DB_PORT=5433
DB_USER=seu_usuario
DB_PASSWORD=sua_senha_segura
DB_NAME=minha_escola
```

> 💡 **Flexibilidade total**: Você pode personalizar host, porta, usuário, senha e nome do banco. O Docker criará automaticamente o banco com suas configurações!

4. **Inicie o banco de dados:**
```bash
docker-compose up -d
```

O Docker criará automaticamente:
- ✅ Container PostgreSQL com suas configurações personalizadas (se definidas no `.env`)
- ✅ Banco de dados com o nome especificado
- ✅ Tabelas e dados de exemplo via scripts SQL

**Verificar se o banco está rodando:**
```bash
docker ps
# Deve mostrar o container horarios_aula_db em execução
```

5. **Execute os relatórios:**

**Relatório principal (horas por professor + ocupação de salas):**
```bash
npm start
# ou
node src/index.js
```

**Análise de horários livres:**
```bash
npm run livres
# ou
node src/horariosLivres.js
```

## 📊 Relatórios Disponíveis

### 1. Horas por Professor
Exibe o total de horas de aula de cada professor:
```
┌─────────────┬──────────────┬──────────────┐
│ professor_id│ professor    │ total_horas  │
├─────────────┼──────────────┼──────────────┤
│ 1           │ Prof. Girafales │ 4.00      │
│ 2           │ Prof. Madruga   │ 2.00      │
│ 3           │ Prof. Florinda  │ 2.00      │
└─────────────┴──────────────┴──────────────┘
```

### 2. Ocupação de Salas
Lista os horários ocupados em cada sala:
```
┌──────────┬───────────┬─────────┬─────────┐
│ Sala     │ Dia       │ Inicio  │ Fim     │
├──────────┼───────────┼─────────┼─────────┤
│ Sala 101 │ Monday    │ 08:00   │ 10:00   │
│ Sala 101 │ Wednesday │ 08:00   │ 10:00   │
│ Sala 101 │ Friday    │ 13:00   │ 15:00   │
│ Sala 102 │ Tuesday   │ 10:00   │ 12:00   │
└──────────┴───────────┴─────────┴─────────┘
```

### 3. Horários Livres por Sala
Analisa os períodos disponíveis em cada sala (08:00 às 18:00):
```
Sala: Sala 101
Ocupados: [
  { start_time: '08:00:00', end_time: '10:00:00' },
  { start_time: '13:00:00', end_time: '15:00:00' }
]
Livres: [
  { inicio: '10:00:00', fim: '13:00:00' },
  { inicio: '15:00:00', fim: '18:00' }
]
```

## 🗃️ Dados de Exemplo

O sistema vem com dados pré-configurados:

**Professores:**
- Prof. Girafales (Matemática)
- Prof. Madruga (História)
- Prof. Florinda (Português)

**Salas:**
- Sala 101
- Sala 102

**Horários de Exemplo:**
- Matemática: Segunda e Quarta (08:00-10:00) - Sala 101
- História: Terça (10:00-12:00) - Sala 102
- Português: Sexta (13:00-15:00) - Sala 101

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **PostgreSQL**: Banco de dados relacional
- **Docker**: Containerização do banco de dados
- **pg**: Driver PostgreSQL para Node.js
- **dotenv**: Gerenciamento de variáveis de ambiente

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Aplicação     │    │     Docker       │    │   PostgreSQL    │
│   Node.js       │───▶│   Compose        │───▶│    Database     │
│                 │    │                  │    │                 │
│ • index.js      │    │ • Container      │    │ • Tabelas       │
│ • horariosLivres│    │ • Volumes        │    │ • Scripts SQL   │
│ • db.js         │    │ • Networks       │    │ • Dados         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ▲
         │
┌─────────────────┐
│ Configuração    │
│                 │
│ • .env          │
│ • package.json  │
│ • docker-compose│
└─────────────────┘
```

## 📝 Configuração do Banco

**Configuração flexível via variáveis de ambiente:**

O sistema suporta configuração personalizada através do arquivo `.env`. Todas as configurações têm valores padrão para desenvolvimento local.

### 🔧 Variáveis Disponíveis:

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `DB_HOST` | `localhost` | Endereço do servidor do banco |
| `DB_PORT` | `5432` | Porta do PostgreSQL |
| `DB_USER` | `user` | Usuário do banco |
| `DB_PASSWORD` | `password` | Senha do banco |
| `DB_NAME` | `horarios_aula` | Nome do banco de dados |

### 🌍 Exemplos de Configuração:

**Desenvolvimento local (padrão):**
```env
# Sem .env necessário - usa valores padrão
```

**Desenvolvimento em equipe:**
```env
DB_NAME=horarios_dev
DB_USER=equipe_dev
DB_PASSWORD=dev123
DB_PORT=5433
```

**Ambiente de testes:**
```env
DB_NAME=horarios_test
DB_PORT=5434
DB_USER=tester
DB_PASSWORD=test456
```

**Produção:**
```env
DB_HOST=servidor-producao.com
DB_USER=admin_escola
DB_PASSWORD=senha_super_segura_2024
DB_NAME=sistema_escola_producao
DB_PORT=5432
```

> ⚠️ **Importante**: Em produção, sempre use senhas fortes e configure adequadamente as variáveis de ambiente por segurança.

## 🔄 Comandos Úteis

### Docker:
```bash
# Parar o banco de dados
docker-compose down

# Ver logs do banco
docker-compose logs db

# Reiniciar com configurações atualizadas
docker-compose down && docker-compose up -d

# Conectar ao banco via psql (substitua as credenciais se personalizadas)
docker exec -it horarios_aula_db psql -U user -d horarios_aula
```

### Aplicação:
```bash
# Instalar dependências
npm install

# Executar relatório principal
npm start

# Executar análise de horários livres
npm run livres

# Ver variáveis de ambiente carregadas
node -e "require('dotenv').config(); console.log(process.env)"
```

### Desenvolvimento:
```bash
# Limpar e recriar banco com dados limpos
docker-compose down -v && docker-compose up -d

# Verificar conectividade
npm start
```
