import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: any, @Request() req: any) {
    //check if his role is "publisher"
    if (req.user.role !== 'publisher') {
      throw new ForbiddenException('Only publishers can create recipe');
    }
    return this.recipesService.create(data, req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any,
    @Request() req: any,
  ) {
    await this.checkOwnership(id, req.user._id);
    return this.recipesService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    await this.checkOwnership(id, req.user._id);
    return this.recipesService.delete(id);
  }

  private async checkOwnership(recipeId: string, userId: string) {
    const recipe = await this.recipesService.findOne(recipeId);
    if (recipe.owner.toString() !== userId.toString()) {
      throw new ForbiddenException('You do not own this recipe.');
    }
  }
}
