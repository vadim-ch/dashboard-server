import { AuthError } from '../errors/auth-error';
import { User } from '../entity/User';
import { MainStore } from './main';
import { UpdateResult } from 'typeorm';
import { Expert } from '../entity/expert/Expert';
import { expertsStore, NewExpertType } from './expert';


export interface UserType {
  id: string;
  email: string;
}

export interface NewUserType {
  email: string;
  password: string;
}

export class UserStore extends MainStore<User> {
  constructor() {
    super(User);
  }

  static prepareUser(user: User): UserType {
    return {
      id: user.id.toString(),
      email: user.email
    }
  }

  public async getById(id: string): Promise<UserType> {
    const user = await this.repository.findOne(id);
    return UserStore.prepareUser(user);
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.repository.findOne({email});
  }

  public async createNew(data: NewUserType, role: string = 'client'): Promise<User> {
    const existingUser = await this.repository.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User '${data.email}' exist`);
    }
    const user = this.repository.create({...data, role});
    await this.repository.save(user);
    return user;
  }

  public async createNewExpert(data: NewUserType, expertData: NewExpertType): Promise<User> {
    const user = await this.createNew(data, 'expert');
    user.expert = await expertsStore.createNew(expertData);
    await this.repository.save(user);
    return user;
  }

  public async addRefreshToken(userId: string, refreshId: string, refreshToken: string): Promise<UpdateResult> {
    return this.repository.update(userId, {
      refreshTokenMap: {
        [refreshId]: refreshToken
      }
    });
  }
}

export const userStore = new UserStore();
