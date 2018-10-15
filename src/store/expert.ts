import { Model } from 'mongoose';
import {AuthError} from '../errors/auth-error';
// import {Expert, IExpertModel} from './models/expert';
import { Expert } from '../entity/Expert';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

export interface ExpertType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface NewExpertType {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export type ExpertUpdateFields = {
  firstName?: string;
  lastName?: string;
  role?: string;
}

export class ExpertsStore {
  constructor() {
  }

  static prepareExpert(user: Expert): ExpertType {
    return {
      id: String(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: 'temp'
    }
  }

  private get userRepository(): Repository<Expert> {
    return getRepository<Expert>(Expert);
  }

  public async getUserById(id: string): Promise<ExpertType> {
    // const user = await this.model.findById(id);
    const user = await this.userRepository.findOne(id);
    return ExpertsStore.prepareExpert(user);
  }

  public async createNewExpert(data: NewExpertType): Promise<Expert> {
    const existingUser = await this.userRepository.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User "${data.email}" exist`);
    }
    return this.userRepository.create(data);
  }

  public async findAndUpdateExpert(id: string, fields: ExpertUpdateFields): Promise<ExpertType> {
    const updatedUser = await this.userRepository.update(id, fields);
    return ExpertsStore.prepareExpert(updatedUser.raw);
  }

  public async getExperts(conditions?: object): Promise<Array<ExpertType>> {
    const experts = await this.userRepository.find(conditions);
    return experts.map(ExpertsStore.prepareExpert);
  }
}

// await userRepository.save({
//   firstName: "Micle",
//   lastName: "Carmicle",
//   age: 105,
//   role: 'Dad'
// });
// const all = await userRepository.find();

export const expertsStore = new ExpertsStore();
