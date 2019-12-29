import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async addUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.userService.insertUser(
      username,
      password,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.userService.getSingleUser(username);
    return user;
  }

//   @Patch(':id')
//   async updateProduct(
//     @Param('id') prodId: string,
//     @Body('title') prodTitle: string,
//     @Body('description') prodDesc: string,
//     @Body('price') prodPrice: number,
//   ) {
//     await this.userService.updateProduct(
//       prodId,
//       prodTitle,
//       prodDesc,
//       prodPrice,
//     );
//     return null;
//   }

//   @Delete(':id')
//   async removeProduct(@Param('id') prodId: string) {
//     await this.userService.deleteProduct(prodId);
//     return null;
//   }
}
