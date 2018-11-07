import { MainStore } from './main';
import { ApproachesTherapy } from '../entity/expert/ApproachesTherapy';
import { getRepository, Repository } from 'typeorm';
import { MethodsTherapy } from '../entity/expert/MethodsTherapy';
import { RequestsTherapy } from '../entity/expert/RequestsTherapy';

export class SuggestStore {
  private _approaches: Repository<ApproachesTherapy>;
  private _methods: Repository<MethodsTherapy>;
  private _requests: Repository<RequestsTherapy>;
  constructor() {
  }

  protected get repositoryApproaches(): Repository<ApproachesTherapy> {
    if (!this._approaches) {
      this._approaches = getRepository(ApproachesTherapy);
    }
    return this._approaches;
  }

  protected get repositoryMethods(): Repository<MethodsTherapy> {
    if (!this._methods) {
      this._methods = getRepository(MethodsTherapy);
    }
    return this._methods;
  }

  protected get repositoryRequests(): Repository<RequestsTherapy> {
    if (!this._requests) {
      this._requests = getRepository(RequestsTherapy);
    }
    return this._requests;
  }

  public async getAllApproaches(conditions?: object): Promise<Array<ApproachesTherapy>> {
    return await this.repositoryApproaches.find(conditions);
  }

  public async getAllMethods(conditions?: object): Promise<Array<MethodsTherapy>> {
    return await this.repositoryMethods.find(conditions);
  }

  public async getAllRequests(conditions?: object): Promise<Array<RequestsTherapy>> {
    return await this.repositoryRequests.find(conditions);
  }
}

export const suggestStore = new SuggestStore();
