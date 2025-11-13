import { CreateUserData, ListUserParams, User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

export class UserRepository {
  static async list(params: ListUserParams): Promise<{ data: User[]; total: number }> {
    const { pagina, limite, nome, telefone, email } = params;

    let filteredUsers = [...users];

    if (nome) {
      filteredUsers = filteredUsers.filter(user => user.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if (telefone) {
      filteredUsers = filteredUsers.filter(user => user.telefone?.includes(telefone));
    }
    if (email) {
      filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
    }

    const total = filteredUsers.length;
    const startIndex = (pagina - 1) * limite;
    const endIndex = startIndex + limite;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total,
    };
  }

  static async create(userData: CreateUserData): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      ...userData,
    };
    users.push(newUser);
    return newUser;
  }

  static async findById(id: string): Promise<User | undefined> {
    return users.find(user => user.id === id);
  }

  static async findByEmail(email: string): Promise<User | undefined> {
    return users.find(user => user.email === email);
  }

  static async update(id: string, updateData: Partial<CreateUserData>): Promise<User | undefined> {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    const updatedUser = { ...users[userIndex], ...updateData };
    users[userIndex] = updatedUser;
    return updatedUser;
  }

  static async delete(id: string): Promise<boolean> {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return users.length < initialLength;
  }
}