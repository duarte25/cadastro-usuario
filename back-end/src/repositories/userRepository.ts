import { CreateUserData, ListUserParams, User } from '../interfaces/user';
import { profiles } from './profileRepository';
import { v4 as uuidv4 } from 'uuid';

const adminProfile = profiles.find(p => p.name === 'Admin');
const userProfile = profiles.find(p => p.name === 'User');
const managerProfile = profiles.find(p => p.name === 'Manager');

let users: User[] = [
  { id: uuidv4(), firstName: 'João', lastName: 'da Silva', email: 'joao.silva@example.com', isActive: true, profileId: adminProfile!.id },
  { id: uuidv4(), firstName: 'Maria', lastName: 'Oliveira', email: 'maria.oliveira@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Carlos', lastName: 'Pereira', email: 'carlos.pereira@example.com', isActive: false, profileId: managerProfile!.id },
  { id: uuidv4(), firstName: 'Ana', lastName: 'Costa', email: 'ana.costa@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Pedro', lastName: 'Santos', email: 'pedro.santos@example.com', isActive: true, profileId: userProfile!.id },
];

export class UserRepository {
  static async list(params: ListUserParams): Promise<{ data: User[]; total: number }> {
    const { pagina, limite, nome, email, profileId } = params;

    let filteredUsers = [...users];

    if (nome) {
      filteredUsers = filteredUsers.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(nome.toLowerCase())
      );
    }
    if (email) {
      filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
    }
    if (profileId) {
      filteredUsers = filteredUsers.filter(user => user.profileId === profileId);
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
