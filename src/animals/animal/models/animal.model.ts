import * as mongoose from 'mongoose';

export enum AnimalType  {
  Dog = 'DOG',
  Cat = 'CAT',
}

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  image: string;
}
export const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: AnimalType, required: true },
  image: { type: String, required: true },
});
