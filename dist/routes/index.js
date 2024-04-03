import { Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
var filename = fileURLToPath(import.meta.url);
var dirname = path.dirname(filename);
var PATH_ROUTER = "".concat(dirname);
var dynamicRoutes = Router();
var cleanFileName = function (fileName) {
    return fileName.split('.').shift();
};
var contains = function (value, subvalue) {
    return value.includes(subvalue);
};
readdirSync(PATH_ROUTER).filter(function (file) {
    if (!contains(file, 'index') && !contains(file, '.map')) {
        var cleanName_1 = cleanFileName(file);
        void import("./".concat(cleanName_1, ".js")).then(function (module) {
            dynamicRoutes.use("/".concat(cleanName_1), module.routes);
        });
    }
    return file;
});
export { dynamicRoutes };
//# sourceMappingURL=index.js.map