import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import createConnection from "@shared/infra/typeorm";
import "../../container";
import { AppError } from "@shared/errors/AppError";

createConnection();
const $PORT = 3333;
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error = ${err.message}`,
  });
});

app.listen($PORT, () => console.log(`Server is running on port ${$PORT}`));
