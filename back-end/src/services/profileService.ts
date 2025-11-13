import { Profile } from '../interfaces/profile';
import { ProfileRepository } from '../repositories/profileRepository';

export class ProfileService {
  static async listProfiles(): Promise<Profile[]> {
    return await ProfileRepository.list();
  }
}
