import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { env } from './config/env';
import router from './routes';
import { sequelize } from './config/database';
import { refreshTokenMiddleware } from './middlewares';
import cookieParser from 'cookie-parser';

const app = express();
const { PORT, FRONTEND_URL } = env;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (error) {
    console.error('Unable to connect to database:', error);
    process.exit(1);
  }
})();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}))

//Middlewares
app.use(refreshTokenMiddleware);

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;