import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "회원 API 문서",
      version: "1.0.0",
      description: "회원 관련 기능 API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3333", // API 서버 URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // JWT 토큰 형식
        },
      },
    },
    security: [
      {
        bearerAuth: [], // 모든 API에 기본적으로 JWT 인증을 요구
      },
    ],
  },
  apis: ["./src/docs/user.swagger.js", "./src/docs/post.swagger.js"],
};

const specs = swaggerJsdoc(options);
export { swaggerUi, specs };
