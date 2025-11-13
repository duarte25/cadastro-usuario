import { CreateUserData, ListUserParams, User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [
  { id: uuidv4(), nome: 'João da Silva', email: 'joao.silva@example.com', telefone: '11987654321' },
  { id: uuidv4(), nome: 'Maria Oliveira', email: 'maria.oliveira@example.com', telefone: '21987654322' },
  { id: uuidv4(), nome: 'Carlos Pereira', email: 'carlos.pereira@example.com', telefone: '31987654323' },
  { id: uuidv4(), nome: 'Ana Costa', email: 'ana.costa@example.com', telefone: '41987654324' },
  { id: uuidv4(), nome: 'Pedro Santos', email: 'pedro.santos@example.com', telefone: '51987654325' },
  { id: uuidv4(), nome: 'Sofia Lima', email: 'sofia.lima@example.com', telefone: '61987654326' },
  { id: uuidv4(), nome: 'Lucas Souza', email: 'lucas.souza@example.com', telefone: '71987654327' },
  { id: uuidv4(), nome: 'Laura Fernandes', email: 'laura.fernandes@example.com', telefone: '81987654328' },
  { id: uuidv4(), nome: 'Mateus Rodrigues', email: 'mateus.rodrigues@example.com', telefone: '91987654329' },
  { id: uuidv4(), nome: 'Isabela Almeida', email: 'isabela.almeida@example.com', telefone: '11987654330' },
  { id: uuidv4(), nome: 'Gabriel Martins', email: 'gabriel.martins@example.com', telefone: '21987654331' },
  { id: uuidv4(), nome: 'Valentina Gomes', email: 'valentina.gomes@example.com', telefone: '31987654332' },
  { id: uuidv4(), nome: 'Enzo Ribeiro', email: 'enzo.ribeiro@example.com', telefone: '41987654333' },
  { id: uuidv4(), nome: 'Helena Carvalho', email: 'helena.carvalho@example.com', telefone: '51987654334' },
  { id: uuidv4(), nome: 'Miguel Castro', email: 'miguel.castro@example.com', telefone: '61987654335' },
];

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