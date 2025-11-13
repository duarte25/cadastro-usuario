import { Profile } from '../interfaces/profile';
import { v4 as uuidv4 } from 'uuid';

export const profiles: Profile[] = [
  { id: uuidv4(), name: 'Admin' },
  { id: uuidv4(), name: 'User' },
  { id: uuidv4(), name: 'Manager' },
];

export class ProfileRepository {
  static async list(): Promise<Profile[]> {
    return profiles;
  }

  static async findById(id: string): Promise<Profile | undefined> {
    return profiles.find(profile => profile.id === id);
  }

  static async findByName(name: string): Promise<Profile | undefined> {
    return profiles.find(profile => profile.name === name);
  }
}
