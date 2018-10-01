import { Model } from 'mongoose';
import {AuthError} from '../errors/auth-error';
import {Expert, IExpertModel} from './models/expert';

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
  private model: Model<IExpertModel>;
  constructor(model: Model<IExpertModel>) {
    this.model = model;
  }

  static prepareExpert(user: IExpertModel): ExpertType {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: 'temp'
    }
  }

  public async getUserById(id: string): Promise<ExpertType> {
    const user = await this.model.findById(id);
    return ExpertsStore.prepareExpert(user);
  }

  public async createNewExpert(data: NewExpertType): Promise<IExpertModel> {
    const existingUser = await Expert.findOne({email: data.email});
    if (existingUser) {
      throw new AuthError(`User "${data.email}" exist`);
    }
    return new this.model(data);
  }

  public async findAndUpdateExpert(id: string, fields: ExpertUpdateFields): Promise<ExpertType> {
    const updatedUser = await this.model.findByIdAndUpdate(id, fields, {new: true});
    return ExpertsStore.prepareExpert(updatedUser);
  }

  public async getExperts(conditions?: object): Promise<Array<ExpertType>> {
    const experts = await this.model.find(conditions);
    return experts.map(ExpertsStore.prepareExpert);
  }
}

export const expertsStore = new ExpertsStore(Expert);
