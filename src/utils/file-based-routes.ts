import type { RequestHandler, Router } from 'express';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

export interface IConventionFile {
  fileName: string;
  path: string;
}

export const getPathName = (data: string[]): string => {
  return [...data].slice(0, data.length - 1).join('/');
};

export interface ICleanFileName {
  fileName: string;
  parent: string | undefined;
  routesFolderLocation: string;
}

export const cleanFileName = ({
  fileName,
  parent,
  routesFolderLocation = './'
}: ICleanFileName): IConventionFile | undefined => {
  const splittedName = fileName.split('.');

  return {
    fileName:
      (parent ? `${routesFolderLocation}${parent}/` : routesFolderLocation) +
      fileName,
    path: (parent ? `/${parent}/` : '/') + getPathName(splittedName)
  };
};

export const contains = (value: string, subvalue: string): boolean => {
  return value.includes(subvalue);
};

export interface IInitRoutesByFilesPath {
  router: Router;
  pathFolder: string;
  parentPath?: string;
  routesFolderLocation?: string;
}

export const initRoutesByFilesPath = ({
  router,
  pathFolder,
  parentPath = '',
  routesFolderLocation = './'
}: IInitRoutesByFilesPath) => {
  const fileStat = statSync(pathFolder);

  if (fileStat.isDirectory()) {
    const files = readdirSync(pathFolder);

    files.forEach((file, index) => {
      const filePath = path.join(pathFolder, file);
      const internalFileStat = statSync(filePath);
      let consecutiveParentPath = parentPath;

      if (internalFileStat.isDirectory()) {
        consecutiveParentPath = `${parentPath ? `${parentPath}/` : ''}${file}`;
        initRoutesByFilesPath({
          router,
          pathFolder: filePath,
          parentPath: consecutiveParentPath,
          routesFolderLocation
        });
      } else {
        if (!contains(file, 'index') && !contains(file, '.map')) {
          const normalizedFileObject: IConventionFile | undefined =
            cleanFileName({
              fileName: file,
              parent: consecutiveParentPath,
              routesFolderLocation
            });

          void import(normalizedFileObject?.fileName as string).then(
            (module) => {
              router.use(
                normalizedFileObject?.path as string,
                module.routes as RequestHandler<
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  any,
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  any,
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  any,
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  any,
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  Record<string, any>
                >
              );
            }
          );
        }
      }
    });
  }
};
