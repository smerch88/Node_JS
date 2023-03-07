import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';

import { router } from './routes/api/contacts.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', router);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: Error, _req: Request, res: Response) => {
  res.status(500).json({ message: err.message });
});

export { app };
