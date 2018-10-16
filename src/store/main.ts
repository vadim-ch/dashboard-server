import { User } from '../entity/User';
import { getRepository, Repository } from 'typeorm';

export class MainStore<RepositoryType> {
  private _repository: Repository<RepositoryType>;
  private entity;
  constructor(entity: any) {
    this.entity = entity;
  }

  protected get repository(): Repository<RepositoryType> {
    if (!this._repository) {
      this._repository = getRepository(this.entity);
    }
    return this._repository;
  }
}
