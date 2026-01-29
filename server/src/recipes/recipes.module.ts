import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeSchema } from './schemas/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    AuthModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
