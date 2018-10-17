import {AuthError} from "../errors/auth-error";
import { Client } from '../entity/client/Client';
import { MainStore } from './main';


interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface NewUserType {
  firstName: string;
  lastName?: string;
  age: string;
  email: string;
  password: string;
}

type UserUpdateFields = {
  firstName?: string;
  lastName?: string;
  role?: string;
}

export class ClientStore extends MainStore<Client> {
  constructor() {
    super(Client);
  }

  static prepareUser(user: Client): UserType {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  }

  public async getUserById(id: string): Promise<UserType> {
    const user = await this.repository.findOne(id);
    return ClientStore.prepareUser(user);
  }

  public async findByEmail(email: string): Promise<Client> {
    return await this.repository.findOne({email});
  }

  public async createNewUser(data: NewUserType): Promise<Client> {
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
    return ClientStore.prepareUser(updatedUser.raw);
  }

  public async getUsers(conditions?: object): Promise<Array<UserType>> {
    const users = await this.repository.find(conditions);
    return users.map(ClientStore.prepareUser);
  }
}

export const clientStore = new ClientStore();
