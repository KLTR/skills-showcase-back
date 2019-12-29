import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const uri =
  'mongodb+srv://admin:DqMyy5mTB6IhuIpt@cluster0-ml2c0.mongodb.net/nestjs-demo?retryWrites=true&w=majority';
@Module({
  imports: [
    ProductsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(uri, { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
