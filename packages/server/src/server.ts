import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { env } from './config/env';
import router from './routes/userRoutes';
import { sequelize } from './config/database';

const app = express();
const { PORT, FRONTEND_URL } = env;

// Middlewares
app.use(cors());
app.use(bodyParser.json());


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (error) {
    console.error('Unable to connect to database:', error);
    process.exit(1);
  }
})();
/*
export const dbConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
})

dbConnection.connect(function(err: any) {
  if (err) {
    throw err;
  }
  console.log("Connected to DB");
})
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}))

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;