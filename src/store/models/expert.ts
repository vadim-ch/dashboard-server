import { hash, compare } from 'bcrypt';
import { Document, Schema, Model, model } from 'mongoose';

export interface IExpert {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date,
  password: string;
  refreshTokenMap: object;
}

export interface IExpertModel extends IExpert, Document {
  comparePassword(password: string): Promise<boolean>;
}

export var ExpertSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  refreshTokenMap: Object
});

ExpertSchema.pre<IExpertModel>('save', async function(next) {
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

ExpertSchema.methods.comparePassword = async function(candidatePassword): Promise<boolean> {
  const user = this;
  return await compare(candidatePassword, user.password);
};

export const Expert: Model<IExpertModel> = model<IExpertModel>('Expert', ExpertSchema);
