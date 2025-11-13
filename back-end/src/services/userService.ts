import { createUserSchema, updateUserSchema } from '../schemas/userSchema';
import { CreateUserData, ListUserParams, User } from '../interfaces/user';
import { UserRepository } from '../repositories/userRepository'
import { APIError } from '../utils/wrapException';
import messages from '../utils/message';


export class UserService {
  static async listUsers(params: ListUserParams): Promise<{ data: User[]; total: number; pagina: number; limite: number }> {
    const { data, total } = await UserRepository.list(params);

    // O serviço é responsável por remover dados sensíveis antes de devolver ao controller
    const usersWithoutPasswords = data.map(({ password, ...rest }) => rest as User);

    return {
      data: usersWithoutPasswords,
      total,
      pagina: params.pagina,
      limite: params.limite,
    };
  }

  static async createUser(userData: CreateUserData): Promise<User> {

    const validatedData = createUserSchema.safeParse(userData);

    if (!validatedData.success) {
      throw new APIError(validatedData.error, 422);
    }

    const existingUser = await UserRepository.findByEmail(validatedData.data.email);
    if (existingUser) {
      throw new APIError(messages.auth.emailAlreadyExists(validatedData.data.email), 409);
    }

    const newUser = await UserRepository.create(validatedData.data);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  }

  static async findUser(id: string): Promise<User> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  static async alterUser(id: string, updateData: Partial<CreateUserData>): Promise<User> {
    const validatedData = updateUserSchema.safeParse(updateData);

    const currentUser = await UserRepository.findById(id);
    if (!currentUser) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    if (!validatedData.success) {
      throw new APIError(validatedData.error, 422);
    }

    if (validatedData.data.email && validatedData.data.email !== currentUser.email) {
      const existingUserWithEmail = await UserRepository.findByEmail(validatedData.data.email);
      if (existingUserWithEmail) {
        throw new APIError(messages.auth.emailAlreadyExists(validatedData.data.email), 409);
      }
    }

    const updatedUser = await UserRepository.update(id, validatedData.data);
    if (!updatedUser) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  }

  static async deleteUser(id: string): Promise<{ message: string }> {
    const wasDeleted = await UserRepository.delete(id);
    if (!wasDeleted) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }
    return { message: "Usuário deletado com sucesso." };
  }
}