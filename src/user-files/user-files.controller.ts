import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { UserFilesService } from './user-files.service';
import { CreateUserFileDto } from './dto/create-user-file.dto';
import { UpdateUserFileDto } from './dto/update-user-file.dto';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { get } from 'https';
import { StreamableFile } from '@nestjs/common';
import { Res } from '@nestjs/common';
// import { get } from 'https';

@Controller('user-files')
export class UserFilesController {
  constructor(private readonly userFilesService: UserFilesService) {}

  @Post('upload-files')
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() request: Request,
  ) {
    if (!request.session.user) {
      return { error: 'No hay una sesión iniciada' };
    }
    return this.userFilesService.uploadFiles(files, request.session.user.id);
  }

  @Get('get-file/:cid')
  async getFile(@Param('cid') cid: string) {
    return await this.userFilesService.getFile(cid);
  }

  @Get('get-files')
  async getFiles(@Req() request: Request) {
    if (!request.session.user) {
      return { error: 'No hay una sesión iniciada' };
    }
    return await this.userFilesService.getFiles(request.session.user.id);
  }

  @Get('share-file/:cid')
  async shareFile(@Param('cid') cid: string) {
    return {
      link: this.userFilesService.genLink(cid)[1],
    };
  }

  @Get('get-file-by-link/:link')
  async getFileByLink(@Param('link') link: string, @Res() res: Response) {
    get(await this.userFilesService.getFileByLink(link), (extres) => {
      extres.pipe(res);
    });
  }

  @Delete('delete-file/:cid')
  async deleteFile(@Param('cid') cid: string, @Req() request: Request) {
    if (!request.session.user) {
      return { error: 'No hay una sesión iniciada' };
    }
    return await this.userFilesService.deleteFile(cid, request.session.user.id);
  }
}
