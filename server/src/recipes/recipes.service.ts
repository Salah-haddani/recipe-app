import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecipesService {
  constructor(@InjectModel('Recipe') private recipeModel: Model<any>) {}

  async findAll(query: {
    skip?: number;
    limit?: number;
    sort?: string;
    ownerId?: string;
  }) {
    const { skip = 0, limit = 10, sort = 'desc', ownerId } = query;

    const filter = ownerId ? { owner: ownerId } : {};

    const sortOrder = sort === 'desc' ? -1 : 1;

    const [recipes, total] = await Promise.all([
      this.recipeModel
        .find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate('owner', 'email username'),
      this.recipeModel.countDocuments(filter),
    ]);

    return { recipes, total };
  }
  async findOne(id: string) {
    const recipe = await this.recipeModel
      .findById(id)
      .populate('owner', 'username');
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
