import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async create(
    email: string,
    password: string,
    role: 'user' | 'publisher' = 'user',
  ) {
    const user = new this.userModel({ email, password, role });
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async getAllUsers() {
    return this.userModel.find();
  }
}
