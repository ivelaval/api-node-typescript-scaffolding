import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import log from './logger.js';
var swaggerDocs = function (app, port, version) {
    var options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'REST API Docs',
                version: version
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: [
                {
                    bearerAuth: []
                }
            ]
        },
        apis: ['./src/routes/*.ts']
    };
    var swaggerSpec = swaggerJsdoc(options);
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Docs in JSON format
    app.get('/docs.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    log.info("Docs available at http://localhost:".concat(port, "/docs"));
};
export default swaggerDocs;
//# sourceMappingURL=swagger.js.map