import { Profile } from './profile';

export interface User {
  id: string;
  firstName: string;
  lastName:string;
  email: string;
  isActive: boolean;
  profileId: string;
  profile?: Profile;
}

export type CreateUserData = Omit<User, 'id' | 'profile'>;

export interface ListUserParams {
  pagina: number;
  limite: number;
  firstName?: string;
  email?: string;
  profileId?: string;
}
