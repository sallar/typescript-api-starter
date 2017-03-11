import * as express from 'express';
import * as cors from 'cors';
import { logger } from './utils/logger';
import { router as swaggerRouter } from './swagger';
import { router as v1Router } from './v1';

let startTime: number;

const app = express();

app.use(cors());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({
    health: 'OK',
    uptime: `${Date.now() - startTime} ms`
  });
});

app.use('/v1', v1Router);
app.use(swaggerRouter);

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err);
  res.status(err.code || 500).json(err.toJSON());
});

let server: any;

export function start(port: number) {
  return new Promise(resolve => {
    startTime = Date.now();
    server = app.listen(port, resolve);
  });
}

export function stop() {
  if (server) {
    try {
      server.close();
    } catch (err) {
      console.log('Error stopping server', err);
    }
  }
}
