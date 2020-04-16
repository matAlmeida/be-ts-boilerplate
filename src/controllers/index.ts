import { Router } from 'express';
import { readdirSync } from 'fs';

const CONTROLLERS_PATH = './src/controllers';
const CONTROLLER_SUFFIX = '-controller.ts';

const getRouter = async () => {
  const router = Router();

  const files = readdirSync(CONTROLLERS_PATH);

  const controllers = files.filter((file) => file.includes(CONTROLLER_SUFFIX));

  await Promise.all(
    controllers.map(async (controller) => {
      const suffix_index = controller.lastIndexOf(CONTROLLER_SUFFIX);
      const controller_name = controller
        .substr(0, suffix_index)
        .replace(/[-|_]/gm, '');

      const controllerRoute = await import(`./${controller}`);

      router.use(`/${controller_name}`, controllerRoute.default);
    })
  );

  return router;
};

export { getRouter };
