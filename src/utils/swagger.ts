import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      description: "Movies API Information",
      version: "1.0.0",
      contact: {
        name: "Rahollah Ramish",
      },
    },
    servers: [
      {
        url: "http://ec2-3-27-227-155.ap-southeast-2.compute.amazonaws.com/api", // Update to your deployed API base URL
      },
    ],
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
