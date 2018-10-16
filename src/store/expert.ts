import {AuthError} from '../errors/auth-error';
import { Expert } from '../entity/Expert';
import { MainStore } from './main';

export interface ExpertType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface NewExpertType {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age: string;
}

export type ExpertUpdateFields = {
  firstName?: string;
  lastName?: string;
  role?: string;
}

export class ExpertsStore extends MainStore<Expert> {
  constructor() {
    super(Expert);
  }

  static prepareExpert(user: Expert): ExpertType {
    return {
      id: String(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: 'temp',
      createdDate: user.createdDate,
      updatedDate: user.updatedDate
    }
  }

  public async getUserById(id: string): Promise<ExpertType> {
    // const user = await this.model.findById(id);
    const user = await this.repository.findOne(id);
    return ExpertsStore.prepareExpert(user);
  }

  public async findByEmail(email: string): Promise<Expert> {
    return await this.repository.findOne({email});
  }

  public async createNewExpert(data: NewExpertType): Promise<Expert> {
    const existingUser = await this.repository.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User "${data.email}" exist`);
    }
    const expert = this.repository.create(data);
    await this.repository.save(expert);
    return expert;
  }

  public async findAndUpdateExpert(id: string, fields: ExpertUpdateFields): Promise<ExpertType> {
    const updatedExpert = await this.repository.update(id, fields);
    return ExpertsStore.prepareExpert(updatedExpert.raw);
  }

  public async getExperts(conditions?: object): Promise<Array<ExpertType>> {
    const experts = await this.repository.find(conditions);
    return experts.map(ExpertsStore.prepareExpert);
  }

  public async addRefreshToken(expertId: string, refreshId: string, refreshToken: string): Promise<ExpertType> {
      const updatedExpert = await this.repository.update(expertId, {
        refreshTokenMap: {
            [refreshId]: refreshToken
        }
      });
      return ExpertsStore.prepareExpert(updatedExpert.raw);
  }
}

export const expertsStore = new ExpertsStore();
