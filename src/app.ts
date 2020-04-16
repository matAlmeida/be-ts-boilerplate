import * as express from 'express';
import { getRouter } from './controllers';
import errorMiddleware from './middlewares/error-middleware';

const BASE_API_PATH = '/api/v1';
const DEFAULT_PORT = 3333;
const PORT = process.env.PORT || DEFAULT_PORT;

class App {
  server: express.Application;

  constructor() {
    this.server = express();
  }

  async build() {
    this.setupPreRoutesMiddlewares();
    this.setupRoutes();
    this.setupPosRoutesMiddlewares();
  }

  start() {
    this.server.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
  }

  setupPreRoutesMiddlewares() {
    this.server.use(express.json());
  }

  setupPosRoutesMiddlewares() {
    this.server.use(errorMiddleware);
  }

  async setupRoutes() {
    this.server.use(BASE_API_PATH, await getRouter());
  }
}

export default App;
