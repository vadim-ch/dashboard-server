import { Document, Schema, Model, model } from 'mongoose';

export interface IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date,
  password: string;
  refreshTokenMap: object;
  role: string;
}

export interface IUserModel extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

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

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
