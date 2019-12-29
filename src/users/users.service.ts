import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(username: string, password: string) {
    // This gets the Schema.
    const newUser = new this.userModel({
      username,
      password,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(prod => ({
      id: prod.id,
      username: prod.username,
      password: prod.password,
    }));
  }

  async getSingleUser(username: string): Promise<User | undefined> {
    const user = await this.findUser(username);
    return user;
  }

  private async findUser(username: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findOne({ username }).exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
