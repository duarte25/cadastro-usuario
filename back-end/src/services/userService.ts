import { createUserSchema, updateUserPasswordSchema, updateUserSchema } from '../schemas/userSchema';
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
    // 1. Validação dos dados de entrada com Zod
    const validatedData = createUserSchema.parse(userData);

    // 2. Regra de negócio: verifica se o e-mail já existe
    const existingUser = await UserRepository.findByEmail(validatedData.email);
    if (existingUser) {
      throw new APIError(messages.auth.emailAlreadyExists(validatedData.email), 409); // 409 Conflict
    }

    // 3. Chama o repositório para criar o usuário
    // Em uma aplicação real, você faria o hash da senha aqui antes de passar para o repositório
    const newUser = await UserRepository.create(validatedData);

    // 4. Remove a senha antes de retornar
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
    // 1. Validação dos dados de entrada com Zod
    const validatedData = updateUserSchema.parse(updateData);

    // 2. Regra de negócio: verifica se o usuário existe
    const currentUser = await UserRepository.findById(id);
    if (!currentUser) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    // 3. Regra de negócio: verifica se o novo e-mail já está em uso por outro usuário
    if (validatedData.email && validatedData.email !== currentUser.email) {
      const existingUserWithEmail = await UserRepository.findByEmail(validatedData.email);
      if (existingUserWithEmail) {
        throw new APIError(messages.auth.emailAlreadyExists(validatedData.email), 409);
      }
    }

    // 4. Chama o repositório para atualizar
    const updatedUser = await UserRepository.update(id, validatedData);
    if (!updatedUser) {
      // Isso não deve acontecer por causa da verificação acima, mas é uma boa prática
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    // 5. Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  }

  static async alterUserPerfil(id: string, updateData: Partial<CreateUserData>): Promise<User> {
    // Reutiliza a mesma lógica de alteração de usuário
    return this.alterUser(id, updateData);
  }

  static async alterUserPassword(id: string, updateData: Partial<CreateUserData>): Promise<User> {
    // 1. Validação dos dados de entrada com Zod
    const validatedData = updateUserPasswordSchema.parse(updateData);

    // 2. Regra de negócio: verifica se o usuário existe
    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    // 3. Chama o repositório para atualizar a senha
    // Em uma aplicação real, você faria o hash da nova senha aqui
    const updatedUser = await UserRepository.update(id, { password: validatedData.password });
    if (!updatedUser) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    // 4. Remove a senha antes de retornar
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