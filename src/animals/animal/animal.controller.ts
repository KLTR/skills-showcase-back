import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalType } from './animal.model';

@Controller('animal')
export class AnimalController {
  constructor(private readonly  animalService: AnimalService) {}

  @Post()
  async addAnimal(
    @Body('name') animalName: string,
    @Body('image') animalImage: string,
    @Body('type') animalType: AnimalType,

  ) {
    const generatedId = await this.animalService.insertAnimal(
      animalName,
      animalImage,
      animalType,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllAnimals() {
    const animals = await this.animalService.getAnimals();
    return animals;
  }

  @Get('/id/:id')
  async getAnimal(@Param('id') animalId: string) {
    const animal = await this.animalService.getSingleAnimal(animalId);
    return animal;
  }

  @Get('/type/:type')
  async getAnimalsByType(@Param('type') animalType: AnimalType){
    const animals = await this.animalService.getAnimalByType(animalType);
    return animals;
  }

  @Patch(':id')
  async updateAnimal(
    @Param('id') animalId: string,
    @Body('name') animalName: string,
    @Body('image') animalImage: string,
    @Body('type') animalType: AnimalType,

  ) {
    await this.animalService.updateAnimal(animalId, animalName, animalImage, animalType);
    return null;
  }

  @Delete(':id')
  async removeAnimal(@Param('id') animalId: string) {
    await this.animalService.deleteAnimal(animalId);
    return null;
  }

}
