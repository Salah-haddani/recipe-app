import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecipesService {
  constructor(@InjectModel('Recipe') private recipeModel: Model<any>) {}

  async findAll() {
    return this.recipeModel.find().populate('owner', 'email');
  }
  async findOne(id: string) {
    const recipe = await this.recipeModel.findById(id);
    if (!recipe) throw new NotFoundException('recipe not found');
    return recipe;
  }
  async create(data: any, userId: string) {
    const newRecipe = new this.recipeModel({ ...data, owner: userId });
    return newRecipe.save();
  }
  async update(id: string, data: any) {
    return this.recipeModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string) {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
