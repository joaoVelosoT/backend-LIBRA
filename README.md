# 📚 LIBRA – Backend

**Node.js + Express + Sequelize + MySQL + Docker + Swagger**

---

## 📖 Descrição

O backend do **LIBRA** é responsável por toda a lógica da plataforma de biblioteca digital. A API gerencia autenticação de usuários e administradores, controle de livros, ebooks e audiobooks, sistema de favoritos, avaliações, eventos, notificações, upload de arquivos e integrações com inteligência artificial.

O projeto foi desenvolvido com foco em organização, escalabilidade e arquitetura modular em camadas, facilitando manutenção e evolução da aplicação.

---

## 🚀 Tecnologias Utilizadas

* Node.js
* Express
* Sequelize (ORM)
* MySQL (desenvolvimento)
* SQL Server (produção)
* Docker
* JWT (Autenticação)
* bcryptjs
* Multer (Upload de arquivos)
* Swagger (Documentação da API)
* Nodemailer
* Google Cloud Storage
* Ferramentas de conversão de PDF e EPUB

---

## ⚙️ Instalação

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/joaoVelosoT/backend-LIBRA.git
cd backend-LIBRA
```

### 2️⃣ Instalar dependências

```bash
npm install
```

---

## 🔐 Configuração do .env

Crie um arquivo `.env` na raiz do projeto com as variáveis:

```env
PORT=8080
NODE_ENV=develop

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=libra
DB_PORT=3306

JWT_SECRET=sua_chave_secreta

GOOGLE_APPLICATION_CREDENTIALS=./credenciais.json
```

---

## 🗄️ Banco de Dados

* Ambiente de desenvolvimento utiliza **MySQL**
* Ambiente de produção preparado para **SQL Server**
* As tabelas são criadas automaticamente via Sequelize ao iniciar o servidor

---

## 🐳 Docker

O projeto utiliza Docker para subir o banco de dados.

```bash
docker-compose up -d
```

---

## ▶️ Execução

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:8080
```

---

## 📘 Documentação da API (Swagger)

A API possui documentação automática e interativa com Swagger, permitindo:

* Visualizar todas as rotas disponíveis
* Testar endpoints diretamente pelo navegador
* Ver parâmetros, autenticação e formatos de requisição
* Facilitar integração com o frontend

Acesse:

```
http://localhost:8080/docs
```

---

## 🧠 Diferenciais do Projeto

* Arquitetura organizada em camadas (controllers, services, models, routes e middlewares)
* Autenticação segura com JWT
* Upload e gerenciamento de arquivos
* Integração com serviços externos e IA
* Documentação completa com Swagger
* Estrutura preparada para produção
* Ambiente conteinerizado com Docker
* Projeto escalável e de fácil manutenção

---

## 👨‍💻 Autores

Fernando da Silva Simões, Raphael Cardoso e João Veloso
Backend team – LIBRA
