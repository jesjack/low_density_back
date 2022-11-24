import { Module } from '@nestjs/common';
import { UserFilesService } from './user-files.service';
import { UserFilesController } from './user-files.controller';
import { UserFile } from './entities/user-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [UserFilesController],
  providers: [UserFilesService],
  imports: [TypeOrmModule.forFeature([UserFile, User])],
})
export class UserFilesModule {}
