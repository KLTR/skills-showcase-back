import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
  ) {}

  async insertAnimal(name: string, image: string, type: AnimalType) {
    // This gets the Schema.
    const newAnimal = new this.animalModel({
      name,
      image,
      type,
    });
    const result = await newAnimal.save();
    return result.id as string;
  }

  async getAnimals() {
    const animals = await this.animalModel.find().exec();
    return animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      image: animal.image,
      type: animal.type,
    }));
  }

  async getAnimalByType(animalType: AnimalType): Promise<Partial<Animal[]>> {
    let animals;
    try {
      animals = this.animalModel.find({type: animalType}).exec()
    } catch (error) {
      throw new NotFoundException(error)
    }
    if(!animals){
      throw new NotFoundException(`No ${animalType.toLowerCase()}s found.`);
    }
    return animals;
  }

  async getSingleAnimal(animalId: string): Promise<Partial<Animal>> {
    const animal = await this.findAnimal(animalId);
    return {
      id: animal.id,
      name: animal.name,
      image: animal.image,
      type: animal.type,
    };
  }

  async updateAnimal(
    animalId: string,
    name: string,
    image: string,
    type: AnimalType,
  ) {
    const updatedAnimal = await this.findAnimal(animalId);
    if (name) {
      updatedAnimal.name = name;
    }
    if (image) {
      updatedAnimal.image = image;
    }
    if (type) {
      updatedAnimal.type = type;
    }
    updatedAnimal.save();
  }

  async deleteAnimal(animalId: string) {
    const result = await this.animalModel.deleteOne({ _id: animalId }).exec();
    // If no documents were effected.
    if (result.n === 0) {
      throw new NotFoundException('Could not find animal.');
    }
  }

  private async findAnimal(id: string): Promise<Animal> {
    let animal;
    try {
      animal = await this.animalModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
    if (!animal) {
      throw new NotFoundException('Could not find animal.');
    }
    return animal;
  }
}
