import { Injectable } from '@nestjs/common';
import { CreateUserFileDto } from './dto/create-user-file.dto';
import { UpdateUserFileDto } from './dto/update-user-file.dto';

@Injectable()
export class UserFilesService {
  create(createUserFileDto: CreateUserFileDto) {
    return 'This action adds a new userFile';
  }

  findAll() {
    return `This action returns all userFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userFile`;
  }

  update(id: number, updateUserFileDto: UpdateUserFileDto) {
    return `This action updates a #${id} userFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFile`;
  }
}
