import {AuthError} from "../errors/auth-error";
import { User } from '../entity/User';
import { MainStore } from './main';


export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface NewUserType {
  firstName: string;
  lastName?: string;
  age: string;
  email: string;
  password: string;
}

export type UserUpdateFields = {
  firstName?: string;
  lastName?: string;
  role?: string;
}

export class UserStore extends MainStore<User> {
  constructor() {
    super(User);
  }

  static prepareUser(user: User): UserType {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  }

  public async getUserById(id: string): Promise<UserType> {
    const user = await this.repository.findOne(id);
    return UserStore.prepareUser(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({email});
  }

  public async createNewUser(data: NewUserType): Promise<User> {
    const existingUser = await this.repository.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User "${data.email}" exist`);
    }
    const expert = this.repository.create(data);
    await this.repository.save(expert);
    return expert;
  }

  public async findAndUpdateUser(id: string, fields: UserUpdateFields): Promise<UserType> {
    const updatedUser = await this.repository.update(id, fields);
    return UserStore.prepareUser(updatedUser.raw);
  }

  public async getUsers(conditions?: object): Promise<Array<UserType>> {
    const users = await this.repository.find(conditions);
    return users.map(UserStore.prepareUser);
  }

  public async addRefreshToken(expertId: string, refreshId: string, refreshToken: string): Promise<UserType> {
    const updatedUser = await this.repository.update(expertId, {
      refreshTokenMap: {
        [refreshId]: refreshToken
      }
    });
    return UserStore.prepareUser(updatedUser.raw);
  }
}

export const userStore = new UserStore();
