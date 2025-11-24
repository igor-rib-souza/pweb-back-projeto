import express from 'express';
import { sequelize } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (_req, res) => {
  res.send('Servidor funcionando!');
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Cria as tabelas se ainda não existirem
    console.log('Banco conectado com sucesso!');

    app.listen(3000, () => {
      console.log('Servidor rodando em http://localhost:3000');
    });
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
};

start();
