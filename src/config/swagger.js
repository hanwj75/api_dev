import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "회원 API 문서",
      version: "1.0.0",
      description: "회원 관련 기능 API 명세서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/docs/user.swagger.js" /*"./src/docs/post.swagger.js"*/],
};

const specs = swaggerJsdoc(options);
export { swaggerUi, specs };
