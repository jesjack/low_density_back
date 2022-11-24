import { Injectable } from '@nestjs/common';
import { CreateUserFileDto } from './dto/create-user-file.dto';
import { UpdateUserFileDto } from './dto/update-user-file.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { create } = require('ipfs-http-client');
import { create } from 'ipfs-http-client';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserFile } from './entities/user-file.entity';
import { get } from 'https';
import { IncomingHttpHeaders } from 'http';

const client = create({
  url: 'http://127.0.0.1:5002',
});

@Injectable()
export class UserFilesService {
  constructor(
    @InjectRepository(UserFile)
    private fileUsersRepository: Repository<UserFile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

  uploadFiles(files: Express.Multer.File[], userId: number) {
    return this.usersRepository
      .findOne({ where: { id: userId } })
      .then((user) =>
        Promise.all(
          files.map((file) =>
            client.add(file.buffer).then(({ cid }) =>
              this.fileUsersRepository.save({
                filename: file.originalname,
                type: file.mimetype,
                cid: cid.toString(),
                size: file.size,
                user,
              }),
            ),
          ),
        ),
      );
  }

  async getFile(cid: string) {
    const node = client.cat(cid);
    const decoder = new TextDecoder();
    let data = '';

    for await (const chunk of node) {
      data += decoder.decode(chunk, { stream: true });
    }

    return data;
  }

  getFiles(userId: number) {
    return this.fileUsersRepository.find({ where: { user: { id: userId } } });
  }

  genLink(cid: string) {
    const link =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    return [
      this.fileUsersRepository.update({ cid }, { sharedLink: link }),
      link,
    ];
  }

  getFileByLink(link: string) {
    return new Promise((resolve: (daa: string) => void, reject) => {
      this.fileUsersRepository
        .findOne({ where: { sharedLink: link } })
        .then((file) => {
          if (file) {
            resolve('https://ipfs.io/ipfs/' + file.cid);
            // get('https://ipfs.io/ipfs/' + file.cid, (res) => {
            //   let data = '';

            //   res.on('data', (chunk) => {
            //     data += chunk;
            //     // console.log(data);
            //   });

            //   res.on('end', () => {
            //     resolve([data, res.headers] as [string, IncomingHttpHeaders]);
            //   });

            //   res.on('error', (err) => {
            //     reject(err);
            //   });
            // });
          } else {
            reject();
          }
        });
    });
  }

  deleteFile(cid: string, userId) {
    return this.fileUsersRepository.delete({ cid, user: { id: userId } });
  }
}
