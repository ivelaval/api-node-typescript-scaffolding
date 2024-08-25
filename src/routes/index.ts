import { initRoutesByFilesPath } from '../utils/file-based-routes.js';
import { Router } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const PATH_ROUTER = `${dirname}`;
const dynamicRoutes = Router();

initRoutesByFilesPath({
  router: dynamicRoutes,
  pathFolder: PATH_ROUTER,
  routesFolderLocation: '../routes/'
});

export { dynamicRoutes };
