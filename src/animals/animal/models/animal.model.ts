
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
