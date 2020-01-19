import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AnimalModule } from './animals/animal/animal.module';

const uri =
  'mongodb+srv://admin:DqMyy5mTB6IhuIpt@cluster0-ml2c0.mongodb.net/skills-showcase?retryWrites=true&w=majority';
@Module({
  imports: [
    AnimalModule,
    MongooseModule.forRoot(uri, { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
