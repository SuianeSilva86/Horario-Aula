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
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações se necessário
```

4. **Inicie o banco de dados:**
```bash
docker-compose up -d
```

O banco será criado automaticamente com as tabelas e dados de exemplo.

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

## 📝 Configuração do Banco

**Configuração padrão (desenvolvimento local):**
- Host: localhost
- Porta: 5432
- Database: horarios_aula

> ⚠️ **Importante**: As credenciais estão configuradas no `docker-compose.yaml` e `src/db.js` apenas para desenvolvimento local. Em produção, use variáveis de ambiente para maior segurança.

**Para produção, configure as variáveis de ambiente:**
```bash
DB_HOST=seu_host
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha_segura
DB_NAME=horarios_aula
```

## 🔄 Comandos Úteis

```bash
# Parar o banco de dados
docker-compose down

# Ver logs do banco
docker-compose logs db

# Conectar ao banco via psql
docker exec -it horarios_aula_db psql -U user -d horarios_aula

# Reinstalar dependências
npm install
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

**Suiane Silva**
- GitHub: [@SuianeSilva86](https://github.com/SuianeSilva86)
- Projeto: [Horario-Aula](https://github.com/SuianeSilva86/Horario-Aula)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!