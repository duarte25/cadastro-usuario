import { CreateUserData, ListUserParams, User } from '../interfaces/user';
import { profiles } from './profileRepository';
import { v4 as uuidv4 } from 'uuid';

const adminProfile = profiles.find(p => p.name === 'Admin');
const userProfile = profiles.find(p => p.name === 'User');
const managerProfile = profiles.find(p => p.name === 'Manager');

let users: User[] = [
  { id: uuidv4(), firstName: 'Marcos', lastName: 'Azevedo', email: 'marcos.azevedo@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Elisa', lastName: 'Farias', email: 'elisa.farias@example.com', isActive: false, profileId: managerProfile!.id },
  { id: uuidv4(), firstName: 'Tiago', lastName: 'Nogueira', email: 'tiago.nogueira@example.com', isActive: true, profileId: adminProfile!.id },
  { id: uuidv4(), firstName: 'Larissa', lastName: 'Correia', email: 'larissa.correia@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Renato', lastName: 'Dias', email: 'renato.dias@example.com', isActive: false, profileId: userProfile!.id },

  { id: uuidv4(), firstName: 'Patrícia', lastName: 'Moraes', email: 'patricia.moraes@example.com', isActive: true, profileId: managerProfile!.id },
  { id: uuidv4(), firstName: 'Felipe', lastName: 'Vieira', email: 'felipe.vieira@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Aline', lastName: 'Rocha', email: 'aline.rocha@example.com', isActive: false, profileId: adminProfile!.id },
  { id: uuidv4(), firstName: 'Eduardo', lastName: 'Melo', email: 'eduardo.melo@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Simone', lastName: 'Carvalho', email: 'simone.carvalho@example.com', isActive: true, profileId: userProfile!.id },

  { id: uuidv4(), firstName: 'Rodrigo', lastName: 'Borges', email: 'rodrigo.borges@example.com', isActive: false, profileId: managerProfile!.id },
  { id: uuidv4(), firstName: 'Natália', lastName: 'Araújo', email: 'natalia.araujo@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'André', lastName: 'Batista', email: 'andre.batista@example.com', isActive: true, profileId: adminProfile!.id },
  { id: uuidv4(), firstName: 'Helena', lastName: 'Ramos', email: 'helena.ramos@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Vitor', lastName: 'Gomes', email: 'vitor.gomes@example.com', isActive: true, profileId: userProfile!.id },

  { id: uuidv4(), firstName: 'Luciana', lastName: 'Ferraz', email: 'luciana.ferraz@example.com', isActive: false, profileId: managerProfile!.id },
  { id: uuidv4(), firstName: 'Maurício', lastName: 'Monteiro', email: 'mauricio.monteiro@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Beatriz', lastName: 'Assis', email: 'beatriz.assis@example.com', isActive: true, profileId: userProfile!.id },
  { id: uuidv4(), firstName: 'Fábio', lastName: 'Rezende', email: 'fabio.rezende@example.com', isActive: false, profileId: adminProfile!.id },
  { id: uuidv4(), firstName: 'Isabela', lastName: 'Tavares', email: 'isabela.tavares@example.com', isActive: true, profileId: userProfile!.id }
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
