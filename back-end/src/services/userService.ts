import { createUserSchema, updateUserSchema } from '../schemas/userSchema';
import { CreateUserData, ListUserParams, User } from '../interfaces/user';
import { ProfileRepository } from '../repositories/profileRepository';
import { UserRepository } from '../repositories/userRepository';
import { APIError } from '../utils/wrapException';
import messages from '../utils/message';

export class UserService {
  static async listUsers(params: ListUserParams): Promise<{ data: User[]; total: number; pagina: number; limite: number; totalPaginas: number }> {
    const { data, total } = await UserRepository.list(params);

    const usersWithProfiles = await Promise.all(data.map(async (user) => {
      const profile = await ProfileRepository.findById(user.profileId);
      return { ...user, profile };
    }));

    const totalPages = Math.ceil(total / params.limite);

    return {
      data: usersWithProfiles,
      total,
      pagina: params.pagina,
      limite: params.limite,
      totalPaginas: totalPages,
    };
  }

  static async createUser(userData: CreateUserData): Promise<User> {
    const validatedData = createUserSchema.safeParse(userData);

    if (!validatedData.success) {
      throw new APIError(validatedData.error, 422);
    }

    const { email, profileId } = validatedData.data;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new APIError(messages.auth.emailAlreadyExists(email), 409);
    }

    const profile = await ProfileRepository.findById(profileId);
    if (!profile) {
      throw new APIError(messages.error.resourceNotFound("Perfil"), 404);
    }

    const newUser = await UserRepository.create(validatedData.data);
    return newUser as User;
  }

  static async findUser(id: string): Promise<User> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    const profile = await ProfileRepository.findById(user.profileId);
    return { ...user, profile } as User;
  }

  static async alterUser(id: string, updateData: Partial<CreateUserData>): Promise<User> {
    const validatedData = updateUserSchema.safeParse(updateData);

    if (!validatedData.success) {
      throw new APIError(validatedData.error, 422);
    }

    const currentUser = await UserRepository.findById(id);
    if (!currentUser) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    const { email, profileId } = validatedData.data;

    if (email && email !== currentUser.email) {
      const existingUserWithEmail = await UserRepository.findByEmail(email);
      if (existingUserWithEmail) {
        throw new APIError(messages.auth.emailAlreadyExists(email), 409);
      }
    }

    if (profileId) {
      const profile = await ProfileRepository.findById(profileId);
      if (!profile) {
        throw new APIError(messages.error.resourceNotFound("Perfil"), 404);
      }
    }

    const updatedUser = await UserRepository.update(id, validatedData.data);
    if (!updatedUser) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }

    return updatedUser as User;
  }

  static async deleteUser(id: string): Promise<{ message: string }> {
    const wasDeleted = await UserRepository.delete(id);
    if (!wasDeleted) {
      throw new APIError(messages.error.resourceNotFound("usuário"), 404);
    }
    return { message: "Usuário deletado com sucesso." };
  }
}
