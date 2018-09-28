import { connectDatabase } from '../../db';
import { logger } from '../../logger';
import { Document, Model, model, Schema } from "mongoose";
import { compare, hash } from 'bcrypt';

const COLLECTION_NAME = 'User';

export var UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  username: String,
  lastName: String,
  password: String,
  refreshTokenMap: Object,
  role: String
});

UserSchema.pre<IUserModel>('save', async function (next) {
  const user = this;
  let now = new Date();
  if (!user.createdAt) {
    user.createdAt = now;
  }
  if (!user.isModified('password')) {
    return next();
  }
  user.password = await hash(user.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword): Promise<boolean> {
  const user = this;
  return await compare(candidatePassword, user.password);
};

const setupCollection = async () => {
  const dBase = await connectDatabase;
  return model<IUserModel>(COLLECTION_NAME, UserSchema);
};

export const UserRole = {
  Client: 'client',
  Expert: 'expert',
  Admin: 'admin'
};

export interface IUser {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date,
  password: string;
  refreshTokenMap: object;
  role: string;
}

export interface IUserModel extends IUser, Document {
  fullName(): string;

  comparePassword(password: string): Promise<boolean>;
}

class UsersStore {
  private userModel: Promise<Model<IUserModel>>;

  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserById(id): Promise<IUserModel> {
    return (await this.userModel).findById(id);
  }

  async getUserByEmail(email): Promise<IUserModel> {
    return (await this.userModel).findOne({email});
  }

  async getAllUsers() {
    const users = await (await this.userModel).find();
    return users.map(user => {
      email: user.email
    })
  }

  async save(userData: IUser) {
    // return (await this.userModel).insertOne(userData);
  }

}

export const usersStore =
    new UsersStore(
        setupCollection()
            .catch((e) => logger.error(`Failed to set up '${COLLECTION_NAME}'-collection`, e))
    );
