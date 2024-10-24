import { Express, Request, Response } from "express";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: 'Movies API',
        description: 'Movies API Information',
        version: '1.0.0',
        contact: {
            name: 'Rahollah Ramish'
        },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/user.routes.js"),
    path.join(__dirname, "../routes/movie.routes.js"),
    // for localhost
    path.join(__dirname, "../routes/user.routes.ts"),
    path.join(__dirname, "../routes/movie.routes.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);


