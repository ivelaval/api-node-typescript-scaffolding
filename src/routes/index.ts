import { type RequestHandler, Router } from 'express';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const PATH_ROUTER = `${dirname}`;
const dynamicRoutes = Router();

const cleanFileName = (fileName: string): string | undefined => {
  return fileName.split('.').shift();
};

const contains = (value: string, subvalue: string): boolean => {
  return value.includes(subvalue);
};

readdirSync(PATH_ROUTER).filter((file): string => {
  if (!contains(file, 'index') && !contains(file, '.map')) {
    const cleanName = cleanFileName(file);

    void import(`./${cleanName}.js`).then((module) => {
      dynamicRoutes.use(
        `/${cleanName}`,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        module.routes as RequestHandler<any, any, any, any, Record<string, any>>
      );
    });
  }

  return file;
});

export { dynamicRoutes };
