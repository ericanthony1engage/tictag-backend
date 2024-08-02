import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private _model: Model<User>,
  ) {}

  public checkUsernameExists = (
    username: User['username'],
    role: User['role'],
  ): Promise<boolean> => this._model.exists({ username, role }).lean();

  public getUserByUsername = (username: string): Promise<UserDocument> =>
    this._model.findOne({ username }).select('_id password role').lean();

  public getUserById = (id: string | Types.ObjectId): Promise<UserDocument> =>
    this._model.findById(id).lean();

  public addUser = (user: User): Promise<UserDocument> =>
    this._model.create(user);
}
