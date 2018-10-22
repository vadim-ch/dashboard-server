import { Expert, GenderEnum } from '../entity/expert/Expert';
import { MainStore } from './main';
import { UpdateResult } from 'typeorm';
import { NotFoundError } from '../errors/not-found-error';

export interface ExpertType {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: Date;
  gender: string;
  userId: string;
  // email: string;

  // createdDate: Date;
  // updatedDate: Date;
}

export interface NewExpertType {
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: Date;
  gender: GenderEnum;
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
    // return {
    //   id: String(user.id),
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   middleName: user.middleName,
    //   birthday: user.birthday,
    //   gender: user.gender,
    //   userId: user.userId
    //   // email: user.email,
    //   // createdDate: user.createdDate,
    //   // updatedDate: user.updatedDate
    // }
    return user;
  }

  public async getExpert(expertId: string): Promise<ExpertType> {
    try {
      const user = await this.repository.findOneOrFail(expertId, {relations: ['methodsTherapy']});
      return ExpertsStore.prepareExpert(user);
    } catch (e) {
      throw new NotFoundError(`User not found`);
    }
  }

  public async getExpertByUserId(userId: string): Promise<ExpertType> {
    try {
      const user = await this.repository.findOneOrFail({userId});
      return ExpertsStore.prepareExpert(user);
    } catch (e) {
      throw new NotFoundError(`User not found`);
    }
  }

  // public async findByEmail(email: string): Promise<Expert> {
  //   return await this.repository.findOne({email});
  // }

  public async createNew(data: NewExpertType): Promise<Expert> {
    const expert = this.repository.create(data);
    await this.repository.save(expert);
    return expert;
  }

  public async findAndUpdateExpert(userId: string, expertId: string, fields: ExpertUpdateFields): Promise<Expert> {
    try {
      // const updateResult = await this.repository.update({id: expertId, userId}, fields);
      const expert = await this.repository.findOneOrFail({id: expertId, userId});
      const newExpert = {...expert, ...fields};
      return await this.repository.save(newExpert);
    } catch (e) {
      throw new NotFoundError(`Expert '${expertId}' not found, ${e}`);
    }
  }

  public async getExperts(conditions?: object): Promise<Array<ExpertType>> {
    const experts = await this.repository.find(conditions);
    return experts.map(ExpertsStore.prepareExpert);
  }
}

export const expertsStore = new ExpertsStore();
