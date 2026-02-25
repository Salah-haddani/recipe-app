import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeSchema } from './schemas/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RecipesGateway } from './recipes.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    AuthModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService, RecipesGateway],
})
export class RecipesModule {}
