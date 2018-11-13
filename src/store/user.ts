import { AuthError } from '../errors/auth-error';
import {User, UserRole} from '../entity/User';
import { MainStore } from './main';
import { UpdateResult } from 'typeorm';
import { expertsStore, NewExpertType } from './expert';

export interface UserType {
  id: string;
  email: string;
  expertId: string;
}

export interface NewUserType {
  email: string;
  password: string;
}

export class UserStore extends MainStore<User> {
  constructor() {
    super(User);
  }

  static prepareUser(user: User, expertId?: string): UserType {
    return {
      id: user.id,
      email: user.email,
      expertId
    }
  }

  public async getById(id: string): Promise<UserType> {
    const user = await this.repository.findOne(id);
    return UserStore.prepareUser(user);
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.repository.findOne({email});
  }
  public async getExpertByUserId(userId: string): Promise<User> {
    return await this.repository.findOne(userId, {relations: ['expert']});
  }

  public async createNewClient(data: NewUserType, clientData?: NewExpertType): Promise<UserType> {
    const user = await this.createNew(data);
    // const expert = await expertsStore.createNew(expertData);
    // user.expert = expert;
    // await this.repository.save(user);
    return UserStore.prepareUser(user);
  }

  public async createNewExpert(data: NewUserType, expertData: NewExpertType): Promise<UserType> {
    const user = await this.createNew(data, UserRole.Expert);
    const expert = await expertsStore.createNew(expertData);
    user.expert = expert;
    await this.repository.save(user);
    return UserStore.prepareUser(user, expert.id);
  }

  public async addRefreshToken(userId: string, refreshId: string, refreshToken: string): Promise<UpdateResult> {
    return this.repository.update(userId, {
      refreshTokenMap: {
        [refreshId]: refreshToken
      }
    });
  }

  private async createNew(data: NewUserType, role: UserRole = UserRole.Client): Promise<User> {
    const existingUser = await this.repository.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User '${data.email}' exist`);
    }
    const user = this.repository.create({...data, role});
    await this.repository.save(user);
    return user;
  }
}

export const userStore = new UserStore();
