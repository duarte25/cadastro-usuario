import { Application, Request, Response } from "express";
import profileRouter from "./profileRouter";
import usersRouter from "./userRouter";

const routes = (app: Application): void => {

  app.route("/").get((req: Request, res: Response): void => {
    res.status(200).send({ message: "Bem vindo a API de cadastro de usuários." });
  });

  app.use(
    usersRouter,
    profileRouter,
  );
};

export default routes;