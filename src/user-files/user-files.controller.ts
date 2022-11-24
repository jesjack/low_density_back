import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFilesService } from './user-files.service';
import { CreateUserFileDto } from './dto/create-user-file.dto';
import { UpdateUserFileDto } from './dto/update-user-file.dto';

@Controller('user-files')
export class UserFilesController {
  constructor(private readonly userFilesService: UserFilesService) {}

  @Post()
  create(@Body() createUserFileDto: CreateUserFileDto) {
    return this.userFilesService.create(createUserFileDto);
  }

  @Get()
  findAll() {
    return this.userFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFileDto: UpdateUserFileDto) {
    return this.userFilesService.update(+id, updateUserFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFilesService.remove(+id);
  }
}
