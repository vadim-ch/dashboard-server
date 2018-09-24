import { hash, compare } from 'bcrypt';
import { Document, Schema, Model, model, Error } from 'mongoose';

export interface IUser {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date,
  password: string;
}

export interface IUserModel extends IUser, Document {
  fullName(): string;
  comparePassword(password: string): Promise<boolean>;
}

export var UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  username: String,
  lastName: String,
  password: String
});

UserSchema.pre<IUserModel>('save', async function(next) {
  const user = this;
  let now = new Date();
  if (!user.createdAt) {
    user.createdAt = now;
  }
  if (!user.isModified('password')) {
    return next();
  }
  // if (err) { return next(err); }
  user.password = await hash(user.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword): Promise<boolean> {
  const user = this;
  return await compare(candidatePassword, user.password);
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
