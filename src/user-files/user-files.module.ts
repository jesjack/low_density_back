import { Module } from '@nestjs/common';
import { UserFilesService } from './user-files.service';
import { UserFilesController } from './user-files.controller';

@Module({
  controllers: [UserFilesController],
  providers: [UserFilesService]
})
export class UserFilesModule {}
