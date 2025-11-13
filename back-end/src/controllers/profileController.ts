import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';
import { sendResponse } from '../utils/message';

export default class ProfileController {
  static async listProfilesController(req: Request, res: Response): Promise<any> {
    const profiles = await ProfileService.listProfiles();
    sendResponse(res, 200, { data: profiles });
  }
}
