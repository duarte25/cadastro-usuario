import { ProfileRepository } from '../repositories/profileRepository';
import { Profile } from '../interfaces/profile';

export class ProfileService {
  static async listProfiles(): Promise<Profile[]> {
    return await ProfileRepository.list();
  }
}
