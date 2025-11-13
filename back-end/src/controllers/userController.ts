
import { CreateUserData, ListUserParams } from '../interfaces/user';
import { UserService } from '../services/userService';
import { sendResponse } from '../utils/message';
import { Request, Response } from 'express';

export default class UserController {
  // Método estático para listar usuários
  static async listUserController(req: Request, res: Response): Promise<any> {

    // Extrair parâmetros da query
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = parseInt(req.query.limite as string) || 10;

    const params: ListUserParams = {
      pagina,
      limite,
      nome: req.query.nome as string | undefined,
      telefone: req.query.telefone as string | undefined,
      email: req.query.email as string | undefined
    };

    // Chamar o serviço para listar os usuários
    const result = await UserService.listUsers(params);

    // Retornar a resposta com os dados formatados
    sendResponse(res, 200, result);
  }

  static async createUserController(req: Request, res: Response): Promise<void> {
    const user: CreateUserData = { ...req.body };

    const result = await UserService.createUser(user);

    sendResponse(res, 201, { data: result });
  }

  static async findUser(req: Request, res: Response) {
    const { id } = req.params;

    const userData = await UserService.findUser(id);
    sendResponse(res, 200, { data: userData });
  }

  static async alterUser(req: Request, res: Response) {
    const { id } = req.params;
    const updateData: Partial<CreateUserData> = { ...req.body };

    const userData = await UserService.alterUser(id, updateData);

    sendResponse(res, 200, { data: userData });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const userData = await UserService.deleteUser(id);
    sendResponse(res, 200, { data: userData });
  }
}