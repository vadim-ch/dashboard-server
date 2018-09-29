import { IUser, IUserModel, User } from './models/user';
import { Model } from 'mongoose';
import { MongoError } from 'mongodb';
import {AuthError} from "../errors/auth-error";

export const UserRole = {
  Client: 'client',
  Expert: 'expert',
  Admin: 'admin'
};

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
  email: string;
  password: string;
}

export type UserUpdateFields = {
  firstName?: string;
  lastName?: string;
  role?: string;
}

export class UserStore {
  private model: Model<IUserModel>;
  constructor(model: Model<IUserModel>) {
    this.model = model;
  }

  static prepareUser(user: IUserModel): UserType {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  }

  public async getUserById(id: string): Promise<UserType> {
    const user = await this.model.findById(id);
    return UserStore.prepareUser(user);
  }

  public async createNewUser(data: NewUserType): Promise<IUserModel> {
    const existingUser = await User.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User "${data.email}" exist`);
    }
    return new this.model(data);
  }

  // public async createUser(data: NewUserType): Promise<UserType> {
  //   const user = await this.createRawUser(data);
  //   return UserStore.prepareUser(user);
  // }

  public async getUsers(conditions?: object): Promise<Array<UserType>> {
    const users = await this.model.find(conditions);
    return users.map(UserStore.prepareUser);
  }

  public async getAllExperts(): Promise<Array<UserType>> {
    return this.getUsers({role: UserRole.Expert});
  }

  public async getAllClients(): Promise<Array<UserType>> {
    return this.getUsers({role: UserRole.Client});
  }

  public async findAndUpdateUser(id: string, fields: UserUpdateFields): Promise<UserType> {
    const updatedUser = await this.model.findByIdAndUpdate(id, fields, {new: true});
    return UserStore.prepareUser(updatedUser);
  }
}

export const userStore = new UserStore(User);
