import 'reflect-metadata';
import App from './app';

(async () => {
  const app = new App();
  await app.build();
  app.start();
})();
