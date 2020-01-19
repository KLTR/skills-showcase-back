import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalSchema } from './animal.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService],
})
export class AnimalModule {}
