import { AuthError } from '../errors/auth-error';
import {User, UserRole} from '../entity/User';
import { MainStore } from './main';
import { UpdateResult } from 'typeorm';
import { expertsStore, NewExpertType } from './expert';
import { NotFoundError } from '../errors/not-found-error';

export interface UserType {
  id: string;
  email: string;
  expertId: string;
  role: UserRole;
}

export interface NewUserType {
  email: string;
  password?: string;
}

export class UserStore extends MainStore<User> {
  constructor() {
    super(User);
  }

  static prepareUser(user: User, expertId?: string): UserType {
    return {
      id: user.id,
      email: user.email,
      expertId,
      role: user.role
    }
  }

  public async getById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.repository.findOne({email});
  }

  public async getExpertByUserId(userId: string): Promise<User> {
    return await this.repository.findOne(userId, {relations: ['expert']});
  }

  public async createNewClient(data: NewUserType, clientData?: NewExpertType): Promise<User> {
    const user = await this.createNew(data);
    // const expert = await expertsStore.createNew(expertData);
    // user.expert = expert;
    // await this.repository.save(user);
    return user;
  }

  public async createNewExpert(data: NewUserType, expertData?: NewExpertType): Promise<User> {
    const user = await this.createNew(data, UserRole.Expert);
    user.profile = await expertsStore.createNew(expertData);
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

  public async findAndUpdate(userId: string, fields: any) {
    try {
      // const updateResult = await this.repository.update({id: expertId, userId}, fields);
      const user = await this.repository.findOneOrFail({id: userId});
      const newUser = {...user, ...fields};
      return await this.repository.save(newUser);
    } catch (e) {
      throw new NotFoundError(`User '${userId}' not found, ${e}`);
    }
  }

  public async changePassword(userId: string, password: string): Promise<User> {
    try {
      const user = await this.repository.findOneOrFail({id: userId});
      user.password = password;
      return await this.repository.save(user);
    } catch (e) {
      throw new NotFoundError(`User '${userId}' not found, ${e}`);
    }
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
