# 🎬 API de Aluguel de Filmes Online

## 📌 Descrição
Este projeto foi desenvolvido como parte da disciplina **Princípios de Desenvolvimento Web** e tem como objetivo implementar uma **API REST** em **Node.js**, **Express** e **TypeScript** para gerenciar um sistema de aluguel de filmes online.  

A API permite:
- Cadastro e gerenciamento de **usuários**, **filmes**, **categorias**, **pagamentos** e **aluguéis**.
- Integração com a API externa **TMDB** para obtenção de informações sobre filmes.
- Controle de fluxo de aluguéis e pagamentos, com suporte a métodos como **PIX**, **Boleto** e **Cartão de Crédito**.

### 👨‍🎓 Equipe
- **Alunos:** Igor Ribeiro de Souza, João Vitor Mota  
- **Professor:** José Glauber  
- **Data da entrega:** 10/12/2025  

---

## ⚙️ Tecnologias Utilizadas
- **Node.js + Express** → Estruturação da API REST  
- **TypeScript** → Tipagem forte e robustez do código  
- **Sequelize (ORM)** → Interação com banco de dados **MySQL**  
- **dotenv** → Gerenciamento de variáveis de ambiente  
- **Winston** → Logs da aplicação  
- **Middlewares** → `cors`, `helmet`, `express.json` para segurança e parsing  

---

## 🏗️ Arquitetura
O projeto segue uma arquitetura em camadas:
- **Routes** → Definição dos endpoints  
- **Controllers** → Tratamento das requisições HTTP  
- **Services** → Lógica de negócio  
- **Models** → Definições Sequelize das entidades  
- **Middlewares** → Tratamento de erros e validações  
- **Config** → Conexão com banco e variáveis de ambiente  

---

## 🚀 Como Rodar o Projeto

## 🛠️ Pré-requisitos
- **Podman** versão **4.9.3** ou superior  
- **MySQL** containerizado (subido automaticamente pelo script)  
- Arquivo `.env` com as variáveis de ambiente necessárias

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/igor-rib-souza/pweb-back-projeto.git
   cd pweb-back-projeto/

2. Crie um arquivo `.env` na raiz do projeto com base no `.env.example.`.
3. Inicialize o projeto:
- Windows: 
   ```powershell
   ./run_all.ps1
   ```

- Linux/MacOS:
   ```bash
   ./run_all.sh
   ```
4. Verificar se está rodando:
   ```bash
   podman ps -a
   ```
   - Você deve ver os containers mysql-pweb e api-pweb ativos.
5. Testar requisição para listar usuários: 
   ```bash
   curl http://localhost:3000/users
   ```

---

## 📂 Estrutura do Projeto

```
.
├── clean_podman.sh        # Script para remover containers e rede
├── Dockerfile             # Build da imagem do backend
├── run_all.sh             # Script de inicialização (Linux/macOS)
├── run_all.ps1            # Script de inicialização (Windows)
├── src/                   # Código-fonte da aplicação
│   ├── controllers/       # Controllers das entidades
│   ├── models/            # Modelos Sequelize
│   ├── routes/            # Definição das rotas
│   ├── services/          # Lógica de negócio
│   ├── middlewares/       # Tratamento de erros e validações
│   ├── config/            # Configuração do banco e env
│   ├── tests/             # Testes unitários
│   └── utils/             # Funções auxiliares
└── tsconfig.json          # Configuração do TypeScript
```
